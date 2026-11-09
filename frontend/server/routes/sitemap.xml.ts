export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const site = config.public.siteUrl
  const api = config.public.apiBase

  const [products, categories] = await Promise.all([
    $fetch<any[]>('/products/', { baseURL: api }),
    $fetch<any[]>('/categories/', { baseURL: api }),
  ])

  const paths = [
    '/',
    ...categories.map((c) => `/category/${c.slug}`),
    ...products.map((p) => `/products/${p.slug}`),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${site}${p}</loc></url>`).join('\n')}
</urlset>`

  setHeader(event, 'content-type', 'application/xml')
  return body
})