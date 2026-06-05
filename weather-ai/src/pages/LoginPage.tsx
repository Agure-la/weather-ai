import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await login({
        email,
        password
      });

      navigate("/dashboard");

    } catch (error) {
       console.error(error);
      alert("Invalid credentials");
    }
  };

  return (

    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96"
      >

        <h2 className="text-2xl font-bold mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-3"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-blue-600 text-white w-full p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}