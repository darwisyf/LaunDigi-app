<template>
  <div class="p-3 rounded-md bg-tertiary w-full">
    <div class="grid grid-rows-2">
      <h4 class="text-center">{{ title }}</h4>
      <h3>{{ total }}</h3>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
    default: "Total",
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});
</script>
