<template>
  <div class="bg-primary rounded-xl border p-5 mb-6 max-w-4xl mx-auto shadow-xl">
    <h2 class="text-lg font-semibold mb-4">Data Pelanggan</h2>

    <!-- Search / Phone -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block text-sm mb-1">No HP</label>
        <input
          v-model="phone"
          type="tel"
          placeholder="08xxxxxxxxxx"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary/30 transition hover:bg-gray-200"
          @blur="checkCustomer"
        />
        <div class="flex items-center gap-1">
          <p v-if="isExisting" class="text-xs text-green-600 mt-1">
            Pelanggan ditemukan
          </p>
          <Icon
            v-if="isExisting"
            icon="ic:round-check"
            class="text-green-600 mt-1"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm mb-1">Nama Pelanggan</label>
        <input
          v-model="name"
          type="text"
          placeholder="Nama pelanggan"
          class="w-full border rounded-lg px-3 py-2 transition hover:bg-gray-200"
        />
      </div>
    </div>

    <!-- Info -->
    <div
      v-if="isExisting"
      class="text-sm bg-green-50 border border-green-200 text-green-700 rounded-lg p-3"
    >
      Pelanggan lama — data otomatis terisi
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

/* Local state */
const phone = ref("");
const name = ref("");
const isExisting = ref(false);

/* Dummy check (nanti dari API) */
const checkCustomer = () => {
  if (phone.value === "08123456789") {
    name.value = "Budi Santoso";
    isExisting.value = true;
  } else {
    isExisting.value = false;
  }
};

/* expose data ke parent */
defineExpose({
  phone,
  name,
  isExisting,
});
</script>
