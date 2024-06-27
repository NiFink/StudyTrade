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
      className="h-screen flex items-center justify-center bg-light-red"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/logo512.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center p-8 border border-white-500 bg-white rounded-lg shadow-lg" style={{ maxWidth: "60rem", width: "90%", height: "38rem", backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
      <img src="/hdm-logo.png" alt="HdM Logo" className="mb-8 w-64 h-auto " />
        
        {/* required input fields */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%", border: "1px solid #ccc", borderRadius: "0.7rem", outline: "none", transition: "border-color 0.5s ease" }}
          onFocus={(e) => { e.target.style.borderColor = "#f00"; e.target.style.borderWidth = "4px"; }}
          onBlur={(e) => { e.target.style.borderColor = "#ccc"; e.target.style.borderWidth = "1px"; }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%", border: "1px solid #ccc", borderRadius: "0.7rem", outline: "none", transition: "border-color 0.5s ease" }}
          onFocus={(e) => { e.target.style.borderColor = "#f00"; e.target.style.borderWidth = "4px"; }}
          onBlur={(e) => { e.target.style.borderColor = "#ccc"; e.target.style.borderWidth = "1px"; }}
        />
        {error && <p className="text-red-500 mb-3">{error}</p>}
        
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
        <p className="mt-4 mb-2">
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
