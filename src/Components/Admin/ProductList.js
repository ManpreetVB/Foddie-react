import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5013/api/Admin/ProductList');
        // Access the `listProducts` field correctly
        const productList = response.data.response.listProducts;
        setProducts(productList || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const AddToCart = async (productId) => {
    try {
      await axios.post('http://localhost:5013/api/Product/AddToCart', { productId });
      alert('Product added to cart');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart');
    }
  };

  const RemoveToCart = async (productId) => {
    
    try {
      await axios.delete(`http://localhost:5013/api/Product/RemoveToCart/${productId}`);
      alert('Product removed from cart');
    } catch (err) {
      console.error('Error removing from cart:', err);
      alert('Failed to remove product from cart');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <AdminHeader/>
      <h1>Product List</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ProductId</th>
            <th>ProductName</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>ImageUrl</th>
            <th>CategoryId</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.imageUrl && product.imageUrl !== '""' ? (
                    <img src={product.imageUrl} alt={product.productName} width="100" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{product.categoryId}</td>
                <td>
                  <button  class="btn btn-primary"
                    type="submit" onClick={() => AddToCart(product.productId)}>AddToCart</button>
                  <button  class="btn btn-danger"
                    type="submit" onClick={() => RemoveToCart(product.productId)} style={{ marginLeft: "10px" }}>RemoveFromCart</button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
