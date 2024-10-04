import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Orders = ({  email }) => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
      const fetchOrders = async () => {
        const email=localStorage.getItem("logedInUserEmail");
        try {
          const response = await axios.get(`http://localhost:5013/api/Product/OrderList?email=${email}&type=User`);

      
          console.log('Full API Response:', response);
      
          // Check if response.data exists and it has the 'response' object
          if (response.data && response.data.response) {
            const {  listOrders } = response.data.response;
      
            // Handle response based on status code
            
              if (listOrders && listOrders.length > 0) {
                setOrders(listOrders); // Set the orders if available
              } else {
                setError('No orders found.');
              }
            } 
        } catch (err) {
          console.error('Error fetching orders:', err);
          setError('An error occurred while fetching orders.');
        }
      };
      
      fetchOrders();
    }, [ email]);
        return (
        <>
        <Header/>
          <div className='container my-4'>
            <h2>Your Orders</h2>
            </div>
            <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-dark">
                    <tr>
                    <th>Customer Name</th>
                        <th>Order Number</th>
                       
                        <th>Status</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Order Total</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={index}>
                              <td>{order.customerName}</td>
                                <td>{order.orderNumber}</td>
                               
                                <td>{order.status}</td>
                                <td>{order.productName}</td>
                                <td>{order.description}</td>
                                <td>${order.price}</td>
                                <td>{order.quantity}</td>
                                <td>${order.orderTotal}</td>
                                <td><img src={order.imageUrl} alt={order.productName} width="50" /></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Orders;
