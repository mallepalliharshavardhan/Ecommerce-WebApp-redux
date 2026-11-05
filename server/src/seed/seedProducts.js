import "dotenv/config";
import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Over-ear Bluetooth headphones with noise isolation.",
    price: 79.99,
    category: "Electronics",
    image: "/images/headphones.jpg",
    stock: 25,
  },
  {
    name: "Cotton T-Shirt",
    description: "Soft everyday t-shirt available in multiple sizes.",
    price: 19.99,
    category: "Clothing",
    image: "/images/tshirt.jpg",
    stock: 50,
  },
  {
    name: "Ceramic Coffee Mug",
    description: "12 oz mug suitable for hot and cold drinks.",
    price: 12.5,
    category: "Home",
    image: "/images/mug.jpg",
    stock: 40,
  },
  {
    name: "Running Shoes",
    description: "Lightweight shoes designed for daily runs.",
    price: 89.0,
    category: "Footwear",
    image: "/images/shoes.jpg",
    stock: 18,
  },
  {
    name: "Notebook Set",
    description: "Pack of three lined notebooks for school or work.",
    price: 9.99,
    category: "Stationery",
    image: "/images/notebook.jpg",
    stock: 60,
  },
  {
    name: "Desk Lamp",
    description: "Adjustable LED lamp with three brightness levels.",
    price: 34.95,
    category: "Home",
    image: "/images/lamp.jpg",
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
