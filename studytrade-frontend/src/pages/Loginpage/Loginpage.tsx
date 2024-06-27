import React, { useState } from "react";

interface LoginpageProps {
  homepageClick?: () => void;
  registerClick?: () => void;
  onLoginSuccess?: () => void;
}

function Loginpage({
  homepageClick,
  registerClick,
  onLoginSuccess,
}: LoginpageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  {/* checks if the login works, otherwise an error message pops up */}
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("There was an error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  {/* background and logo */}
  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-light-red relative z-0">
      <img
        src="./images/backgroundLogin.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
    />
      <div className="flex flex-col items-center p-8 bg-white bg-opacity-60 rounded-lg shadow-lg max-w-xl w-11/12 md:w-1/2 lg:w-2/5 h-auto relative z-10">
        <img
          src="/hdm-logo-cut.png"
          alt="HdM Logo"
          className="w-64 h-auto mb-8 md:mb-12"
        />
        
        {/* required input fields */}
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 mb-4 w-11/12 md:w-5/6 lg:w-4/5 border border-gray-300 rounded-lg focus:border-red-500 focus:border-4 transition duration-500 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 mb-4 w-11/12 md:w-5/6 lg:w-4/5 border border-gray-300 rounded-lg focus:border-red-500 focus:border-4 transition duration-500 outline-none"
        />
        {error && <p className="text-red-500 mb-3 md:mb-4">{error}</p>}
        
        {/* buttons to click */}
        <button
          onClick={handleLogin}
          className="px-5 py-2 mb-3 cursor-pointer bg-red-600 text-white rounded"
        >
          Login
        </button>
        <button
          onClick={homepageClick}
          className="px-5 py-2 cursor-pointer bg-gray-500 text-white rounded"
        >
          Homepage
        </button>
        <p className="mt-4 mb-2 text-center">
          You don't have an account?{" "}
          <span
            className="text-red-500 cursor-pointer underline"
            onClick={registerClick}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Loginpage;
