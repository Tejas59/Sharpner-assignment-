document.getElementById("product-form").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const sellingPrice = document.getElementById("Selling").value;
  const product = document.getElementById("product").value;
  const category = document.getElementById("category").value;


  const productItem = document.createElement("div");
  productItem.classList.add("product-item", "mb-3", "border", "p-2");
  productItem.innerHTML = `
    <strong>Product:</strong> ${product} - 
    <strong>Price:</strong> ₹${sellingPrice}
    <button type="button" class="btn btn-danger btn-sm float-end delete-btn">Delete</button>
  `;

  
  let categoryContainer = document.getElementById(`${category}-container`);
  if (!categoryContainer) {
    
    categoryContainer = document.createElement("div");
    categoryContainer.id = `${category}-container`;
    categoryContainer.innerHTML = `<h4>${category}</h4>`;
    document.getElementById("product-list").appendChild(categoryContainer);
  }
  categoryContainer.appendChild(productItem);

 
  document.getElementById("product-form").reset();

  try {
    const productDetails = {
      Selling: Number(sellingPrice),
      product: product.trim(),
      category: category
    };
    const response = await axios.post("https://crudcrud.com/api/fc8107a57ec9476db0c8e45dffae591a/task", productDetails);
    console.log(response);
  } catch (error) {
    console.error("Error adding product:", error);
    alert("An error occurred while adding the product.");
  }
});


document.getElementById("product-list").addEventListener("click", async function(event) {
  if (event.target.classList.contains("delete-btn")) {
    const productItem = event.target.parentNode;
    const categoryContainer = productItem.parentNode;
    categoryContainer.removeChild(productItem);

    const productId = productItem.getAttribute("data-product-id");
    try {
      const deleteResponse = await axios.delete(`https://crudcrud.com/api/fc8107a57ec9476db0c8e45dffae591a/task/${productId}`);
      console.log(deleteResponse);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  }
});

document.addEventListener("DOMContentLoaded", getProducts);

async function getProducts() {
  try {
    const response = await axios.get("https://crudcrud.com/api/fc8107a57ec9476db0c8e45dffae591a/task");
    const products = response.data;

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
      const listItem = document.createElement("div");
      listItem.classList.add("product-item", "mb-3", "border", "p-2");
      listItem.innerHTML = `
        <strong>Product:</strong> ${product.product} - 
        <strong>Price:</strong> ₹${product.Selling}
        <button type="button" class="btn btn-danger btn-sm float-end delete-btn">Delete</button>
      `;
      listItem.setAttribute("data-product-id", product._id);

      let categoryContainer = document.getElementById(`${product.category}-container`);
      if (!categoryContainer) {
        categoryContainer = document.createElement("div");
        categoryContainer.id = `${product.category}-container`;
        categoryContainer.innerHTML = `<h4>${product.category}</h4>`;
        productList.appendChild(categoryContainer);
      }
      categoryContainer.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    alert("An error occurred while fetching products.");
  }
}
