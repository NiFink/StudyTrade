import React, { useState } from "react";

interface RegisterpageProps {
    onRegistrationSuccess?: () => void;
    clickBackToLogin?: () => void;
}

function RegisterPage ({onRegistrationSuccess, clickBackToLogin}: RegisterpageProps) {

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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password, email })
            });

            if (response.ok) {
                if(onRegistrationSuccess) onRegistrationSuccess();
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
        <div className="flex flex-col items-center p-5 border border-gray-300 rounded-lg w-72 mx-auto">
            <h2 className="text-2xl mb-4">Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 mb-3 w-full box-border"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 mb-3 w-full box-border"
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
    );
}

export default RegisterPage;
