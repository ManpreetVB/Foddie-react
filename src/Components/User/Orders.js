
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
const Order = ({ userId, email }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
          const email = localStorage.getItem("logedInUserEmail");

            try {
                const response = await axios.get(`http://localhost:5013/api/Product/OrderList?userId=${5}&Email=${email}&type=UserItem`);
                if (response.data && response.data.listOrders) {
                    setOrders(response.data.listOrders);
                } else {
                    setError('No orders found.');
                }
            } catch (err) {
                setError('Error fetching orders: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId, email]);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
      <>
      <Header/>
        <div>
          
            <h2>Your Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order.OrderId}>
                            <h3>Order Number: {order.OrderNumber}</h3>
                            <p>Total: ${order.OrderTotal.toFixed(2)}</p>
                            <p>Status: {order.Status}</p>
                            <p>Customer Name: {order.CustomerName}</p>
                            {order.ProductName && (
                                <div>
                                    <h4>Product Details:</h4>
                                    <p>Name: {order.ProductName}</p>
                                    <p>Description: {order.Description}</p>
                                    <p>Price: ${order.Price.toFixed(2)}</p>
                                    <p>Quantity: {order.Quantity}</p>
                                    <p>Total Price: ${order.TotalPrice.toFixed(2)}</p>
                                    {order.ImageUrl && <img src={order.ImageUrl} alt={order.ProductName} style={{ width: '100px', height: '100px' }} />}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders available.</p>
            )}
        </div>
        </>
    );
};

export default Order;
