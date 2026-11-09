<script setup lang="ts">
defineProps<{ product: any }>()
</script>

<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    class="group block overflow-hidden rounded-xl border bg-white transition hover:shadow-md"
  >
    <img
      :src="product.image_url"
      :alt="product.name"
      width="400"
      height="400"
      loading="lazy"
      class="aspect-square w-full object-cover"
    />
    <div class="p-4">
      <p class="text-xs uppercase tracking-wide text-gray-500">{{ product.brand }}</p>
      <h3 class="mt-1 font-semibold">{{ product.name }}</h3>
      <p class="mt-2 text-lg font-bold">{{ formatPrice(product.price) }}</p>
    </div>
  </NuxtLink>
</template>