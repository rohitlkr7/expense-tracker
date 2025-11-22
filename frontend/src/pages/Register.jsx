import { useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axiosInstance.post("/auth/register", { name, email, password });
      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center  p-4">

      <div className="bg-white w-full  max-w-md p-8 rounded-xl shadow-xl text-center animate-fadeIn">
        <h2 className="text-3xl font-bold text-cyan-700 mb-6">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full p-3 bg-cyan-600 text-white rounded-lg text-lg font-semibold hover:bg-cyan-700 transition"
        >
          Register
        </button>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-cyan-600 font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>

      {/* Fade Animation */}
      <style>
        {`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}
      </style>
    </div>
  );
};

export default Register;
