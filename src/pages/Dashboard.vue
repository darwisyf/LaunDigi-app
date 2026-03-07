<template>
  <PageTitle title="Dashboard" />
  <h2 class="max-w-11/12 p-3 mx-auto font-semibold dark:text-white">
    Selamat Datang, {{ user.name }}
  </h2>
  <div class="max-w-11/12 p-3 mx-auto bg-primary rounded-lg grid grid-cols-3">
    <DashboardCard />
  </div>
</template>
<script setup>
import DashboardCard from "../components/DashboardCard.vue";
import PageTitle from "../components/PageTitle.vue";

const user = JSON.parse(localStorage.getItem("user"));
</script>
