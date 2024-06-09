import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const name = useRef();
  const email = useRef();
  const pass = useRef();
  const navigasi = useNavigate();

  async function handleReg(e) {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        name: name.current.value,
        email: email.current.value,
        password: pass.current.value,
      });
      navigasi("/login");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <div className="auth">
        <div className="auth-in">
          <h1>Create Account</h1>
          <form onSubmit={handleReg}>
            <input ref={name} type="text" placeholder="Name..." />
            <br />
            <input ref={email} type="email" placeholder="Email..." />
            <br />
            <input ref={pass} type="password" placeholder="Password..." />
            <br />
            <button className="login">Register</button>
          </form>
          <p>
            Have an account? <a href="/login">Login now</a>
          </p>
        </div>
      </div>
    </>
  );
}
