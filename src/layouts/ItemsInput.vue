<template>
  <div class="max-w-4xl mx-auto">
    <!-- ITEMS -->
    <div
      v-for="(item, index) in items"
      :key="index"
      class="grid grid-cols-12 gap-4 mb-4 border p-4 rounded-lg bg-primary shadow-xl"
    >
      <!-- Layanan -->
      <div class="col-span-12 md:col-span-4">
        <label class="block text-sm mb-1">Layanan</label>
        <select
          v-model="item.serviceId"
          class="w-full border rounded px-3 py-2 transition hover:bg-gray-200"
        >
          <option value="">Pilih layanan</option>
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
          class="w-full border rounded px-3 py-2 transition hover:bg-gray-200"
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
          v-if="items.length > 1"
          @click="removeItem(index)"
          class="text-red-500 text-sm"
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
        v-model="orderType"
        class="w-full border rounded px-3 py-2 bg-primary shadow-xl transition hover:bg-gray-200"
      >
        <option value="regular" class="bg-primary">Reguler</option>
        <option value="express" class="bg-primary">Express</option>
      </select>
    </div>

    <!-- TOTAL -->
    <div class="border-t pt-4 space-y-2 bg-primary p-3 rounded-b-xl shadow-xl">
      <div class="flex justify-between">
        <span>Subtotal Item</span>
        <span>Rp {{ formatCurrency(itemsTotal) }}</span>
      </div>

      <div
        v-if="orderType === 'express'"
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
</template>

<script setup>
import { reactive, computed, ref } from "vue";

const orderType = ref("reguler");
const EXPRESS_FEE = 3000;

/* Dummy data (nanti dari API) */
const services = [
  { id: 1, name: "Cuci Kering", price: 6000 },
  { id: 2, name: "Cuci + Setrika", price: 8000 },
  { id: 3, name: "Setrika Saja", price: 5000 },
];

const items = reactive([
  {
    serviceId: "",
    weight: 0,
    type: "regular",
  },
]);

const addItem = () => {
  items.push({
    serviceId: "",
    weight: 0,
    type: "regular",
  });
};

const removeItem = (index) => {
  items.splice(index, 1);
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
  items.reduce((total, item) => total + itemSubtotal(item), 0),
);

const expressFee = computed(() =>
  orderType.value === "express" ? EXPRESS_FEE : 0,
);

const grandTotal = computed(() => itemsTotal.value + expressFee.value);

const formatCurrency = (number) => {
  return number.toLocaleString("id-ID");
};

defineExpose({
  items,
  orderType,
  itemsTotal,
  grandTotal,
});
</script>
