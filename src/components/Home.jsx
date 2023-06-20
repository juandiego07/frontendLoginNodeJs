import axios from "axios";
import showMessage from "../showMessage";
import { BASE_URL } from "../config";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { user } = useUserContext();

  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      axios
        .post(BASE_URL + "/getallusers", "", {
          headers: { authorization: "Bearer " + user },
        })
        .then(({ data }) => {
          if (data.status) {
            setUsers(data.data);
          } else {
            showMessage(data.status, data.message);
            navigate("/login");
          }
        })
        .catch((error) => {
          showMessage(false, error);
          navigate("/login");
        });
    }
  }, [user, navigate]);

  return users ? (
    <section>
      <table className="table">
        <thead>
          <tr>
            <th>
              <h1>Id</h1>
            </th>
            <th>
              <h1>Name</h1>
            </th>
            <th>
              <h1>Last Name</h1>
            </th>
            <th>
              <h1>Email</h1>
            </th>
            <th>
              <h1>Role</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.roleId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  ) : (
    <section>
      <h1>Welcome User</h1>
    </section>
  );
};
