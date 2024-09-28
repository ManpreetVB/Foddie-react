import React,{useState} from "react";
import axios from "axios";
import{useNavigate}from "react-router-dom";
import { Link } from "react-router-dom";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import Header from "./User/Header";
import "./Login.css"
const Login = () =>{
    
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState(""); 
    const [type,setType]=useState("");
    const navigate = useNavigate();

    const handleLogin = (e) =>{
      debugger
      e.preventDefault();
        const data={
                  "Email": email,
                  "Password": password,
        };
       const apiUrl=`http://localhost:5013/api/User/Login`; 
      
          axios.post(apiUrl,data)
          .then((result) =>{
            
            if (result.data.response.statusCode === 200)
            {
              localStorage.setItem("loggedInUser",true)
              if(result.data.response.user.type==="Admin")
              {
                localStorage.setItem("username",email);
                navigate("/admindashboard")
                //window.location.href="/admindashboard";
              }
              else
              {
                localStorage.setItem("logedInUserEmail",result.data.response.user.email)
                navigate("/dashboard")
                //window.location.href="/dashboard";
              }
            }
                else{
                  localStorage.setItem("loggedInUser",false)
              
                      alert(result.data.response.statusMessage);
                }
           })
           .catch((error)=>{
            localStorage.setItem("loggedUser",false)
              
            console.log(error)
           })


         //alert(`Email is ${email} , Password is ${password}`);
    };
   

    return(
        <>
   
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='8' md='6'>
           {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />  */}
         <img src="../images/french.jpg" class="img-fluid" alt="Sample image" style={{ width: "100%",height:"550px" }}/> 

        </MDBCol>

        <MDBCol col='6' md='6'>

        <div className ='container' style={{ width: "70%", margin: "0 auto" }} >
        
        <div className ='row'>
        <label className = 'label'>Email</label>
        <input type = "text" className = 'form-control' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}
        value={email}/>
        </div>

        <div className ='row'>
        <label className = 'label'>Password</label>
        <input type = "password" className = 'form-control' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}
        value={password}/>
        </div>
        <div className="remember-forgot">
            <label><input type="checkbox"/>Remember me</label>
            
             <a href="#">Forgot password?</a>
           </div>
           
            <div className ='row'>
            <button className = 'btn btn-primary'onClick={(e)=>handleLogin(e)} >
            {""}
            Login{""}
            </button>&nbsp;
           
        
           <Link to="/registration" button className = 'btn btn-danger' value = "Registration">Registration</Link>
           </div>
           
           
        </div>

        </MDBCol>

      </MDBRow>

      

    </MDBContainer>
        </>
    );
};
export default Login; 