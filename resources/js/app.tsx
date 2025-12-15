import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">
                    🍽️ Mise en Place
                </h1>
                <p className="text-gray-600">
                    TypeScript + React configurados com sucesso! 🛡️
                </p>
            </div>
        </div>
    );
}

const rootElement = document.getElementById("app");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
