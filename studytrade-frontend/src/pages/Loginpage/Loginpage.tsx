import React, { useState } from 'react';

interface LoginpageProps {
    homepageClick?: () => void;
}

function Loginpage({ homepageClick }: LoginpageProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Simuliere Anmelde-Logik
        if (username === 'example' && password === 'password') {
            console.log('Anmeldung erfolgreich');
            setError('');
        } else {
            setError('Ungültiger Benutzername oder Passwort');
        }
    };

    return (
        <div className="flex flex-col items-center p-5 border border-gray-300 rounded-lg w-72 mx-auto">
            <h2 className="text-2xl mb-4">Anmelden</h2>
            <input
                type="text"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 mb-3 w-full box-border"
            />
            <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 mb-3 w-full box-border"
            />
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <button onClick={handleLogin} className="px-5 py-2 mb-3 cursor-pointer bg-blue-500 text-white rounded">
                Anmelden
            </button>
            <button onClick={homepageClick} className="px-5 py-2 cursor-pointer bg-gray-500 text-white rounded">
                Startseite
            </button>
        </div>
    );
}

export default Loginpage;