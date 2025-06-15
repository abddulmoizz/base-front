export const BASE_URL = "https://inspired-sunshine-587c5c91b5.strapiapp.com"

// Fallback configuration for when external API is unavailable
export const FALLBACK_CONFIG = {
  USE_MOCK_DATA: true,
  MOCK_PRODUCTS: [
    {
      id: 1,
      slug: "GAV01A-8A-Silver",
      title: "GAV01A-8A Silver G-SHOCK",
      price: "299.99",
      category: "Men's Watches",
    },
    {
      id: 2,
      slug: "GAV01B-1A-Black",
      title: "GAV01B-1A Black G-SHOCK",
      price: "279.99",
      category: "Men's Watches",
    },
    {
      id: 3,
      slug: "GAV01C-3A-Gold",
      title: "GAV01C-3A Gold G-SHOCK",
      price: "349.99",
      category: "Women's Watches",
    },
  ],
}
