const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Fake product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
    inStock: true
  },
  {
    id: 2,
    name: "Gaming Mouse",
    price: 59.99,
    category: "Electronics",
    description: "Ergonomic gaming mouse with RGB lighting",
    inStock: true
  },
  {
    id: 3,
    name: "Coffee Mug",
    price: 12.99,
    category: "Kitchen",
    description: "Ceramic coffee mug with heat-resistant handle",
    inStock: false
  },
  {
    id: 4,
    name: "Desk Lamp",
    price: 45.00,
    category: "Furniture",
    description: "Adjustable LED desk lamp with touch controls",
    inStock: true
  },
  {
    id: 5,
    name: "Smartphone Case",
    price: 24.99,
    category: "Accessories",
    description: "Protective smartphone case with card holder",
    inStock: true
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Products API' });
});

// Get all users names from JSONPlaceholder API
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const userNames = response.data.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }));
    
    res.json({
      success: true,
      data: userNames,
      count: userNames.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users from external API',
      error: error.message
    });
  }
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: products,
    count: products.length
  });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET /api/products - Get all products`);
  console.log(`  GET /api/products/:id - Get product by ID`);
  console.log(`  GET /api/users - Get all users from JSONPlaceholder`);
});
