const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/add.html'));
});

// Function to transform product data
function transformProductData(product) {
  let price = [[0]];
  if (typeof product.price === 'string') {
    price = product.price.split(',').map(p => [parseFloat(p.trim())]);
  }

  let colors = [];
  if (typeof product.colors === 'string') {
    colors = product.colors.split(',').map(color => color.trim());
  }

  const description = product.description || 'No description available.';
  
  // Remove backticks from description if they are present
  const formattedDescription = description.replace(/```/g, '').trim();

  return {
    id: product.id,
    name: product.name || 'Unknown Product',
    price: price.length ? price : [[0]],
    imgSrc: Array.isArray(product.imgSrc) ? product.imgSrc : [],
    description: formattedDescription,
    rating: product.rating || 'No rating',
    protection: product.protection || 'No protection information',
    colors: colors.length ? colors : [],
    stock: typeof product.stock === 'string' ? parseInt(product.stock, 10) : product.stock || 0,
    linkPayment: product.linkPayment || 'No link available'
  };
}


// Function to format product data as JavaScript object literal
function formatProductData(products) {
  return `const products = [
  ${products.map(product => {
    return `  { 
    id: ${product.id},
    name: '${product.name}',
    price: ${JSON.stringify(product.price, null, 2)},
    imgSrc: ${JSON.stringify(product.imgSrc, null, 2)},
    description: ${JSON.stringify(product.description)}, // Use JSON.stringify for description
    rating: '${product.rating}',
    protection: '${product.protection}',
    colors: ${JSON.stringify(product.colors, null, 2)},
    stock: ${product.stock},
    linkPayment: '${product.linkPayment}'
  }`.replace(/"(\w+)":/g, '$1:') // Remove quotes from keys
    .replace(/"/g, "'"); // Replace double quotes with single quotes for values
  }).join(',\n')}
];`;
}

app.post('/upload', upload.array('images'), (req, res) => {
  const productData = req.body;
  const images = req.files;

  fs.readFile('data/dataProducts.js', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading dataProducts.js:', err);
      return res.status(500).json({ error: 'Error reading dataProducts.js' });
    }

    let products = [];
    let nextId = 1;

    try {
      const productsMatch = data.match(/const products = (\[[\s\S]*?\]);/);
      if (productsMatch && productsMatch[1]) {
        products = eval(productsMatch[1]);
        if (products.length > 0) {
          nextId = Math.max(...products.map(p => p.id)) + 1;
        }
      }
    } catch (parseErr) {
      console.error('Error parsing dataProducts.js:', parseErr);
      return res.status(500).json({ error: 'Error parsing dataProducts.js' });
    }

    const imagePaths = images.map(file => `/public/images/${file.filename}`);
    productData.imgSrc = imagePaths;

    productData.id = nextId;

    const transformedProductData = transformProductData(productData);

    const existingProductIndex = products.findIndex(p => p.id === parseInt(transformedProductData.id));
    if (existingProductIndex !== -1) {
      products[existingProductIndex] = {
        ...products[existingProductIndex],
        ...transformedProductData
      };
    } else {
      products.push(transformedProductData);
    }

    const updatedContent = formatProductData(products);
    fs.writeFile('data/dataProducts.js', updatedContent, 'utf8', err => {
      if (err) {
        console.error('Error writing to dataProducts.js:', err);
        return res.status(500).json({ error: 'Error writing to dataProducts.js' });
      }

      res.json({ message: 'Product data and images successfully updated!' });
    });
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
