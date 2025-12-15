import "./bootstrap";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Reservation } from "./types";

function App() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/reservations")
            .then((res) => res.json())
            .then((data) => {
                setReservations(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error to fetch the reservations:", error);
                setLoading(false);
            });
    }, []);

    const handleStatusChange = async (id: number, newStatus: string) => {
        await fetch(`/api/reservations/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        setReservations(
            reservations.map((res) =>
                res.id === id ? { ...res, status: newStatus as any } : res
            )
        );
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure that you want to delete this reservation?"))
            return;

        await fetch(`/api/reservations/${id}`, { method: "DELETE" });

        setReservations(reservations.filter((res) => res.id !== id));
    };

    if (loading) {
        return <div className="text-center p-10">Loading reservation...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    🍽️ Restaurant Reservations
                    <span className="text-sm font-normal text-gray-500 bg-white px-3 py-1 rounded-full border">
                        {reservations.length} today
                    </span>
                </h1>

                <div className="grid gap-4">
                    {reservations.map((res) => (
                        <div
                            key={res.id}
                            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-blue-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {res.first_name} {res.last_name}
                                    </h2>

                                    <span
                                        className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide
                                        ${
                                            res.status === "seated"
                                                ? "bg-purple-100 text-purple-700"
                                                : res.status === "confirmed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {res.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 mt-1">
                                    📅 {new Date(res.res_date).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    🪑 {res.table?.name} ({res.guest_number}{" "}
                                    people)
                                </p>
                            </div>

                            <div className="flex gap-2">
                                {res.status !== "seated" && (
                                    <button
                                        onClick={() =>
                                            handleStatusChange(res.id, "seated")
                                        }
                                        className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition"
                                    >
                                        Seat
                                    </button>
                                )}

                                {res.status === "pending" && (
                                    <button
                                        onClick={() =>
                                            handleStatusChange(
                                                res.id,
                                                "confirmed"
                                            )
                                        }
                                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                                    >
                                        Confirm
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDelete(res.id)}
                                    className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))}

                    {reservations.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No reservation yet! The restaurant is Empty! 🦗
                        </div>
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
