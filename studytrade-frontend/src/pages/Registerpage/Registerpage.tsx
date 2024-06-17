import React, { useState } from "react";

interface RegisterpageProps {
  onRegistrationSuccess?: () => void;
  clickBackToLogin?: () => void;
}

function RegisterPage({
  onRegistrationSuccess,
  clickBackToLogin,
}: RegisterpageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const backToLogin = () => {
    if (clickBackToLogin) clickBackToLogin();
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        if (onRegistrationSuccess) onRegistrationSuccess();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-light-red"
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/logo512.png)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* background shine through */}
    <div className="flex flex-col items-center p-8 border border-white-500 bg-white rounded-lg shadow-lg" style={{ maxWidth: "60rem", width: "90%", height: "38rem", backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
    <img src="/hdm-logo.png" alt="HdM Logo" className="mb-8 w-64 h-auto " />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%", border: "1px solid #ccc", borderRadius: "0.7rem", outline: "none", transition: "border-color 0.5s ease" }}
          onFocus={(e) => { e.target.style.borderColor = "#f00"; e.target.style.borderWidth = "4px"; }}
          onBlur={(e) => { e.target.style.borderColor = "#ccc"; e.target.style.borderWidth = "1px"; }}

        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-3 w-full box-border"
        />
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <button
          onClick={handleRegister}
          className="px-5 py-2 mb-3 cursor-pointer bg-blue-500 text-white rounded"
        >
          Register
        </button>
        <p>
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={backToLogin}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
