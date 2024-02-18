
async function addProduct(event) {
    event.preventDefault(); 
  
    const productData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value
    };
  
    try {
      const response = await axios.post("https://crudcrud.com/api/c01b569c0fea4ad9ae8af7e8bfb1f786/demo", productData);
      const newProduct = response.data;
      displayProduct(newProduct); 
      clearForm(); 
    } catch (error) {
      console.error("Error adding product:", error);
      
    }
  }
  
  async function getAllProducts() {
    try {
      const response = await axios.get("https://crudcrud.com/api/c01b569c0fea4ad9ae8af7e8bfb1f786/demo");
      const products = response.data;
      products.forEach(displayProduct);
    } catch (error) {
      console.error("Error fetching products:", error);
      
    }
  }
  
 
  async function deleteProduct(productId, listItem) {
    try {
      await axios.delete(`https://crudcrud.com/api/c01b569c0fea4ad9ae8af7e8bfb1f786/demo/${productId}`);
      listItem.remove();
    } catch (error) {
      console.error("Error deleting product:", error);
      
    }
  }
  
 
  function displayProduct(product) {
    const productList = document.getElementById("product-list");
  
    const listItem = document.createElement("li");
    listItem.textContent = `Product: ${product.username}, Description: ${product.email}, Price: ${product.phone}`;
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteProduct(product._id, listItem)); 
  
    listItem.appendChild(deleteButton);
    productList.appendChild(listItem);
  }
  
 
  function clearForm() {
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }
  
  
  function handleFormSubmit(event) {
    addProduct(event);
  }
  

  getAllProducts();
  