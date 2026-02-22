<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white p-6 rounded-xl w-80 space-y-4">
      <h1 class="text-xl font-bold text-center">Login</h1>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full border p-2 rounded"
      />

      <input
        v-model="password"
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

      <button
        @click="handleLogin"
        class="w-full bg-tertiary hover:bg-tertiary-dark cursor-pointer py-2 rounded"
      >
        Login
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/authService";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  if (!email.value || !password.value) {
    errorMessage.value = "Email dan Password wajib diisi";
    isLoading.value = false;
    return;
  }

  try {
    const data = await login(email.value, password.value);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/dashboard");
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Login gagal";
  } finally {
    isLoading.value = false;
  }
};
</script>
