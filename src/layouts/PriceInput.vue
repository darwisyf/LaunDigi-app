<template>
  <div
    class="bg-primary dark:bg-primary-dark text-gray-950 dark:text-white max-w-4xl mx-auto p-4 rounded-lg"
  >
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
          class="border w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-300 dark:hover:bg-indigo-800 dark:focus:bg-indigo-800"
          v-model="service.name"
          placeholder="Contoh: Cuci + Setrika"
        />
      </div>
      <!-- Services Price -->
      <div>
        <label for="" class="block text-md my-2">Harga Layanan</label>
        <input
          type="number"
          class="border w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-300 dark:hover:bg-indigo-800 dark:focus:bg-indigo-800"
          v-model="service.price"
        />
      </div>
      <div>
        <!-- Checkbox -->
        <label class="flex items-center gap-2 mb-4">
          <input type="checkbox" class="w-4 h-4" v-model="service.isChecked" />
          <span class="text-gray-500 dark:text-gray-300"
            >Apakah ada biaya Express?</span
          >
        </label>

        <!-- Show if checked -->
        <div v-if="service.isChecked">
          <label for="" class="block text-md my-2"
            >Masukkan tambahan biaya jasa express (bukan total harga setelah
            biaya express)</label
          >
          <input
            v-model="service.express"
            type="number"
            placeholder="Contoh: 3000"
            class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-300 dark:hover:bg-indigo-800 dark:focus:bg-indigo-800"
          />
        </div>
      </div>
      <!-- Remove Item -->
      <div class="col-span-2 flex items-end">
        <button
          v-if="services.length > 1"
          @click="removeItem(index)"
          class="text-red-500 text-sm cursor-pointer"
        >
          Hapus
        </button>
      </div>
    </div>

    <!-- Add Services -->
    <button
      class="bg-green-500 hover:bg-green-600 transition cursor-pointer px-2 py-1 rounded-md my-4 text-white"
      @click="addService"
    >
      + Add Service
    </button>

    <div class="flex justify-end">
      <div
        v-if="successMessage"
        class="flex justify-center items-center gap-1 mr-4 text-green-500"
      >
        <span>{{ successMessage }}</span>
        <Icon icon="line-md:confirm" class="text-xl" />
      </div>

      <div
        v-if="errorMessage"
        class="flex justify-center items-center gap-1 mr-4 text-red-500"
      >
        <span>{{ errorMessage }}</span>
        <Icon icon="line-md:close" class="text-xl" />
      </div>

      <!-- Save Button -->
      <button
        @click="handleCreateService"
        class="bg-blue-400 hover:bg-blue-500 transition cursor-pointer text-white rounded-sm px-8 py-2 shadow-md"
      >
        Simpan
      </button>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { createService } from "../services/serviceServices";

const services = reactive([
  {
    name: "",
    price: "",
    isChecked: false,
    express: "",
  },
]);

const addService = () => {
  services.push({
    name: "",
    price: "",
    isChecked: false,
    express: "",
  });
};

const removeItem = (index) => {
  services.splice(index, 1);
};

const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const handleCreateService = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  isLoading.value = true;

  const isEmpty = services.some((service) => !service.name || !service.price);

  if (isEmpty) {
    errorMessage.value = "Name and price are required";
    isLoading.value = false;
    return;
  }

  const payload = {
    services: services.map((service) => ({
      name: service.name,
      price_per_kg: service.price,
      express_multiplier: service.isChecked ? service.express : null,
    })),
  };

  try {
    await createService(payload);

    // reset data
    services.splice(0, services.length);
    services.push({
      name: "",
      price: "",
      isChecked: false,
      express: "",
    });

    successMessage.value = "Saved Successfully";
  } catch (error) {
    errorMessage.value =
      error.data?.message || "Something went wrong, please try again";
  } finally {
    isLoading.value = false;
  }
};
</script>
