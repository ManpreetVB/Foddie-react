import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Header = () => {
    const navigate = useNavigate();
    const handelLogout = (e) => {
      localStorage.removeItem("loggedInUser");
      window.location.href="/"
    navigate("/");
    };
  return (
    <>
     <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <a class="navbar-brand" href="#">
        FoodieDB (UserPanel)
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#" style={{ color: "white" }}>
            YummyFood
          </a>
        </div>
        
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav" style={{ color: "white" }}>
              <li class="nav-item active">
                <Link
                  to="/dashboard"
                  class="nav-link"
                  href="#"
                  style={{ color: "white" }}
                >
                  Dashboard <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to="/"
                  class="nav-link"
                  href="#"
                  style={{ color: "white" }}
                >
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to="/registration"
                  class="nav-link"
                  href="#"
                  style={{ color: "white" }}
                >
                  Registration
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  to="/profile"
                  class="nav-link"
                  href="#"
                  style={{ color: "white" }}
                >
                  My Profile
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  to="/orders"
                  class="nav-link"
                  href="#"
                  style={{ color: "white" }}
                >
                  My Orders
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  to="/cart"
                  class="nav-link"
                  href="#"
                  style={{ color: "white" }}
                >
                  Add To Cart
                </Link>
                </li>

                <li class="nav-item">
                <Link
                  to="/productdisplay"
                  class="nav-link"
                  href="#"
                  style={{ color: "white" }}
                >
                  ProductDisplay
                </Link>
                </li>
               

              <li class="nav-item">
                <Link
                  class="nav-link"
                  href="#"
                  style={{ color: "white" }}
                  onClick={(e) => handelLogout(e)}
                >
                  Logout
                </Link>
              </li>
            </ul>
     
    </div>
        

{/* <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    
</nav>
    </>
  );
};

export default Header;
