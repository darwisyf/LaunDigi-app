<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <main class="p-5 bg-secondary dark:bg-secondary-dark w-full">
      <RouterView />
    </main>

    <!-- Footer -->
  </div>
</template>
<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>
