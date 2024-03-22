import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/pagesstyle.css";
import { Notify } from "notiflix";
import { Bars } from "react-loader-spinner";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!password || !email) {
      Notify.failure("All field is required");
    }
    setLoading(true);
    const res = await fetch(
      "https://todo-app-api-fkhb.onrender.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await res.json();

    if (res?.status === 200) {
      setLoading(false);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userLoggedIn", data.username);
      window.location.href = "/";
    } else if (res?.status === 404) {
      Notify.failure("Incorrect email or password");
      setLoading(false);
    } else if (res?.status === 400) {
      Notify.failure("Incorrect email or password");
      setLoading(false);
    } else {
      Notify.failure("Network error");
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="login-page">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
              <span>Login</span>
            )}
          </button>
          <div className="othernavigate">
            <h5> Create Account</h5>
            <Link to="register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
