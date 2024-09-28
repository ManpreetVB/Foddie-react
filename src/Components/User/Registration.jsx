import React,{useState} from "react";
import axios from "axios";
import Header from "./Header";
import {Link} from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox}from 'mdb-react-ui-kit';
  const Register =()=>{
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [address,setAddress]=useState("");
    const [postCode,setPostCode]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    
    const [type,setType]=useState("");


    const handleRegistrationUser =(e)=>{
      const apiUrl='http://localhost:5013/api/User/Registration';
      const requestBody={

        "userName": userName,
    "email": email,
    "password": password,
    "address": address,
    "postCode": postCode,
    "phoneNumber": phoneNumber,
    
    "type": type
      };

      axios.post(apiUrl,requestBody)
      .then((result)=>{
        if(result.data.response.statusCode===200)
        {
          alert(result.data.response.statusMessage);
        }
        else{
          alert(result.data.response.statusMessage);
        }
      })
      .catch((error) => {
        console.log(error)
      })
        
      
    };
    return (
    <>
   
    
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            
    
    <div className="container" style={{ width: "50%", margin: "0 auto" }}>


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

      
     

        
      <br></br>
       
      <div className="row">
        <button className="btn btn-primary "onClick={(e) => handleRegistrationUser (e)}>
          {" "}
         Register Me{" "}
        </button>
        &nbsp;
        <Link to = "/" button className="btn btn-danger">Login</Link>
      </div>
    </div>

 

  
<MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
  {/* <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/> */}
  <img src="../images/rburger.webp" class="img-fluid" alt="Sample image" style={{ width: "100%",height:"700px" }}/> 

</MDBCol>

</MDBRow>
</MDBCardBody>
</MDBCard>

</MDBContainer>
    </>
  )
};
export default Register;