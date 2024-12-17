import { defineEventHandler, readBody } from "h3";
import paypal from "@paypal/checkout-server-sdk";
import pool from "../../database/db";

// Cấu hình PayPal SDK
const clientId =
  "AdlzXyyOLTPydlHj5efSri-hn7luKxX0IToIwsnin9etgCF99I-pxiMoEAOP4lSTb3ik2Jy630RPsS1t";
const clientSecret =
  "EKFRLViM1B9XnvrWjnrnN4B0xy091kCzdAN01AfG64ABJW01DWB8vl21eX-FjGNqxrRw-Z2glGJJcIR8";
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { orderID, userID, eventID, ticketQuantity } = body;

    if (!orderID || !userID || !eventID) {
      throw createError({
        statusCode: 400,
        message: "Missing required fields: orderID, userID, or eventID",
      });
    }

    // Gửi yêu cầu tới PayPal để kiểm tra trạng thái đơn hàng
    const orderRequest = new paypal.orders.OrdersGetRequest(orderID);
    const orderDetails = await client.execute(orderRequest);

    // Kiểm tra xem đơn hàng đã được capture chưa
    if (
      orderDetails.result.purchase_units &&
      orderDetails.result.purchase_units[0]?.payments?.captures?.length > 0
    ) {
      throw createError({
        statusCode: 400,
        message: "Order has already been captured.",
      });
    }

    // Gửi yêu cầu tới PayPal để capture thanh toán
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const capture = await client.execute(request);
    console.log("Capture Response:", JSON.stringify(capture, null, 2));

    // Kiểm tra dữ liệu trả về
    if (capture.result && capture.result.purchase_units) {
      const purchaseUnit = capture.result.purchase_units[0]; // Lấy đơn vị mua đầu tiên
      const paymentCapture = purchaseUnit.payments?.captures?.[0]; // Lấy thông tin giao dịch

      if (paymentCapture && paymentCapture.status === "COMPLETED") {
        // Lấy thông tin purchase_units
        const paymentStatus = capture.result.status;
        const purchaseUnits = capture.result?.purchase_units || [];
        const firstPurchaseUnit = purchaseUnits[0] || {};
        const payments = firstPurchaseUnit?.payments || {};
        const captures = payments?.captures || [];
        const firstCapture = captures[0] || {};

        // Lấy thông tin cần thiết từ capture
        const captureID = firstCapture?.id || null;
        const transactionID = firstCapture?.id || null; // PayPal không có processor_response.transaction_id trong phản hồi này
        const amountPaid = firstCapture?.amount?.value || null;
        const currencyCode = firstCapture?.amount?.currency_code || null;
        const payerID = capture.result?.payer?.payer_id || null;

        // Kiểm tra dữ liệu và trả về lỗi nếu thiếu thông tin
        if (
          !captureID ||
          !transactionID ||
          !amountPaid ||
          !currencyCode ||
          !payerID
        ) {
          throw createError({
            statusCode: 500,
            message: "Thiếu thông tin trong phản hồi của PayPal.",
            error: "Thông tin thanh toán không đầy đủ.",
          });
        }

        const query = `
          INSERT INTO payments (
            user_id, event_id, amount_paid, payment_method, payment_status,
            paypal_order_id, paypal_capture_id, paypal_transaction_id, paypal_payer_id, currency_code
          )
          VALUES (?, ?, ?, 'PayPal', ?, ?, ?, ?, ?, ?)
        `;

        const params = [
          userID,
          eventID,
          amountPaid,
          paymentStatus,
          orderID,
          captureID,
          transactionID,
          payerID,
          currencyCode,
        ];

        await pool.query(query, params);

        const ticketDetailsQuery = `
          INSERT INTO ticket_details (
            event_id, user_id, ticket_quantity
          )
          VALUES (?, ?, ?)
        `;

        await pool.query(ticketDetailsQuery, [eventID, userID, ticketQuantity]);

        // Cập nhật số lượng vé có sẵn trong bảng event_tickets
        console.log("eventID", eventID);
        console.log("ticketQuantity", ticketQuantity);

        const updateTicketsQuery = `
          UPDATE event_tickets
          SET available_tickets = available_tickets - ?
          WHERE event_id = ?
        `;

        const res = await pool.query(updateTicketsQuery, [
          ticketQuantity,
          eventID,
        ]);
        console.log("res", res);

        return {
          message: "Thanh toán thành công!",
          transactionID: paymentCapture.id, // ID giao dịch
        };
      } else {
        throw createError({
          statusCode: 400,
          message: "Thanh toán không thành công!",
        });
      }
    }
  } catch (error) {
    console.error("Error capturing PayPal order:", error);

    // Trả về thông tin lỗi chi tiết
    return {
      statusCode: 500,
      message: "Có lỗi xảy ra khi xử lý thanh toán.",
      error: error.message,
    };
  }
});
