import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

// Fallback validatePassword if not imported
const validatePassword = (password) => password.length >= 8;

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {updateUser}=useContext(UserContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");
    try {
      const response= await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password
      });

      const {token}=response.data

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome Back</h3>
      <p className="text-sm text-gray-600 mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          type="text"
          placeholder="john@example.com"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {error && <p className="text-sm text-red-500 -mt-3">{error}</p>}

        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition cursor-pointer"
        >
          Log In
        </button>

        <p className="text-sm text-gray-600 text-center mt-3"> 
          Don’t have an account?{" "}
          <span
            className="text-orange-500 hover:underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
