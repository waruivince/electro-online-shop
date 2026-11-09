<script setup lang="ts">
const config = useRuntimeConfig()

const { data: products } = await useFetch<any[]>('/products/', {
  baseURL: config.public.apiBase,
})
const { data: categories } = await useFetch<any[]>('/categories/', {
  baseURL: config.public.apiBase,
})

useSeoMeta({
  title: 'Premium electronics at fair prices',
  description: 'Shop phones, laptops, headphones, cameras and more at VoltMart.',
})
</script>

<template>
  <div>
    
    <CategoryNav :categories="categories" />

    <h1 class="mb-6 text-2xl font-bold">All products</h1>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>