import { useState } from "react";
import { register } from "../api/authApi";

export default function RegisterPage() {

  const [form, setForm] =
    useState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    });

  const submit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    await register(form);

    alert("Registration successful");
  };

  return (

    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={submit}
        className="bg-white p-8 rounded shadow w-96"
      >

        <h2 className="text-2xl font-bold mb-5">
          Register
        </h2>

        {Object.keys(form).map(key => (

          <input
            key={key}
            placeholder={key}
            className="border p-3 w-full mb-3"
            value={
              form[
                key as keyof typeof form
              ]
            }
            onChange={(e) =>
              setForm({
                ...form,
                [key]: e.target.value
              })
            }
          />

        ))}

        <button
          className="bg-green-600 text-white p-3 w-full rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
}