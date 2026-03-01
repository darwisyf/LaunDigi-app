<template>
  <div class="flex min-h-screen">
    <Sidebar />

    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import Sidebar from "../components/Sidebar.vue";
</script>
