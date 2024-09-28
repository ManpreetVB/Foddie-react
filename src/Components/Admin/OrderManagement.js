import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const email = localStorage.getItem("logedInUserEmail") || "admin@gmail.com"; // Fallback to default admin email
    const userId = 2; // Assuming admin's userId is 2
    const type = "Admin";

    const url = `http://localhost:5013/api/Product/OrderList`;

    axios
      .get(url, {
        params: {
          userId: userId,
          email: email,
          type: type,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Log API response to verify

        // Check if listOrders is available and is an array
        if (response.data && response.data.listOrders && Array.isArray(response.data.listOrders)) {
          setOrders(response.data.listOrders); // Set orders from the response
        } else {
          console.log("No orders found or incorrect response format.");
          setOrders([]); // Set an empty array if no orders are found
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]); // Set an empty array in case of error
      });
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, []);

  return (
    <div>
      <h1>Order Management</h1>
      {/* Check if orders exist and map through them */}
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Order Total</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderNumber}</td>
                <td>{order.customerName}</td>
                <td>{order.status}</td>
                <td>${order.orderTotal}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default OrderManagement;
