import React, { useEffect, useState } from "react";
import ajax from "../Services/fetchService";
import { useUser } from "../UserProvider";
import Table from "react-bootstrap/Table";
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
    navigate(`/users/${userId}`);
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
      <div className="page-title-container">
      <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => {
              user.setJwt(null);
              navigate("/login");
            }}>Logout</Button>
          </div>
        <div className="container mt-5 text-center">
          <h1 className="display-3 font-weight-bold custom-title">
            Tabel de Bord Administrator
          </h1>
          <p className="lead custom-subtitle">
            Vizualizeaza utilizatorii curenti sau creaza noi utilizatori.
          </p>
        </div>
      </div>
      <div className="mb-4 mt-4">
        <Button size="lg" onClick={() => createUser()}>
          Creaza Utilizator Nou
        </Button>
      </div>
      <div className="mt-5">
        <h3 className="font-weight-bold">Tabela Utilizatori</h3>
        {users !== null ? (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="text-center">User ID</th>
                <th className="text-center">Username</th>
                <th className="text-center">Role</th>
                <th className="text-center">Full Name</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="text-center">{user.id}</td>
                  <td className="text-center">{user.username}</td>
                  <td className="text-center">{user.authority}</td>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center">
                    <Button size="lg" onClick={() => editUser(user.id)}>
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
