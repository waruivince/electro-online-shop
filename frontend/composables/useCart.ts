export interface CartItem {
  id: number
  slug: string
  name: string
  brand: string
  price: number
  image_url: string
  stock: number
  quantity: number
}

const STORAGE_KEY = 'voltmart-cart'

export const useCart = () => {
  const items = useState<CartItem[]>('cart-items', () => [])
  const isOpen = useState<boolean>('cart-open', () => false)
  const ordered = useState<boolean>('cart-ordered', () => false)

  const count = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

  const save = () => {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
    }
  }

  const load = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) items.value = JSON.parse(saved)
    } catch {
      items.value = []
    }
  }

  const add = (product: any, quantity = 1) => {
    ordered.value = false
    const existing = items.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, product.stock)
    } else {
      items.value.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        price: Number(product.price),
        image_url: product.image_url,
        stock: product.stock,
        quantity: Math.min(quantity, product.stock),
      })
    }
    save()
    isOpen.value = true
  }

  const setQuantity = (id: number, quantity: number) => {
    const item = items.value.find((i) => i.id === id)
    if (!item) return
    item.quantity = Math.max(1, Math.min(quantity, item.stock))
    save()
  }

  const remove = (id: number) => {
    items.value = items.value.filter((i) => i.id !== id)
    save()
  }

  const clear = () => {
    items.value = []
    save()
  }

  const checkout = () => {
    clear()
    ordered.value = true
  }

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    ordered.value = false
  }

  return { items, isOpen, ordered, count, total, load, add, setQuantity, remove, clear, checkout, open, close }
}