<template>
  <aside
    :class="[
      'bg-primary dark:bg-primary-dark border-r border-gray-200 dark:border-slate-700 p-4 transition-all duration-300 relative',
      isCollapse ? 'w-22' : 'w-64',
    ]"
  >
    <!-- Logo / Hamburger -->
    <div class="flex items-center justify-between p-4">
      <span
        v-if="!isCollapse"
        class="text-xl font-bold text-gray-700 dark:text-gray-50"
      >
        LaunDigi
      </span>

      <button
        @click="toggleSidebar"
        class="items-center text-gray-700 dark:text-gray-50 text-xl cursor-pointer"
      >
        <Icon icon="line-md:menu-fold-right" v-if="isCollapse" />
        <Icon icon="line-md:menu-fold-left" v-else />
      </button>
    </div>

    <!-- Menu -->
    <nav class="space-y-2">
      <RouterLink
        v-for="item in menus"
        :key="item.name"
        :to="item.to"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-50 hover:bg-tertiary/80 dark:hover:bg-tertiary-dark/80 transition"
        active-class="bg-tertiary-dark dark:bg-tertiary text-primary dark:text-gray-700"
      >
        <Icon :icon="item.icon" class="text-xl shrink-0" />
        <span v-if="!isCollapse" class="font-medium">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Dark Mode Button -->
    <div class="fixed bottom-3 m-1">
      <button
        @click="toggleDarkMode"
        class="text-gray-700 dark:text-gray-50 z-10 text-2xl hover:bg-tertiary dark:hover:bg-tertiary-dark rounded-md p-2 cursor-pointer"
      >
        <Icon icon="line-md:moon-filled" v-if="!isDark" />
        <Icon icon="line-md:sunny-outline" v-else />
      </button>
    </div>
  </aside>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";

const isCollapse = ref(false);

const menus = [
  { name: "dashboard", label: "Dashboard", to: "/", icon: "uil:home" },
  {
    name: "transaction",
    label: "Transaction",
    to: "/transaction",
    icon: "uil:transaction",
  },
  {
    name: "laundries",
    label: "Laundries",
    to: "/laundries",
    icon: "mingcute:wash-machine-line",
  },
  {
    name: "serviceprice",
    label: "Harga & Layanan",
    to: "/serviceprice",
    icon: "mingcute:currency-dollar-2-fill",
  },
];

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value;
};

const isDark = ref(false);

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    isDark.value = true;
  }
});

const toggleDarkMode = () => {
  const html = document.documentElement;

  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    isDark.value = false;
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    isDark.value = true;
  }
};
</script>
