import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const [email, set] = useState("youremail@here.com");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "current_user",
            JSON.stringify({
              id: user.id,
            })
          );

          navigate("/main");
        } else {
          window.alert("Did you just guess, or?");
        }
      });
  };

  return (
    <main className="container--login">
      <h1 className="main--name">Dead or Alive</h1>
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h2>Login</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              value={email}
              onChange={(evt) => set(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <button type="submit">Sign in</button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
