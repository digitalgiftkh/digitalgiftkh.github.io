export interface Variation {
  id: string;
  name: string;
  color: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number | null;
  discount: number;
  image: string;
  comingSoon: boolean;
  variations: Variation[];
}

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "love", name: "Love & Romance" },
  { id: "memory", name: "Memory" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Digital Love Letter",
    description: "A beautifully crafted digital love letter that you can personalize with your own words, photo, and song.",
    category: "love",
    price: 4.9,
    originalPrice: 7,
    discount: 30,
    image: "/product1-1.png",
    comingSoon: false,
    variations: [
      { id: "original", name: "Original", color: "#ff6b8b", image: "/product1-1.png" },
      { id: "forest", name: "Forest Theme", color: "#4caf50", image: "/product1-2.png" },
      { id: "moon", name: "Moon Theme", color: "#9e9e9e", image: "/product1-3.png" },
    ],
  },
  {
    id: 2,
    name: "Digital Memory Map",
    description: "An interactive map that lets you share special memories, photos, and notes in one beautiful digital space.",
    category: "memory",
    price: 9.99,
    originalPrice: null,
    discount: 0,
    image: "/product2-1.jpg",
    comingSoon: true,
    variations: [
      { id: "original", name: "Original", color: "#6a5acd", image: "/product2-1.jpg" }
    ],
  },
];