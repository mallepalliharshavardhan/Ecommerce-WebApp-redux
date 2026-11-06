import "dotenv/config";
import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Over-ear Bluetooth headphones with noise isolation.",
    price: 79.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",
    stock: 25,
  },
  {
    name: "Cotton T-Shirt",
    description: "Soft everyday t-shirt available in multiple sizes.",
    price: 19.99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
    stock: 50,
  },
  {
    name: "Ceramic Coffee Mug",
    description: "12 oz mug suitable for hot and cold drinks.",
    price: 12.5,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85",
    stock: 40,
  },
  {
    name: "Running Shoes",
    description: "Lightweight shoes designed for daily runs.",
    price: 89.0,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
    stock: 18,
  },
  {
    name: "Notebook Set",
    description: "Pack of three lined notebooks for school or work.",
    price: 9.99,
    category: "Stationery",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=85",
    stock: 60,
  },
  {
    name: "Desk Lamp",
    description: "Adjustable LED lamp with three brightness levels.",
    price: 34.95,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85",
    stock: 22,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    const products = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${products.length} products`);
    process.exit(0);
  } catch (error) {
    console.error(`Failed to seed products: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
