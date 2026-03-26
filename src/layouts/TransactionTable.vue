<template>
  <table class="min-w-full">
    <thead class="border text-gray-800 dark:text-primary bg-white">
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Package Type</th>
        <th>Total Price</th>
        <th>Status</th>
        <th>Received at</th>
      </tr>
    </thead>
    <tbody v-if="transact.length" class="text-gray-800 dark:text-primary">
      <tr v-for="trx in transact" :key="trx.id" class="border">
        <td>{{ trx.id }}</td>
        <td>{{ trx.name }}</td>
        <td>{{ trx.phone }}</td>
        <td>{{ trx.package_type }}</td>
        <td>{{ formatCurrency(trx.total_price) }}</td>
        <td>{{ trx.status }}</td>
        <td>{{ formatDate(trx.received_at) }}</td>
      </tr>
    </tbody>
    <tbody
      v-else-if="errorMessage"
      class="border text-gray-800 dark:text-primary"
    >
      <tr>
        <td colspan="7" class="text-center">{{ errorMessage }}</td>
      </tr>
    </tbody>
    <tbody v-else class="border text-gray-800 dark:text-primary">
      <tr>
        <td colspan="7" class="text-center">Belum ada data transaksi</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getOrder } from "../services/orderService";
import { formatDate } from "../utils/formatDate.js";
import { formatCurrency } from "../utils/formatCurrency.js";

const transact = ref([]);
const errorMessage = ref("");
const isLoading = ref(false);

onMounted(async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    const response = await getOrder();
    transact.value = response.data;
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Gagal menampilkan data";
  }
});
</script>
