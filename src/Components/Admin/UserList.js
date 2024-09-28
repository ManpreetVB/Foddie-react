import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    password: "",
    address: "",
    postCode: "",
    phoneNumber: "",
    isActive: "",
    type: "",
  });

  const handleClose = () => setShow(false);

  // Fetch the user list
  useEffect(() => {
    axios
      .get("http://localhost:5013/api/Admin/UserList")
      .then((result) => setUserData(result.data.response.listUsers))
      .catch((error) => console.log(error));
  }, []);

  // Open the modal and populate form with selected user data
  const handleItemDetail = (user) => {
    setSelectedUser(user);
    setFormValues({
      userName: user.userName,
      email: user.email,
      password: user.password,
      address: user.address,
      postCode: user.postCode,
      phoneNumber: user.phoneNumber,
      isActive: user.isActive,
      type: user.type,
    });
    setShow(true);
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit the updated user details to the backend
  const handleUpdateUser = () => {
    if (!selectedUser) return;

    axios
      .put("http://localhost:5013/api/User/UpdateUserProfile", formValues)
      .then((response) => {
        alert("User updated successfully!");
        // Optionally: refresh the user list
        axios.get("http://localhost:5013/api/Admin/UserList").then((result) => setUserData(result.data.response.listUsers));
        setShow(false);
      })
      .catch((error) => {
        console.log("Error updating user:", error.response ? error.response.data : error.message);
        alert("Error updating user: " + (error.response ? error.response.data : error.message));
      });
  };
  const handleDeleteUser = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
  
    axios
      .delete(`http://localhost:5013/api/User/DeleteUser?userId=${userId}`)
      .then((response) => {
        // Access the message from the response structure
        if (response.data && response.data.Response && response.data.Response.StatusMessage) {
          alert(response.data.Response.StatusMessage);
        } else {
          alert("User deleted successfully, but no detailed message received.");
        }
        // Remove the user from the UI after successful deletion
        setUserData(userData.filter(user => user.userId !== userId));
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
        alert("Error deleting user");
      });
  };
  

  return (
    <>
      <AdminHeader />

      <table className="table table-hover">
        <thead>
          <tr>
            <th>UserId</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
            <th>PostCode</th>
            <th>PhoneNumber</th>
            
            <th>IsActive</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData && userData.length > 0 ? (
            userData.map((user, index) => (
              <tr key={index}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.address}</td>
                <td>{user.postCode}</td>
                <td>{user.phoneNumber}</td>
               
                <td>{user.isActive}</td>
                <td>{user.type}</td>
                <td>
                  <Button variant="primary" onClick={() => handleItemDetail(user)}>
                    Update
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteUser(user.userId)} style={{ marginLeft: "10px" }}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No Data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Update Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

          <Form.Group controlId="formUserId">
              <Form.Label>UserId</Form.Label>
              <Form.Control
                type="id"
                name="userId"
                value={formValues.userId}
                onChange={handleInputChange}
              />
</Form.Group>
            <Form.Group controlId="formUserName">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={formValues.userName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPostCode">
              <Form.Label>PostCode</Form.Label>
              <Form.Control
                type="text"
                name="postCode"
                value={formValues.postCode}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>PhoneNumber</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formIsActive">
              <Form.Label>Is Active</Form.Label>
              <Form.Control
                type="text"
                name="isActive"
                value={formValues.isActive}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formValues.type}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
