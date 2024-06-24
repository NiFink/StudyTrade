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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const backToLogin = () => {
    if (clickBackToLogin) clickBackToLogin();
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

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
        backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundLogin.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center p-8 bg-white bg-opacity-60 rounded-lg shadow-lg max-w-4xl w-6/12 h-104">
        <div className="flex mb-8">
          <img src="/hdm-logo-cut.png" alt="HdM Logo" className="w-80 h-auto mr-4" />
          <img src="logo192.png" alt="Website Logo" className="w-64 h-auto mr-4" />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-4 w-full border border-gray-300 rounded-lg focus:border-red-500 focus:border-4 transition duration-500 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 w-full border border-gray-300 rounded-lg focus:border-red-500 focus:border-4 transition duration-500 outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 mb-4 w-full border border-gray-300 rounded-lg focus:border-red-500 focus:border-4 transition duration-500 outline-none"
        />
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <button
          onClick={handleRegister}
          className="px-5 py-2 mb-3 cursor-pointer bg-red-600 text-white rounded"
        >
          Register
        </button>
        <p>
          Already have an account?{" "}
          <span
            className="text-red-600 cursor-pointer underline"
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