<template>
  <div
    class="bg-primary dark:bg-primary-dark text-gray-950 dark:text-white rounded-xl border p-5 mb-6 max-w-4xl mx-auto shadow-xl"
  >
    <h2 class="text-lg font-semibold mb-4">Data Pelanggan</h2>

    <!-- Search / Phone -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block text-sm mb-1">No HP</label>
        <input
          v-model="datas.phone"
          type="tel"
          placeholder="08xxxxxxxxxx"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary/30 transition hover:bg-gray-300 dark:hover:bg-indigo-800 dark:focus:bg-indigo-800"
        />
      </div>

      <div>
        <label class="block text-sm mb-1">Nama Pelanggan</label>
        <input
          v-model="datas.name"
          type="text"
          placeholder="Nama pelanggan"
          class="w-full border rounded-lg px-3 py-2 transition hover:bg-gray-300 dark:hover:bg-indigo-800 dark:focus:bg-indigo-800"
        />
      </div>
    </div>
  </div>

  <div class="max-w-4xl mx-auto">
    <!-- ITEMS -->
    <div
      v-for="(item, index) in datas.items"
      :key="index"
      class="grid grid-cols-12 gap-4 mb-4 border p-4 rounded-lg bg-primary dark:bg-primary-dark text-gray-950 dark:text-white shadow-xl"
    >
      <!-- Layanan -->
      <div class="col-span-12 md:col-span-4">
        <label class="block text-sm mb-1">Layanan</label>
        <select
          v-model="item.serviceId"
          class="w-full border rounded px-3 py-2 transition hover:bg-gray-300 dark:hover:bg-indigo-800 dark:focus:bg-indigo-800"
        >
          <option value="" disabled>Pilih layanan</option>
          <option
            v-for="service in services"
            :key="service.id"
            :value="service.id"
          >
            {{ service.name }} (Rp {{ service.price }}/kg)
          </option>
        </select>
      </div>

      <!-- Berat -->
      <div class="col-span-6 md:col-span-4">
        <label class="block text-sm mb-1">Berat (kg)</label>
        <input
          type="number"
          min="0"
          step="0.1"
          v-model.number="item.weight"
          class="w-full border rounded px-3 py-2 transition hover:bg-gray-300 dark:hover:bg-indigo-800 dark:focus:bg-indigo-800"
        />
      </div>

      <!-- Subtotal -->
      <div class="col-span-10 md:col-span-4">
        <label class="block text-sm mb-1">Subtotal</label>
        <div class="py-2">Rp {{ formatCurrency(itemSubtotal(item)) }}</div>
      </div>

      <!-- Remove -->
      <div class="col-span-2 flex items-end">
        <button
          v-if="datas.items.length > 1"
          @click="removeItem(index)"
          class="text-red-500 text-sm cursor-pointer"
        >
          Hapus
        </button>
      </div>
    </div>

    <!-- ADD ITEM -->
    <button
      @click="addItem"
      class="mb-6 text-gray-800 font-medium bg-green-300 hover:bg-green-400 transition cursor-pointer px-3 py-1 rounded-md shadow-md"
    >
      + Tambah Item
    </button>

    <!-- ORDER TYPE -->
    <div class="mb-6">
      <label class="block text-sm mb-1">Jenis Order</label>
      <select
        v-model="datas.orderType"
        class="w-full border rounded px-3 py-2 bg-primary dark:bg-primary-dark text-gray-950 dark:text-white shadow-xl transition hover:bg-gray-300 dark:hover:bg-indigo-800 dark:focus:bg-indigo-800"
      >
        <option value="REGULER">Reguler</option>
        <option value="EXPRESS">Express</option>
      </select>
    </div>

    <!-- TOTAL -->
    <div
      class="border-t pt-4 space-y-2 bg-primary dark:bg-primary-dark text-gray-950 dark:text-white p-3 rounded-b-xl shadow-xl"
    >
      <div class="flex justify-between">
        <span>Subtotal Item</span>
        <span>Rp {{ formatCurrency(itemsTotal) }}</span>
      </div>

      <div
        v-if="datas.orderType === 'EXPRESS'"
        class="flex justify-between text-orange-600"
      >
        <span>Biaya Express</span>
        <span>Rp {{ formatCurrency(EXPRESS_FEE) }}</span>
      </div>

      <div class="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>Rp {{ formatCurrency(grandTotal) }}</span>
      </div>
    </div>
  </div>

  <div class="max-w-4xl mx-auto mt-8 flex justify-end items-center">
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

    <div>
      <button
        class="bg-blue-400 hover:bg-blue-500 transition cursor-pointer text-white rounded-sm px-8 py-2 shadow-md"
        @click="handleOrder"
      >
        Simpan
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { reactive, computed, ref } from "vue";
import { createOrder } from "../services/orderService";

const EXPRESS_FEE = 3000;

// Dummy data (nanti dari API)
const services = [
  { id: 1, name: "Cuci Kering", price: 6000 },
  { id: 2, name: "Cuci + Setrika", price: 8000 },
  { id: 3, name: "Setrika Saja", price: 5000 },
];

const datas = reactive({
  phone: "",
  name: "",
  items: [
    {
      serviceId: "",
      weight: 0,
    },
  ],
  orderType: "REGULER",
});

const addItem = () => {
  datas.items.push({
    serviceId: "",
    weight: 0,
  });
};

const removeItem = (index) => {
  datas.items.splice(index, 1);
};

const getService = (id) => {
  return services.find((s) => s.id === id);
};

const itemSubtotal = (item) => {
  const service = getService(item.serviceId);
  if (!service || item.weight <= 0) return 0;

  return service.price * item.weight;
};

const itemsTotal = computed(() =>
  datas.items.reduce((total, item) => total + itemSubtotal(item), 0),
);

const expressFee = computed(() =>
  datas.orderType === "EXPRESS" ? EXPRESS_FEE : 0,
);

const grandTotal = computed(() => itemsTotal.value + expressFee.value);

const formatCurrency = (number) => {
  return number.toLocaleString("id-ID");
};

const payload = {
  package_type: datas.orderType,
  customer: {
    name: datas.name,
    phone: datas.phone,
  },
  items: datas.items.map((item) => ({
    service_id: item.serviceId,
    weight: item.weight,
  })),
};

const successMessage = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const handleOrder = async () => {
  successMessage.value = "";
  errorMessage.value = "";
  isLoading.value = true;

  if (!datas.phone || !datas.name) {
    errorMessage.value = "Phone and name are required";
    return;
  }

  if (datas.phone.length < 10) {
    errorMessage.value = "Invalid phone number";
    return;
  }

  if (!datas.orderType) {
    errorMessage.value = "Please select order type";
    return;
  }

  const invalidItem = datas.items.some(
    (item) => !item.serviceId || item.weight <= 0,
  );

  if (invalidItem) {
    errorMessage.value = "Please complete all items";
    return;
  }

  try {
    const response = await createOrder(payload);

    successMessage.value = "Order saved";
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Something went wrong, please try again";
  } finally {
    isLoading.value = false;
  }
};
</script>
