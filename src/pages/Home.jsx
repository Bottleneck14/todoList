import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userdata, setUserdata] = useState([]);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const navigasi = useNavigate();

  // USER GET
  async function getUser() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const resp = await axios.get("http://127.0.0.1:8000/api/user");
      setUserdata(resp.data);
    } catch (err) {
      console.error(err);
    }
  }

  //USER LOGOUT
  async function handleLogout() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await axios.post("http://127.0.0.1:8000/api/keluar");
      localStorage.removeItem("token");
      navigasi("/login");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!token) {
      navigasi("/login");
    }

    getUser();
    getData();
  }, []);

  // USER DATA GET
  async function getData() {
    try {
      const resp = await axios.get("http://127.0.0.1:8000/api/todo");
      setData(resp.data);
    } catch (err) {
      console.error(err);
    }
  }

  const dataFalse = data.filter((e) => e.status === "false");
  const dataTrue = data.filter((e) => e.status === "true");
  const dataMapFalse = dataFalse
    .slice()
    .reverse()
    .map((e) => (
      <div className="list" key={e.id}>
        <span style={{ display: "flex", gap: "10px" }}>
          <input
            className="cekkk"
            type="checkbox"
            checked={e.status === "true" ? true : false}
            onChange={() => handleCek(e.id)}
          />
          <p
            style={{
              textDecoration: `${e.status === "true" ? "line-through" : ""}`,
            }}
          >
            {e.daftar}
          </p>
        </span>

        <button className="delete" onClick={() => handleDelete(e.id)}>
          X
        </button>
      </div>
    ));

  const dataMapTrue = dataTrue
    .slice()
    .reverse()
    .map((e) => (
      <div className="list" key={e.id}>
        <span style={{ display: "flex", gap: "10px" }}>
          <input
            className="cekkk"
            type="checkbox"
            checked={e.status === "true" ? true : false}
            onChange={() => handleCek(e.id)}
          />
          <p
            style={{
              textDecoration: `${e.status === "true" ? "line-through" : ""}`,
            }}
          >
            {e.daftar}
          </p>
        </span>

        <button className="delete" onClick={() => handleDelete(e.id)}>
          X
        </button>
      </div>
    ));

  // FUNGSI CEK
  async function handleCek(id) {
    try {
      const tugas = data.find((e) => e.id === id);
      const ceking = tugas.status === "true" ? "false" : "true";
      await axios.put(`http://127.0.0.1:8000/api/todo/${id}`, {
        status: ceking,
      });
      const resp = await axios.get("http://127.0.0.1:8000/api/todo");
      setData(resp.data);
    } catch (err) {
      console.error(err);
    }
  }

  // FUNGSI HAPUS
  async function handleDelete(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}`);
      const resp = await axios.get("http://127.0.0.1:8000/api/todo");
      setData(resp.data);
    } catch (err) {
      console.error(err);
    }
  }

  // TAMBAH DATA
  const tugas = useRef();

  async function handleTambah(e) {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/api/todo`, {
        daftar: tugas.current.value,
      });
      const resp = await axios.get("http://127.0.0.1:8000/api/todo");
      setData(resp.data);
      tugas.current.value = "";
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="home">
        <div className="home-in">
          <div className="home-up">
            <div className="up-input">
              <form onSubmit={handleTambah}>
                <input ref={tugas} type="text" placeholder="Tambah Tugas..." />
                <br />
                <button className="tambah">Tambah Tugas</button>
              </form>
            </div>
            <div className="up-user">
              <h2>Welcome Home🏠</h2>
              <h3>{userdata.name}</h3>
              <p>{userdata.email}</p>
              <button className="logout" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
          <div className="home-bot">
            <div className="bot-do">
              <h3 style={{ color: "#4f4f4f" }}>Todo</h3>
              <div className="list-home">{dataMapFalse}</div>
            </div>
            <div className="bot-done">
              <h3 style={{ color: "#4f4f4f" }}>Done</h3>
              <div className="list-home">{dataMapTrue}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
