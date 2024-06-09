import React, { useState } from 'react';

interface LoginpageProps {
    homepageClick?: () => void;
    registerClick?: () => void;
    onLoginSuccess?: () => void;
}

function Loginpage({ homepageClick, registerClick, onLoginSuccess }: LoginpageProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // Use form-urlencoded
                },
                body: new URLSearchParams({
                    username: username,
                    password: password
                })
            });

            if (response.ok) {
                if (onLoginSuccess) onLoginSuccess();
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('There was an error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center p-5 border border-gray-300 rounded-lg w-72 mx-auto">
            <h2 className="text-2xl mb-4">Login</h2>
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
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <button onClick={handleLogin} className="px-5 py-2 mb-3 cursor-pointer bg-blue-500 text-white rounded">
                Login
            </button>
            <button onClick={homepageClick} className="px-5 py-2 cursor-pointer bg-gray-500 text-white rounded">
                Homepage
            </button>
            <p className="mt-2">
                Don't have an account?{" "}
                <span
                    className="text-blue-500 cursor-pointer underline"
                    onClick={registerClick}
                >
            Register here
        </span>
            </p>
        </div>)
}

export default Loginpage;
