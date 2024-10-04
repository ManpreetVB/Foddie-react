import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    ProductId: null,
    ProductName: "",
    Description: "",
    Price: "",
    Quantity: "",
    ImageUrl: "",
    CategoryId: "",
    IsActive: 1,
  });
  const [isEditing, setIsEditing] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5013/api/Admin/AddUpdateProduct",
        {
          ActionType: "Get",
        }
      );

      // Log the full response to understand its structure
      console.log("Fetch response:", response.data);

      // Ensure response.data.response exists and has the statusCode property
      if (response.data.response && response.data.response.statusCode === 200) {
        // Access the listProducts property within response.data.response
        const productsList = response.data.response.listProducts;

        // Check if listProducts is an array and has items
        if (Array.isArray(productsList) && productsList.length > 0) {
          setProducts(productsList);
        } else {
          console.log("No products found");
          setProducts([]);
        }
      } else {
        console.log(
          "API response status code not 200 or response data structure incorrect"
        );
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle add/update form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const actionType = product.ProductId ? "Update" : "Add";
  
    
    const productData = {
      productId:product.ProductId || 0,
      productName: product.ProductName,
      description: product.Description,
      price: parseFloat(product.Price), // Convert price to number
      quantity: parseInt(product.Quantity, 10), // Convert quantity to integer
      imageUrl: product.ImageUrl,
      categoryId: parseInt(product.CategoryId, 10), // Convert categoryId to integer
      isActive: product.IsActive ? 1 : 0, // Ensure isActive is sent as 1 or 0
      actionType: actionType
    };
  
    
    console.log("Submitting product:", productData);
  
    try {
      const response = await axios.post(
        "http://localhost:5013/api/Admin/AddUpdateProduct",
        productData // Send the correctly formatted productData
      );
  
      // Log the response to ensure it's working as expected
      console.log("Submit response:", response.data);
  
      if (response.data.response && response.data.response.StatusCode === 200) {
        fetchProducts(); // Refresh the product list
        clearForm(); // Clear the form after submission
        
      } else {
        console.log(response.data.response.StatusMessage);
      }
    } catch (error) {
      console.log("Error submitting product:", error);
    }
  };
  
  // Handle delete
  const handleDelete = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5013/api/Admin/AddUpdateProduct",
        {
          ProductId: productId,
          ActionType: "Delete",
        }
      );

      if (response.data.response.StatusCode === 200) {
        fetchProducts();
      } else {
        console.log(response.data.response.StatusMessage);
      }
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  // Edit product
  
    const handleEdit = (productToEdit) => {
      setProduct({
        ProductId: productToEdit.productId,
        ProductName: productToEdit.productName,
        Description: productToEdit.description,
        Price: productToEdit.price,
        Quantity: productToEdit.quantity,
        ImageUrl: productToEdit.imageUrl,
        CategoryId: productToEdit.categoryId,
        IsActive: productToEdit.isActive,
        
      });
      setIsEditing(true);
    };
   

  // Clear form
  const clearForm = () => {
    setProduct({
      ProductId: "",
      ProductName: "",
      Description: "",
      Price: "",
      Quantity: "",
      ImageUrl: "",
      CategoryId: "",
      IsActive: 1,
    });
    setIsEditing(false);
  };

  return (
    <>
    <div>
    <AdminHeader/>
      <div className="container"><h2>Product Management</h2></div>
<div className="container"mx-2 my-2>
      {/* Add/Update Product Form */}
      <form onSubmit={handleSubmit}>

      <input
          type="number"
          name="ProductId"
          value={product.ProductId}
          onChange={(e) =>
            setProduct({ ...product, ProductId: e.target.value })
          }
          placeholder="ProductId ID"
        />

        <input
          type="text"
          name="ProductName"
          value={product.ProductName}
          onChange={(e) =>
            setProduct({ ...product, ProductName: e.target.value })
          }
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="Description"
          value={product.Description}
          onChange={(e) =>
            setProduct({ ...product, Description: e.target.value })
          }
          placeholder="Description"
          required
        />
        <input
          type="float"
          name="Price"
          value={product.Price}
          onChange={(e) => setProduct({ ...product, Price: e.target.value })}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="Quantity"
          value={product.Quantity}
          onChange={(e) => setProduct({ ...product, Quantity: e.target.value })}
          placeholder="Quantity"
          required
        />
        <input
          type="text"
          name="ImageUrl"
          value={product.ImageUrl}
          onChange={(e) => setProduct({ ...product, ImageUrl: e.target.value })}
          placeholder="Image URL"
        />
        <input
          type="number"
          name="CategoryId"
          value={product.CategoryId}
          onChange={(e) =>
            setProduct({ ...product, CategoryId: e.target.value })
          }
          placeholder="Category ID"
        />
 <input
          type="number"
          name="IsActive"
          value={product.IsActive}
          onChange={(e) =>
            setProduct({ ...product, IsActive: parseInt(e.target.value, 10) })
          }
          placeholder="IsActive "
        />

        <button class="btn btn-primary" type="submit">
          {isEditing ? "Update" : "Add"} Product
        </button>
        {isEditing && (
          <button class="btn btn-danger" type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form><br></br>
      </div>
      {/* Display Product List */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ProductId</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((prod,index) => (
              <tr key={index}>
                <td>{prod.productId}</td>
                <td>{prod.productName}</td>
                <td>{prod.description}</td>
                <td>{prod.price}</td>
                <td>{prod.quantity}</td>
                <td>
                  <button
                    class="btn btn-primary"
                    type="submit"
                    onClick={() => handleEdit(prod)}
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger"
                    type="submit"
                    onClick={() => handleDelete(prod.productId)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};
export default ProductManagement;
