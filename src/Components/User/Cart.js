import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newCartItem, setNewCartItem] = useState({ productId: "", quantity: 1, price: 0 });
  const email = localStorage.getItem("logedInUserEmail");

  // Fetch the cart data when the component loads
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    const url = `http://localhost:5013/api/Admin/CartList?Email=${email}`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.response && response.data.response.listCart) {
          setCartItems(response.data.response.listCart);
        } else {
          setCartItems([]); // No items in the cart
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Add to Cart API call
  const handleAddToCart = (e) => {
    e.preventDefault();
    const url = `http://localhost:5013/api/Product/AddToCart`;
    const data = {
      Email: email,
      ProductId: newCartItem.productId,
      Quantity: newCartItem.quantity,
      Price: newCartItem.price,
    };
    axios
      .post(url, data)
      .then((response) => {
        alert(response.data.response.statusMessage);
        fetchCartItems(); // Refresh cart after adding
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Remove from Cart API call
  const handleRemoveFromCart = (cartId) => {
    const url = `http://localhost:5013/api/Product/RemoveToCart`;
    const data = { CartId: cartId, Email: email };
    axios
      .post(url, data)
      .then((response) => {
        alert(response.data.response.statusMessage);
        fetchCartItems(); // Refresh cart after removing
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Place Order API call
  const handlePlaceOrder = () => {
    const url = `http://localhost:5013/api/Product/PlaceOrder`;
    const data = { Email: email };
    axios
      .post(url, data)
      .then((response) => {
        if (response.data.response.statusCode === 200) {
          alert(response.data.response.statusMessage);
          setCartItems([]); // Clear cart after placing the order
        } else {
          alert(response.data.response.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle input for new cart item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCartItem((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
    <Header/>
    <div className="container">
      <h3>Shopping Cart</h3>
<div className="container my-4">
      {/* Add to Cart Form */}
      <form onSubmit={handleAddToCart}>
        <div>
          <label>Product: </label>
          <input
            type="text"
            name="productId"
            value={newCartItem.productId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Quantity: </label>
          <input
            type="number"
            name="quantity"
            value={newCartItem.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="float"
            name="price"
            value={newCartItem.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button  class="btn btn-primary" type="submit">Add to Cart</button>
      </form>

      {/* Cart Items List */}
      {cartItems.length > 0 ? (
        <div>
          <h4>Your Cart Items:</h4>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                Product ID: {item.productId}, Price: {item.price}, Quantity: {item.quantity}{" "}
                <button  class="btn btn-danger" onClick={() => handleRemoveFromCart(item.cartId)}>Remove</button>
              </li>
            ))}
          </ul>

          {/* Place Order Button */}
          <button  class="btn btn-primary" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      ) : (
        "No items in your cart. Please add some products"
      )}
    </div>
    </div>
    </>
  );
};

export default ShoppingCart;
