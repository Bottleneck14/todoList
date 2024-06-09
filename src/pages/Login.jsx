import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const pass = useRef();
  const navigasi = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigasi("/");
  //   }
  // }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const resp = await axios.post("http://127.0.0.1:8000/api/masuk", {
        email: email.current.value,
        password: pass.current.value,
      });
      localStorage.setItem("token", resp.data.token);
      navigasi("/");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <div className="auth">
        <div className="auth-in">
          <h1>Welcome Back👋</h1>
          <form onSubmit={handleLogin}>
            <input ref={email} type="text" placeholder="Email..." />
            <br />
            <input ref={pass} type="password" placeholder="Password..." />
            <br />
            <button className="login">Login</button>
          </form>
          <p>
            Doesn't have an account? <a href="/reg">Register now</a>
          </p>
        </div>
      </div>
    </>
  );
}
