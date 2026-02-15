<template>
  <div class="bg-primary max-w-4xl mx-auto p-4 rounded-lg">
    <div
      class="border rounded-md p-2 grid grid-cols-2 items-center gap-2 my-3"
      v-for="(service, index) in services"
      :key="index"
    >
      <!-- Services Name -->
      <div>
        <label for="" class="block text-md my-2">Nama Layanan</label>
        <input
          type="text"
          class="border w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          v-model="service.name"
          placeholder="Contoh: Cuci + Setrika"
        />
      </div>
      <!-- Services Price -->
      <div>
        <label for="" class="block text-md my-2 none">Harga Layanan</label>
        <input
          type="number"
          class="border w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          v-model="service.price"
        />
      </div>
      <!-- Remove -->
      <div class="col-span-2 flex items-end">
        <button
          v-if="services.length > 1"
          @click="removeItem(index)"
          class="text-red-500 text-sm"
        >
          Hapus
        </button>
      </div>
    </div>

    <!-- Add Services -->
    <button
      class="bg-green-500 px-2 py-1 rounded-md my-4 text-white"
      @click="addService"
    >
      + Add Service
    </button>

    <div>
      <!-- Checkbox -->
      <label class="flex items-center gap-2 mb-4">
        <input type="checkbox" class="w-4 h-4" v-model="isChecked" />
        <span class="text-gray-500">Apakah ada jasa express?</span>
      </label>

      <!-- Show if checked -->
      <div v-if="isChecked">
        <input
          type="number"
          placeholder="Masukkan harga express"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";

const isChecked = ref(false);

const services = reactive([
  {
    name: "",
    price: "",
  },
]);

const addService = () => {
  services.push({
    name: "",
    price: "",
  });
};

const removeItem = (index) => {
  services.splice(index, 1);
};
</script>
