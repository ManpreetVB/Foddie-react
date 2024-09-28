import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Profile = () => {
  const [userId,setUserId] = useState("");
  const [userName,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [address,setAddress]=useState("");
  const [postCode,setPostCode]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [type,setType]=useState("")
  const [isActive,setIsActive]=useState("")
  const navigate = useNavigate();

  useEffect(() => {
    
    getData();
  }, []);

  const getData = () => {
    const email = localStorage.getItem("logedInUserEmail"); 
    const apiUrl = `http://localhost:5013/api/User/ViewUser?email=${encodeURIComponent(email)}`;
    console.log("API URL:", apiUrl);
    axios.get(apiUrl)
      .then((result) => {
        
        const data = result.data;
        if (data.response.statusCode === 200) {
          setUserId(data.response.user.userId);
          setUserName(data.response.user.userName);
          setEmail(data.response.user.email);
          setPassword(data.response.user.password);
          setAddress(data.response.user.address);
          setPostCode(data.response.user.postCode);
          setPhoneNumber(data.response.user.phoneNumber);
          setType(data.response.user.type);
          //alert(result.data.response.statusMessage);
        }
        else{
          alert(data.response.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
    const handleUpdateProfile = async (e) => {
      e.preventDefault();
      
      const apiUrl=(`http://localhost:5013/api/User/UpdateUserProfile`);
      const data = {
        UserId: userId,  // Ensure this has a valid value
        UserName: userName,
        Email: email,
        Password: password,
        Address: address,
        PostCode: postCode,
        PhoneNumber: phoneNumber,
        Type: type,
        IsActive: 1  
      };
  
      try {
        const res = await axios.put(apiUrl, data);
        if (res.data.response.statusCode === 200) {
          alert("Profile updated successfully.");
          getData(); // Refresh data after update
          clearForm(); // Clear form after successful update
        } else {
          alert(res.data.response.statusMessage); // Show alert if update fails
        }
      } catch (error) {
        console.error("Error updating profile", error);
      }
    };
  
    const clearForm = () => {
      // Reset form fields
      setUserName("");
          setEmail("");
          setPassword("");
          setAddress("");
          setPostCode("");
          setPhoneNumber("");
          setType("")  
        };
  
    
  return (
    <>
      <Header />
      <div className="container" style={{ width: "50%", margin: "0 auto" }}>

      <div className="row">
          <label className="label">UserId</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter User Id"
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
          />
        </div>

        <div className="row">
          <label className="label">UserName</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter User Name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>

        <div className="row">
          <label className="label">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
           
          />
        </div>

        <div className="row">
          <label className="label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="row">
          <label className="label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>

        <div className="row">
          <label className="label">PostCode</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter PostCode"
            onChange={(e) => setPostCode(e.target.value)}
            value={postCode}
          />
        </div>

        <div className="row">
          <label className="label">PhoneNumber</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter PhoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </div>

        <div className="row">
      <label className="label">Type</label>
        <div className="form-control"
          placeholder="Enter user type"
          >
       
        <select onChange={(e) => setType(e.target.value)}
          value={type} >
        <option value=" ">Select</option>
        <option value="#">User</option>
        <option value="#">Admin</option>  
         </select>
          
       </div> 

    

       </div>

      

        <div className="row">
          <button className="btn btn-primary" onClick={handleUpdateProfile}>
            Update
          </button>&nbsp;
          <button className="btn btn-danger" onClick={clearForm}>
            Reset
          </button>&nbsp;
        </div>
      </div>
    </>
  );
};

export default Profile;
