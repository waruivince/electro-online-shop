<script setup lang="ts">
const { items, isOpen, ordered, count, total, setQuantity, remove, clear, checkout, close } = useCart()
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/50" @click="close" />
    <aside
      class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl"
      role="dialog"
      aria-label="Shopping cart"
    >
      <div class="flex items-center justify-between border-b p-4">
        <h2 class="text-lg font-bold">Your cart <span class="text-gray-500">({{ count }})</span></h2>
        <button type="button" aria-label="Close cart" class="text-2xl leading-none" @click="close">×</button>
      </div>

      <div v-if="ordered" class="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <p class="text-xl font-bold">Order placed!</p>
        <p class="mt-2 text-gray-600">
          Thanks for shopping with VoltMart. This is a demo checkout, so no payment was taken.
        </p>
        <button type="button" class="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white" @click="close">
          Continue shopping
        </button>
      </div>

      <div v-else-if="items.length === 0" class="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <p class="text-xl font-bold">Your cart is empty</p>
        <p class="mt-2 text-gray-600">Add some electronics to get started.</p>
        <button type="button" class="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white" @click="close">
          Continue shopping
        </button>
      </div>

      <template v-else>
        <ul class="flex-1 divide-y overflow-y-auto">
          <li v-for="item in items" :key="item.id" class="flex gap-3 p-4">
            <img
              :src="item.image_url"
              :alt="item.name"
              width="80"
              height="80"
              class="h-20 w-20 rounded-lg border object-cover"
            />
            <div class="flex-1">
              <p class="text-xs text-gray-500">{{ item.brand }}</p>
              <NuxtLink :to="`/products/${item.slug}`" class="font-semibold" @click="close">
                {{ item.name }}
              </NuxtLink>
              <div class="mt-2 flex items-center justify-between">
                <div class="flex items-center rounded-lg border">
                  <button type="button" aria-label="Decrease quantity" class="px-3 py-1" @click="setQuantity(item.id, item.quantity - 1)">−</button>
                  <span class="px-2 text-sm">{{ item.quantity }}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    class="px-3 py-1 disabled:text-gray-300"
                    :disabled="item.quantity >= item.stock"
                    @click="setQuantity(item.id, item.quantity + 1)"
                  >+</button>
                </div>
                <p class="font-semibold">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>
            <button type="button" aria-label="Remove item" class="text-gray-400 hover:text-red-600" @click="remove(item.id)">✕</button>
          </li>
        </ul>

        <div class="border-t p-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Subtotal</span>
            <span class="text-xl font-bold">{{ formatPrice(total) }}</span>
          </div>
          <p class="mt-1 text-xs text-gray-500">Shipping and taxes are calculated at checkout.</p>
          <button type="button" class="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700" @click="checkout">
            Checkout · {{ formatPrice(total) }}
          </button>
          <button type="button" class="mt-2 w-full py-2 text-sm text-gray-500" @click="clear">Clear cart</button>
        </div>
      </template>
    </aside>
  </div>
</template>