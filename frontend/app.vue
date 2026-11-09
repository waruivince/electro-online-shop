<script setup lang="ts">
const { count, open, load } = useCart()

onMounted(() => load())
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900">
    <header class="border-b">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <NuxtLink to="/" class="text-xl font-bold">
          Volt<span class="text-blue-600">Mart</span>
        </NuxtLink>
        <button
          type="button"
          class="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          aria-label="Open cart"
          @click="open"
        >
          Cart
          <span v-if="count > 0" class="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
            {{ count }}
          </span>
        </button>
      </div>
    </header>
    <main class="mx-auto max-w-7xl px-4 py-8">
      <NuxtPage />
    </main>
    <CartDrawer />
  </div>
</template>