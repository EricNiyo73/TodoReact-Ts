import React, { useState } from "react";
import { Bars } from "react-loader-spinner";

import { Link, useNavigate } from "react-router-dom";
import "../css/pagesstyle.css";
import { Notify } from "notiflix";
interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useState<User[]>([]);
  const [create, setCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username || !password || !email) return;
    setLoading(true);

    const response = await fetch(
      "https://todo-app-api-fkhb.onrender.com/api/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email: email,
          password: password,
        }),
      }
    );
    if (response.status === 201) {
      Notify.success("You are Registered");

      navigate("/login");
    } else if (response.status === 409) {
      Notify.failure("Email has been taken");
      setLoading(false);
    } else {
      Notify.failure("Something went wrong please try again");
      setError("Network Error");
      setLoading(false);
    }

    setPassword("");
    setEmail("");
    setUsername("");
    setCreate(false);
  };

  return (
    <>
      <div className="loginContainer">
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit">
              {loading ? (
                <span>
                  <Bars
                    height="20"
                    width="20"
                    color="black"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </span>
              ) : (
                <span>SIGNUP</span>
              )}
            </button>
            <div className="othernavigate">
              <h5>Already registered</h5>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
