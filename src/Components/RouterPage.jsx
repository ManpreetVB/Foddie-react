import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Registration from "./User/Registration";
import Dashboard from "./User/Dashboard";
import ProductDisplay from "./User/ProductDisplay";
import Orders from "./User/Orders";
import Profile from "./User/Profile";
import Cart from "./User/Cart";
import AdminDashboard from "./Admin/AdminDashboard";
import UserList from "./Admin/UserList";
import ProductManagement from "./Admin/ProductManagement";
import OrderManagement from "./Admin/OrderManagement";
import ProductList from "./Admin/ProductList";
const RouterPage = () => {
    return(
        <Router>
            <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/productdisplay" element={<ProductDisplay/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/orders" element={<Orders/>} />

            <Route path="/admindashboard" element={<AdminDashboard/>} />
            <Route path="/userlist" element={<UserList/>} />
            <Route path="/productmanagement" element={<ProductManagement/>} />
            <Route path="/ordermanagement" element={<OrderManagement/>} />
            <Route path="/productlist" element={<ProductList/>} />
            </Routes>
        </Router>
    );
};

export default RouterPage;