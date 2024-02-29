async function handleFormSubmit(event) {
    event.preventDefault();
  
    const SellingInput = document.getElementById('Selling');
    const productInput = document.getElementById('product');
    const categoryInput = document.getElementById('category');
  
    const Selling = Number(SellingInput.value);
    const product = productInput.value.trim();
    const category = categoryInput.value;
  
    if (!Selling || typeof Selling !== 'number') {
      alert('Selling must be in number format only');
      return;
    }
  
    if (!product) {
      alert('product missing');
      return;
    }
  
    if (!category) {
      alert('Please select category');
      return;
    }
  
    const productDetails = {
      Selling: Selling,
      product: product,
      category: category
    };
  
    try {
      const response = await axios.post("https://crudcrud.com/api/5e9d94c66cc24c7fac77d8d9a4871174/task", productDetails);
      updateproductList(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  
    SellingInput.value = '';
    productInput.value = '';
    categoryInput.value = '';
  }
  
  async function getProducts() {
    try {
      const response = await axios.get("https://crudcrud.com/api/5e9d94c66cc24c7fac77d8d9a4871174/task");
      const products = response.data;
      updateproductList(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('An error occurred while fetching products.');
    }
  }
  
  function removeproduct(product, listItem) {
    if (confirm('Do you want to delete this product?')) {
      axios.delete(`https://crudcrud.com/api/5e9d94c66cc24c7fac77d8d9a4871174/task/${product._id}`)
        .then(() => {
          listItem.remove();
          updateTotalValue(product.Selling, true);
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          alert('An error occurred while deleting the product.');
        });
    }
  }
  
  function updateTotalValue(price, isDeleted) {
    const totalValue = document.getElementById('total-value');
    let currentTotal = Number(totalValue.textContent.split('₹')[1]);
  
    if (isDeleted) {
      currentTotal -= price;
    } else {
      currentTotal += price;
    }
  
    totalValue.textContent = `Total Value: ₹${currentTotal}`;
  }
  
  function updateproductList(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
  
    let totalSum = 0;
  
    products.forEach((product, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.textContent = `| Selling: ${product.Selling} | Description: ${product.product} | Category: ${product.category} |`;
      listItem.style.fontWeight = 'bold';
      listItem.style.fontSize = '16px';
      listItem.style.padding = '10px';
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'rounded-pill', 'shadow-sm', 'fw-bold', 'text-uppercase', 'border', 'border-primary');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        removeproduct(product, listItem);
      });
  
      listItem.appendChild(deleteButton);
      productList.appendChild(listItem);
  
      totalSum += product.Selling;
    });
  
    const totalValue = document.createElement('div');
    totalValue.id = 'total-value';
    totalValue.textContent = `Total Value: ₹${totalSum}`;
    totalValue.style.fontWeight = 'bold';
    totalValue.style.fontSize = '20px';
    productList.appendChild(totalValue);
  }
  
  const form = document.getElementById('product-form');
  form.addEventListener('submit', handleFormSubmit);
  
  document.addEventListener('DOMContentLoaded', () => {
    const existingproducts = JSON.parse(localStorage.getItem('products') || '[]');
    updateproductList(existingproducts);
    getProducts();
  });
  