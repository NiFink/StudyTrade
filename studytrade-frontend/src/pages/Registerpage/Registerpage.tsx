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

  {/* callback functions */}
  const backToLogin = () => {
    if (clickBackToLogin) clickBackToLogin();
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    {/* check whether the mail is an hdm-mail, then registration succes/error message pops up */}
    const emailRegex = /^[a-zA-Z0-9._%+-]+@hdm-stuttgart.de\.([a-zA-Z]{2,})$/;

    if (!emailRegex.test(email)) {
      setError("Please use an hdm-email ending with @hdm-stuttgart.de");
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

  const passwordMatch = password === confirmPassword;

  {/* background and logo */}
  return (
    <div
      className="h-screen flex items-center justify-center bg-light-red"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundLogin.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center p-8 bg-white bg-opacity-60 rounded-lg shadow-lg max-w-xl w-11/12 md:w-1/2 lg:w-2/5 h-auto">
        <div className="flex mb-8 md:mb-12">
          <img
            src="/hdm-logo-cut.png"
            alt="HdM Logo"
            className="w-64 h-auto mr-4 md:mr-6"
          />
        </div>
        {/* necessary input fields to register */}
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 mb-4 w-11/12 md:w-5/6 lg:w-4/5 border border-gray-300 rounded-lg focus:border-red-500 focus:border-4 transition duration-500 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 mb-4 w-11/12 md:w-5/6 lg:w-4/5 border border-gray-300 rounded-lg focus:border-red-500 focus:border-4 transition duration-500 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 mb-4 w-11/12 md:w-5/6 lg:w-4/5 border border-gray-300 rounded-lg focus:border-red-500 focus:border-4 transition duration-500 outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`p-3 mb-6 w-11/12 md:w-5/6 lg:w-4/5 border rounded-lg outline-none ${
            passwordMatch ? 'border-gray-300' : 'border-red-500'
          } focus:border-red-500 focus:border-4 transition duration-500`}
        />
        {/* error massage if passwords do not match */}
        {!passwordMatch && (
          <p className="text-red-500 mb-3 md:mb-4">Passwords do not match</p>
        )}
        {error && <p className="text-red-500 mb-3 md:mb-4">{error}</p>}
        {/* register button */}
        <button
          onClick={handleRegister}
          className="px-6 py-3 mb-6 cursor-pointer bg-red-600 text-white rounded-lg"
        >
          Register
        </button>
        {/* redirect to login */}
        <p className="text-base md:text-lg">
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
