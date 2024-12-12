import { defineEventHandler, readBody } from "h3";
import paypal from "@paypal/checkout-server-sdk";

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
    const { amount } = body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount,
          },
        },
      ],
      application_context: {
        return_url: "http://localhost:3000/home/payments/success",
        cancel_url: "http://localhost:3000/home/payments/cancel",
      },
    });

    const order = await client.execute(request);

    // Trả về ID đơn hàng PayPal để frontend có thể tiến hành thanh toán
    return { orderID: order.result.id };
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
