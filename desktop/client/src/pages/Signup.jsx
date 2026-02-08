import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-80">
        <h2 className="text-xl mb-4">Signup</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="mb-3 w-full border p-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="mb-3 w-full border p-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="mb-3 w-full border p-2" />

        <button className="bg-blue-500 text-white w-full p-2">Signup</button>
      </form>
    </div>
  );
}
