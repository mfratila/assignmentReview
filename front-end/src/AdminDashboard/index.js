import React, { useEffect, useState } from 'react'
import ajax from '../Services/fetchService'
import { useUser } from '../UserProvider';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'; 
import './style.css';

const AdminDashboard = () => {

  const user = useUser();
  const [users, setUsers] = useState(null);

  function createUser() {
    console.log("Creez utilizator nou");
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
        <div className="container mt-5 text-center">
          <h1 className="display-3 font-weight-bold custom-title">Tabel de Bord Administrator</h1>
          <p className="lead custom-subtitle">Vizualizeaza utilizatorii curenti sau creaza noi utilizatori.</p>
        </div>
      </div>
      <div className="mb-4 mt-4">
        <Button size="lg" onClick={() => createUser()}>
          Creaza Utilizator Nou
        </Button>
      </div>
      <div className='mt-5'>
        <h3 className='font-weight-bold'>Tabela Utilizatori</h3>
      {users !== null ? (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Full Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.authorities[0]}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (<div>Loading...</div>)}
      </div>
    </>

  )
}

export default AdminDashboard