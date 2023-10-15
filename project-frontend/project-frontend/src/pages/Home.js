import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function () {
  const [users, setUser] = useState([]);

  //const {id}=useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUser(result.data);
  };

  const deleteUser = async(id) =>{
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  }

  return (
    <div className="container">
      <div className="py-4">
        <table className="table table-hover border shadow">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">E-Mail</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>View</Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
                    <button className="btn btn-danger mx-2" onClick={()=>deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
