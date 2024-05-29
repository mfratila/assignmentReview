import React, { useEffect, useState } from "react";
import ajax from "../Services/fetchService";
import { useUser } from "../UserProvider";
import Table from "react-bootstrap/Table";
import NavigationBar from '../Navbar/index.js';
import { Button } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [users, setUsers] = useState(null);

  function createUser() {
    ajax("/api/users", "POST", user.jwt).then((user) => {
      navigate(`/users/${user.id}`);
    });
  }

  function editUser(userId) {
    navigate(`/users/existing/${userId}`);
  }

  useEffect(() => {
    ajax("api/users", "GET", user.jwt).then((usersData) => {
      setUsers(usersData);
    });
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <>
    <NavigationBar />
      <div className="page-title-container">
        <div className="container mt-5 text-center">
          <h1 id="dashboard-title" className="display-3 font-weight-bold custom-title">
            Tabel de Bord Administrator
          </h1>
          <p id="dashboard-desc" className="lead custom-subtitle">
            Vizualizeaza utilizatorii curenti sau creaza noi utilizatori.
          </p>
        </div>
      </div>
      <div className="mb-4 mt-4">
        <Button id="create-user-btn" size="lg" onClick={() => createUser()}>
          Creaza Utilizator Nou
        </Button>
      </div>
      <div className="mt-5">
        <h3 id='table-title' className="font-weight-bold">Tabela Utilizatori</h3>
        {users !== null ? (
          <Table id="users-table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th id="id-table-header" className="text-center">User ID</th>
                <th id="username-table-header" className="text-center">Username</th>
                <th id="role-table-header" className="text-center">Role</th>
                <th id="fullname-table-header" className="text-center">Full Name</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr id={`user-table-entry-${index}`} key={user.id}>
                  <td id="user-id" className="text-center">{user.id}</td>
                  <td id="user-username" className="text-center">{user.username}</td>
                  <td id="user-authority" className="text-center">{user.authority}</td>
                  <td id="user-fullname" className="text-center">{user.name}</td>
                  <td className="text-center">
                    <Button id="edit-user-btn" size="lg" onClick={() => editUser(user.id)}>
                      Editeaza Utilizator
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
