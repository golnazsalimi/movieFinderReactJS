import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import axios from "axios";

const SignUp = () => {
  const [clientName, setClientName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [fullnameErr, setFullnameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [confirmPassErr, setConfirmPassErr] = useState("");
  // const [hasErr, setHasErr] = useState(false);
  const [displayErr, setDisplayErr] = useState("");
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientName || clientName.length < 3 || clientName.length > 10) {
      setFullnameErr("Client name must be more than 3 and less than 10 words");
      // setHasErr(true);
      return;
    }

    if (!re.test(username.toLowerCase())) {
      setEmailErr("Wrong email type");
      // setHasErr(true);
      return;
    }

    if (!password || password.length < 4) {
      setPassErr("Pasword must be more than 4 characters!");
      // setHasErr(true);
      return;
    }

    if (!confirmPass) {
      setConfirmPassErr("You must confirm your password");
      // setHasErr(true);
      return;
    }

    if (password !== confirmPass) {
      setDisplayErr("Password and it's confirmation are not match");
      // setHasErr(true);
      return;
    }

    // if (hasErr === true) {
    //   console.log("error");
    //   return;
    // }

    const res = await axios.get("http://localhost:5000/users");
    const check = res.data.find((item) => item.email === username);
    if (check) {
      setDisplayErr("This email has already been sighned up");
    } else {
      const user = await axios.post("http://localhost:5000/users", {
        clientName: clientName,
        email: username,
        password: password,
        favorite: [],
      });
      window.location.href = "/Login";
    }
    // setHasErr(false);
  };

  return (
    <form className="loginbox" onSubmit={handleSubmit}>
      <div>
        <h4>Sign Up and Start Finding!</h4>
      </div>
      <div className="signUpForm">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          className={`textinput textInput form-control ${fullnameErr && "err"}`}
          value={clientName}
          onChange={(e) => {
            setClientName(e.target.value);
            setFullnameErr("");
          }}
        />

        <div className={`${fullnameErr && "err"}`}>{fullnameErr}</div>

        <input
          name="email"
          placeholder="Email"
          type="email"
          className={`form-control ${emailErr && "err"}`}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            // setEmailErr(false);
          }}
        />

        <div className={`${emailErr && "err"}`}>{emailErr}</div>

        <input
          name="password"
          type="password"
          className={`form-control user-success ${passErr && "err"}`}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            // setPassErr(false);
          }}
        />

        <div className={`${passErr && "err"}`}>{passErr}</div>

        <input
          name="confirmPass"
          type="password"
          className={`form-control user-success ${confirmPassErr && "err"}`}
          placeholder="confirm password"
          value={confirmPass}
          onChange={(e) => {
            setConfirmPass(e.target.value);
            // setConfirmPassErr(false);
          }}
        />

        <div className={`${confirmPassErr && "err"}`}>{confirmPassErr}</div>

        <div className={`${displayErr && "err"}`}>{displayErr}</div>

        <input
          type="submit"
          name="submit"
          value="Sign Up"
          className="btn btn-primary "
          id="submit-id-submit"
        />
      </div>

      <div className="loginbox-v4__footer">
        Already have an account?
        <Link className="sign-link" to="/logIn" s>
          Log In
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
