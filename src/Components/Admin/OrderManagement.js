import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [statusToUpdate, setStatusToUpdate] = useState("");

  const fetchOrders = () => {
    const email = localStorage.getItem("logedInUserEmail") || "admin@gmail.com"; // Fallback to default admin email
    const type = "Admin";

    const url = `http://localhost:5013/api/Product/OrderList`;

    axios
      .get(url, {
        params: {
          email: email,
          type: type,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Log API response to verify

        const ordersList = response.data.response.listOrders || []; // Correctly accessing nested listOrders

        // Check if ordersList is an array and has items
        if (Array.isArray(ordersList) && ordersList.length > 0) {
          setOrders(ordersList); // Set orders from the response
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

  const updateOrderStatus = (order) => {
    if (!statusToUpdate) {
      console.error("No status selected.");
      return; // Don't proceed if no status is selected
    }

    // Prepare data to send to backend
    const updatedOrder = {
      orderNumber: order.orderNumber,
      status: statusToUpdate, // Get the status from the state
    };

    const url = `http://localhost:5013/api/Admin/UpdateOrderStatus`;

    console.log("Updating order status:", updatedOrder); // Log the updated order

    axios
      .put(url, updatedOrder) // Use POST method to update order status
      .then((response) => {
        console.log("Update Response:", response.data);
        fetchOrders(); // Re-fetch orders after updating
        
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  

  return (
    <>
    <AdminHeader/>
      <h4>Order Management</h4>
      {orders.length > 0 ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white"}}
        >
          <thead className="thead-dark">
            <tr>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Order Total</th>
              <th>Order Date</th>
              <th>Update Status</th> {/* New column for updating status */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderNumber}</td>
                <td>{order.customerName}</td>
                <td>{order.status}</td>
                <td>${order.price}</td>
                <td>{order.quantity}</td>
                <td>${order.orderTotal}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>
                  <select
                    value={statusToUpdate}
                    onChange={(e) => setStatusToUpdate(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processed">Processed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button className="btn btn-primary" type="submit"
                    onClick={() => {
                     
                      updateOrderStatus(order);
                    }}
                    disabled={!statusToUpdate} style={{ marginLeft: "10px" }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available.</p>
      )}
    </>
  );
};

export default OrderManagement;
