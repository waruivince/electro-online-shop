<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const slug = route.params.slug as string

const { data: categories } = await useFetch<any[]>('/categories/', {
  baseURL: config.public.apiBase,
})
const category = categories.value?.find((c) => c.slug === slug)
if (!category) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found', fatal: true })
}

const { data: products } = await useFetch<any[]>('/products/', {
  baseURL: config.public.apiBase,
  query: { category: slug },
})

useSeoMeta({
  title: category.name,
  description: `Shop ${category.name.toLowerCase()} at VoltMart.`,
})
</script>

<template>
  <div>
    <CategoryNav :categories="categories" :active="slug" />
    <h1 class="mb-6 text-2xl font-bold">{{ category.name }}</h1>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>