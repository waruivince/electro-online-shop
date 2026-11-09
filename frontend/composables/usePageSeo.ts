export const usePageSeo = (opts: { title: string; description: string; image?: string }) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const url = `${config.public.siteUrl}${route.path}`

  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogUrl: url,
    ogType: 'website',
    ogSiteName: 'VoltMart',
    ogImage: opts.image,
    twitterCard: 'summary_large_image',
  })

  useHead({ link: [{ rel: 'canonical', href: url }] })

  return url
}