import React, { useState } from "react";

import { Link } from "react-router-dom";
import "../css/pagesstyle.css";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <>
      <div className="login-page">
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Signup</button>
          <div className="othernavigate">
            <h5>Already registered</h5>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
