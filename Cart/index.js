// Function to create a new product
async function addProduct(event) {
    event.preventDefault(); // Prevent form submission
  
    const productData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value
    };
  
    try {
      const response = await axios.post("https://crudcrud.com/api/c01b569c0fea4ad9ae8af7e8bfb1f786/demo", productData);
      const newProduct = response.data;
      displayProduct(newProduct); // Display the new product on the screen
      clearForm(); // Clear the form fields
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error
    }
  }
  
  // Function to fetch all products
  async function getAllProducts() {
    try {
      const response = await axios.get("https://crudcrud.com/api/c01b569c0fea4ad9ae8af7e8bfb1f786/demo");
      const products = response.data;
      products.forEach(displayProduct); // Display all products on the screen
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error
    }
  }
  
  // Function to delete a product
  async function deleteProduct(productId, listItem) {
    try {
      await axios.delete(`https://crudcrud.com/api/c01b569c0fea4ad9ae8af7e8bfb1f786/demo/${productId}`);
      listItem.remove(); // Remove the product from the screen
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error
    }
  }
  
  // Function to display product on the screen
  function displayProduct(product) {
    const productList = document.getElementById("product-list");
  
    const listItem = document.createElement("li");
    listItem.textContent = `Product: ${product.username}, Description: ${product.email}, Price: ${product.phone}`;
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteProduct(product._id, listItem)); // Assuming _id is the unique identifier for each product
  
    listItem.appendChild(deleteButton);
    productList.appendChild(listItem);
  }
  
  // Function to clear form fields
  function clearForm() {
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    addProduct(event);
  }
  
  // Load all products when the page loads
  getAllProducts();
  