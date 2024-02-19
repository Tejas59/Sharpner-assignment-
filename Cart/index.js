function handleFormSubmit(event) {
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
    Selling:Selling,
    product:product,
    category:category
  };

 
    axios.post("https://crudcrud.com/api/c140db2df8444142bfaf2349a8b077df/task", productDetails)
  
   .then((res)=>{
    updateproductList(res.data)
    console.log(res)
   })
  .catch((err)=>{
    console.log(err)
  });
  

 
  SellingInput.value = '';
  productInput.value = '';
  categoryInput.value = '';

  
  updateproductList(existingproducts);

 
  
}

async function getProducts() {
  try {
    const response = await axios.get("https://crudcrud.com/api/c140db2df8444142bfaf2349a8b077df/task");
    const products = response.data;

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

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
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this product?')) {
          try {
            const deleteResponse = await axios.delete(
              `https://crudcrud.com/api/c140db2df8444142bfaf2349a8b077df/task/${product._id}`
            );
            listItem.remove();
            getProducts(); 
          } catch (error) {
            console.error('Error deleting product:', error);
            alert('An error occurred. Please try again later.');
          }
        }
      });

      listItem.appendChild(deleteButton);
      productList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    alert('An error occurred while fetching products.');
  }
}


getProducts();

function removeproduct(index) {
 
  const existingproducts = JSON.parse(localStorage.getItem('products') || '[]');

 
  if (confirm('Do you want to delete this product?')) {
    existingproducts.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(existingproducts));
    updateproductList(existingproducts);
  }
}






function updateproductList(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

 
  products.forEach((product, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = `| Selling: ${product.Selling} |Description: ${product.product} | Category: ${product.category} |`;
    listItem.style.fontWeight = 'bold';
    listItem.style.fontSize = '16px';
    listItem.style.padding = '10px';

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'rounded-pill', 'shadow-sm', 'fw-bold', 'text-uppercase', 'border', 'border-primary');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editproduct(index));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'rounded-pill', 'shadow-sm', 'fw-bold', 'text-uppercase', 'border', 'border-primary');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => removeproduct(index));

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    productList.appendChild(listItem);
  });
}


const form = document.getElementById('product-form');
form.addEventListener('submit', handleFormSubmit);


document.addEventListener('DOMContentLoaded', () => {
  const existingproducts = JSON.parse(localStorage.getItem('products') || '[]');
  updateproductList(existingproducts);
});