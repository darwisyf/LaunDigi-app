<template>
  <PageTitle title="Riwayat Transaksi" />
  <div class="p-6 text-center">
    <TransactionTable />
  </div>
</template>
<script setup>
import PageTitle from "../components/PageTitle.vue";
import TransactionTable from "../layouts/TransactionTable.vue";
</script>
