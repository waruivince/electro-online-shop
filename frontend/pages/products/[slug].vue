<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const slug = route.params.slug as string

const { data: product, error } = await useFetch<any>(`/products/${slug}/`, {
  baseURL: config.public.apiBase,
})
if (error.value || !product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}

const description = product.value.description.slice(0, 155)

useSeoMeta({
  title: product.value.name,
  description,
  ogTitle: product.value.name,
  ogDescription: description,
  ogImage: product.value.image_url,
})

const stockLabel = computed(() => {
  const stock = product.value.stock
  if (stock === 0) return 'Out of stock'
  if (stock <= 5) return `Only ${stock} left`
  return 'In stock'
})
</script>

<template>
  <div>
    <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-900">← Back to all products</NuxtLink>

    <div class="mt-6 grid gap-8 md:grid-cols-2">
      <img
        :src="product.image_url"
        :alt="product.name"
        width="800"
        height="800"
        class="aspect-square w-full rounded-xl border object-cover"
      />

      <div>
        <NuxtLink
          :to="`/category/${product.category.slug}`"
          class="text-sm font-medium text-blue-600"
        >
          {{ product.category.name }}
        </NuxtLink>
        <p class="mt-2 text-xs uppercase tracking-wide text-gray-500">{{ product.brand }}</p>
        <h1 class="mt-1 text-3xl font-bold">{{ product.name }}</h1>
        <p class="mt-2 text-sm text-gray-500">
          ★ {{ product.rating }} ({{ product.review_count }} reviews)
        </p>
        <p class="mt-4 text-gray-700">{{ product.description }}</p>

        <dl class="mt-6 grid grid-cols-2 gap-3">
          <div v-for="(value, key) in product.specs" :key="key" class="rounded-lg border p-3">
            <dt class="text-xs text-gray-500">{{ key }}</dt>
            <dd class="font-semibold">{{ value }}</dd>
          </div>
        </dl>

        <p class="mt-6 text-3xl font-bold">{{ formatPrice(product.price) }}</p>
        <p class="mt-1 text-sm" :class="product.stock <= 5 ? 'text-amber-600' : 'text-green-600'">
          {{ stockLabel }}
        </p>
      </div>
    </div>
  </div>
</template>