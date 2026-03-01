<template>
  <div class="flex items-center justify-center min-h-1/2">
    <div class="bg-white p-6 rounded-xl max-w-120">
      <h1 class="text-xl font-bold text-center">Register</h1>
      <form @submit.prevent="handleRegist" class="space-y-4">
        <label for="">Your Name</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Name"
          class="w-full border p-2 rounded"
        />

        <label for="">Your Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="w-full border p-2 rounded"
        />

        <label for="">Role</label>
        <select
          name=""
          id=""
          class="w-full border p-1 rounded"
          v-model="form.role"
        >
          <option disabled value="">Pilih Role</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </select>

        <label for="">Your Laundry Name</label>
        <input
          v-model="form.laundry_name"
          type="text"
          placeholder="Laundry Name"
          class="w-full border p-2 rounded"
        />

        <label for="">Package</label>
        <select
          name=""
          id=""
          class="w-full border p-1 rounded"
          v-model="form.package"
        >
          <option disabled value="">Pilih Package</option>
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>

        <label for="">Address</label>
        <textarea
          name=""
          id=""
          class="w-full border p-1 rounded"
          placeholder="Your address"
          v-model="form.address"
        ></textarea>

        <label for="">No. HP</label>
        <input
          type="tel"
          name=""
          id=""
          class="w-full border p-2 rounded"
          v-model="form.phone"
        />

        <label for="">Password</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="w-full border p-2 rounded"
        />

        <p
          v-if="errorMessage"
          class="text-sm rounded-md bg-red-400 text-primary px-2 py-1"
        >
          {{ errorMessage }}
        </p>

        <p
          v-if="successMessage"
          class="text-sm rounded-md bg-green-400 text-primary px-2 py-1"
        >
          {{ successMessage }}
        </p>

        <button
          type="submit"
          class="w-full bg-blue-400 hover:bg-blue-500 text-white transition cursor-pointer py-2 rounded font-semibold"
        >
          {{ isLoading ? "Loading..." : "Register" }}
        </button>

        <p class="text-xs text-gray-400">
          Sudah punya akun?
          <a href="/login" class="hover:underline">Login</a>
        </p>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../services/authService";

const form = reactive({
  name: "",
  email: "",
  password: "",
  role: "",
  laundry_name: "",
  package: "",
  address: "",
  phone: "",
});

const successMessage = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const router = useRouter();

const handleRegist = async () => {
  successMessage.value = "";
  errorMessage.value = "";
  isLoading.value = true;

  if (
    !form.name ||
    !form.email ||
    !form.password ||
    !form.role ||
    !form.laundry_name ||
    !form.package ||
    !form.address ||
    !form.phone
  ) {
    errorMessage.value = "Please fill all fields";
    isLoading.value = false;
    return;
  }

  if (form.phone.length < 10) {
    errorMessage.value = "Invalid phone number";
  }

  try {
    const response = await register(form);

    successMessage.value = "Registrasi Berhasil!";

    router.push("/dashboard");
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Register gagal";
  } finally {
    isLoading.value = false;
  }
};
</script>
