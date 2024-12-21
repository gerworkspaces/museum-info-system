<template>
  <div class="user-ticket-info">
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
    <p>Event: {{ event.name }}</p>
    <p>Date: {{ event.date }}</p>
    <p>Ticket Number: {{ ticket.number }}</p>
  </div>
</template>
<script>
export default {
  props: {
    user: Object,
    event: Object,
    ticket: Object,
  },
};
</script>

<style scoped>
.user-ticket-info {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
}
</style>
