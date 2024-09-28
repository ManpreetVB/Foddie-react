import React from "react";
import Header from "./Header";
const Dashboard = () =>{
    return(
        <>
        <Header />
         <div>Welcome {localStorage.getItem("logedInUserEmail")}
         <img src="../images/about-img.png" class="img-fluid" alt="Sample image" style={{ width: "100%",height:"600px" }}  />
        </div>
        </>
    );
};
export default Dashboard;