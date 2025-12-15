import "./bootstrap";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Reservation } from "./types";

function App() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/reservations")
            .then((response) => response.json())
            .then((data) => {
                setReservations(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error to fetch the reservations:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center p-10">Loading reservation...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    🍽️ Restaurant Reservations
                </h1>

                <div className="grid gap-4">
                    {reservations.map((res) => (
                        <div
                            key={res.id}
                            className="bg-white p-6 rounded-lg shadow flex justify-between items-center border-l-4 border-blue-500"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {res.first_name} {res.last_name}
                                </h2>
                                <p className="text-gray-600">
                                    📅 {new Date(res.res_date).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Mesa: {res.table?.name} ({res.guest_number}{" "}
                                    pessoas)
                                </p>
                            </div>

                            <div className="text-right">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-bold
                                    ${
                                        res.status === "confirmed"
                                            ? "bg-green-100 text-green-800"
                                            : res.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {res.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    ))}

                    {reservations.length === 0 && (
                        <p className="text-center text-gray-500">
                            No reservation found. 🦗
                        </p>
                    )}
                </div>
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
