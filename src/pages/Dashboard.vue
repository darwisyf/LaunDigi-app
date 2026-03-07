<template>
  <PageTitle title="Dashboard" />
  <h2 class="max-w-11/12 p-3 mx-auto font-semibold dark:text-white">
    Selamat {{ greet }}, {{ user.name }}
  </h2>
  <div class="max-w-11/12 p-3 mx-auto bg-primary rounded-lg grid grid-cols-3">
    <DashboardCard />
  </div>
</template>
<script setup>
import DashboardCard from "../components/DashboardCard.vue";
import PageTitle from "../components/PageTitle.vue";

const user = JSON.parse(localStorage.getItem("user"));

const time = new Date();
const hour = time.getHours();
const greet =
  hour >= 3 && hour < 10
    ? "Pagi"
    : hour >= 10 && hour < 15
      ? "Siang"
      : hour >= 15 && hour < 18
        ? "Sore"
        : "Malam";
</script>
