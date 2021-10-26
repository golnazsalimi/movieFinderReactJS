import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [displayErr, setDisplayErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setEmailErr("please enter your email");
      return;
    }
    if (!password) {
      setPassErr("Please enter your password");
      return;
    }

    const users = await axios.get("http://localhost:5000/users");
    const user = users.data.find((us) => us.email === username);
    if (user) {
      const checkPass = user.password === password;
      if (!checkPass) {
        setPassErr("Email or Password is wrong!!!");
      } else {
        localStorage.setItem("user", JSON.stringify(user.id));
        window.location.href = "/";
      }
    } else {
      setDisplayErr("There is no such user, please signup.");
    }
  };

  return (
    <form className="loginbox" onSubmit={onSubmit}>
      <div>
        <h4>Log in into your MovieFinder account!</h4>
      </div>
      <div className="loginForm">
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className={`${emailErr && "err"}`}>{emailErr}</div>
        <input
          type="password"
          name="password"
          className="textinput textInput form-control user-error"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={`${passErr && "err"}`}>{passErr}</div>
        <input
          type="submit"
          name="submit"
          value="Log In"
          className="btn btn-primary "
        />
        <div className={`${displayErr && "err"}`}>{displayErr}</div>
        {/* <span>
          or
          <a href="#" className="forgot-password-link">
            Forgot Password
          </a>
        </span> */}
        <div>
          Don't have an account?
          <Link className="sign-link" to="/signUp">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
