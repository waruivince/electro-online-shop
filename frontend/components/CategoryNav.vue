<script setup lang="ts">
defineProps<{ categories: any[] | null; active?: string }>()
</script>

<template>
  <nav class="mb-8 flex flex-wrap gap-2" aria-label="Categories">
    <NuxtLink
      to="/"
      class="rounded-full border px-4 py-1.5 text-sm"
      :class="!active ? 'border-blue-600 bg-blue-600 text-white' : 'hover:bg-gray-50'"
    >
      All
    </NuxtLink>
    <NuxtLink
      v-for="category in categories"
      :key="category.id"
      :to="`/category/${category.slug}`"
      class="rounded-full border px-4 py-1.5 text-sm"
      :class="active === category.slug ? 'border-blue-600 bg-blue-600 text-white' : 'hover:bg-gray-50'"
    >
      {{ category.name }}
    </NuxtLink>
  </nav>
</template>