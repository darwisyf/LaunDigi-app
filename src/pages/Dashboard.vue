<template>
  <PageTitle title="Dashboard" />
  <div class="max-w-11/12 p-3 mx-auto bg-primary rounded-lg grid grid-cols-3">
    <DashboardCard />
  </div>
</template>
<script setup>
import DashboardCard from "../components/DashboardCard.vue";
import PageTitle from "../components/PageTitle.vue";
</script>
  