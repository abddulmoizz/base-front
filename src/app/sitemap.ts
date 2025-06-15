import type { MetadataRoute } from "next"

const BASE_URL = "https://inspired-sunshine-587c5c91b5.strapiapp.com"

interface ApiProduct {
  id: number
  slug?: string
  updatedAt?: string
  attributes?: {
    slug?: string
    updatedAt?: string
  }
}

interface ProductForSitemap {
  slug: string
  updatedAt: string
}

interface ApiResponse {
  data: ApiProduct[]
}

async function getProducts(): Promise<ProductForSitemap[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/products?populate=*`, {
      next: { revalidate: 86400 }, // Revalidate daily
    })

    if (!res.ok) return []

    const { data }: ApiResponse = await res.json()
    return data.map((p: ApiProduct) => ({
      slug: p.attributes?.slug || p.slug || `product-${p.id}`,
      updatedAt: p.attributes?.updatedAt || p.updatedAt || new Date().toISOString(),
    }))
  } catch (error) {
    console.error("Error fetching products for sitemap:", error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  const productUrls = products.map((product: ProductForSitemap) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/product/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/details`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productUrls,
  ]
}
