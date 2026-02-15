<template>
  <h2
    class="text-center my-8 text-2xl font-bold text-primary-dark dark:text-primary"
  >
    {{ title }}
  </h2>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
