import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "current_user",
            JSON.stringify({
              id: createdUser.id,
            })
          );

          navigate("/");
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          // Duplicate email. No good.
          window.alert("Account with that email address already exists");
        } else {
          // Good email, create user.
          registerNewUser();
        }
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Register Text</h1>
        <fieldset>
          <label htmlFor="userName"> User Name: </label>
          <input
            onChange={updateUser}
            type="text"
            id="userName"
            className="form-control"
            placeholder="Preferred username goes here..."
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email: </label>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password"> Password: </label>
          <input
            onChange={updateUser}
            type="text"
            id="password"
            className="form-control"
            placeholder="**********"
            required
          />
        </fieldset>
        <fieldset></fieldset>
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
  );
};
