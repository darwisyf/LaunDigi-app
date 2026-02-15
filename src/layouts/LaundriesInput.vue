<template>
  <form class="max-w-3xl mx-auto bg-primary p-10 rounded-xl border">
    <!-- Laundries Name -->
    <label class="block text-md my-2">Nama Laundry</label>
    <input v-model="form.name" type="text" class="border w-full rounded p-2" />

    <!-- Phone Number -->
    <label class="block text-md my-2">No HP</label>
    <input v-model="form.phone" type="tel" class="border w-full rounded p-2" />

    <!-- Address -->
    <label class="block text-md my-2">Alamat</label>
    <textarea
      v-model="form.address"
      rows="3"
      class="border w-full rounded p-2"
    />

    <!-- Package -->
    <label class="block text-md my-2">Package</label>
    <select v-model="form.package" class="border w-full rounded p-2">
      <option value="basic">Basic</option>
      <option value="pro">Pro</option>
      <option value="enterprise">Enterprise</option>
    </select>

    <!-- Active Until -->
    <label class="block text-md my-2">Active Until</label>
    <input
      v-model="form.activeUntil"
      type="date"
      class="border w-full rounded p-2"
    />

    <!-- Save Button -->
    <button type="submit" class="bg-blue-400 px-5 py-2 mt-5 rounded-md">
      Save
    </button>
  </form>
</template>
<script setup>
import { reactive } from "vue";

const form = reactive({
  name: "",
  phone: "",
  address: "",
  package: "basic",
  activeUntil: "",
});
</script>
