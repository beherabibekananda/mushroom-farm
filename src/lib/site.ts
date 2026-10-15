import fresh from "@/assets/fresh-oyster.webp";
import dry from "@/assets/dry-oyster.webp";

export const SITE = {
  name: "Shiva Agro",
  founder: "Mr. Ravindra Patel",
  tagline: "Naturally Grown. Freshly Packed. Delivered with Trust.",
  phone: "+91 8048785668",
  whatsapp: "918048785668",
  email: "viaravisingh198@gmail.com",
  address: "Hariharpur, Rohania, Varanasi, Uttar Pradesh – 221108, India",
  hours: "Mon – Sat · 9:00 AM – 6:00 PM",
  estYear: "2026",
  legalStatus: "Individual / Sole Proprietorship",
  businessType: "Manufacturer, Supplier & Trader",
  marketCovered: "Pan India",
};

export const waLink = (text = "Hello, I'd like to enquire about your products.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export type Product = {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  image: string;
  price?: string;
  moq?: string;
  specs: { label: string; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    id: "fresh-oyster",
    name: "Fresh Oyster Mushroom",
    description:
      "Freshly harvested, naturally grown oyster mushrooms with a delicate velvety texture and rich savory flavor — packaged in food-grade transparent containers.",
    highlights: ["100% Natural", "Freshly Harvested", "Smooth & Velvety"],
    image: fresh,
    price: "₹150.00 / Kg",
    moq: "5 Kg",
    specs: [
      { label: "Style", value: "Fresh" },
      { label: "Type", value: "Edible Mushroom" },
      { label: "Color", value: "Natural White / Beige" },
      { label: "Texture", value: "Smooth, Velvety" },
      { label: "Country of Origin", value: "India" },
      { label: "Shelf Life", value: "5 – 7 Days (Refrigerated)" },
    ],
  },
  {
    id: "dry-oyster",
    name: "Dry Oyster Mushroom",
    description:
      "Premium naturally dehydrated oyster mushrooms packed in sealed stand-up pouches. Rich in plant protein, antioxidants, and fiber with 6–12 months shelf life.",
    highlights: ["100% Natural", "No Preservatives", "6–12 Months Shelf Life"],
    image: dry,
    price: "₹1,000.00 – ₹1,400.00 / Kg",
    moq: "1 Kg",
    specs: [
      { label: "Style", value: "Dehydrated" },
      { label: "Drying Process", value: "Naturally Dried" },
      { label: "Type", value: "Edible Fungi" },
      { label: "Packaging", value: "Sealed Kraft Pouch" },
      { label: "Shelf Life", value: "6 – 12 Months" },
      { label: "Storage", value: "Cool, Dry Place" },
      { label: "Country of Origin", value: "India" },
    ],
  },
];

export const NAV = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Products", "/products"],
  ["Why Us", "/why"],
  ["Process", "/process"],
  ["Testimonials", "/testimonials"],
  ["Contact", "/contact"],
] as const;
