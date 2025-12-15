import "./bootstrap";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Reservation } from "./types";
import BookingForm from "./components/BookingForm";

// Componente Dashboard (Admin)
function AdminDashboard() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReservations = () => {
        fetch("/api/reservations")
            .then((res) => res.json())
            .then((data) => {
                setReservations(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleStatusChange = async (id: number, newStatus: string) => {
        await fetch(`/api/reservations/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });
        fetchReservations(); // Recarrega a lista para garantir
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Cancelar reserva?")) return;
        await fetch(`/api/reservations/${id}`, { method: "DELETE" });
        setReservations(reservations.filter((res) => res.id !== id));
    };

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="grid gap-4 mt-6">
            {reservations.map((res) => (
                <div
                    key={res.id}
                    className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500 flex justify-between items-center"
                >
                    <div>
                        <h2 className="font-bold">
                            {res.first_name} {res.last_name}
                        </h2>
                        <p className="text-sm text-gray-600 pt-1 pb-1">
                            📅 {new Date(res.res_date).toLocaleString()} - Table{" "}
                            {res.table?.name}
                        </p>
                        <span className="text-xs font-bold uppercase bg-gray-200 px-2 py-1 rounded">
                            {res.status}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        {res.status === "pending" && (
                            <button
                                onClick={() =>
                                    handleStatusChange(res.id, "confirmed")
                                }
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                            >
                                Confirm
                            </button>
                        )}
                        <button
                            onClick={() => handleDelete(res.id)}
                            className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm"
                        >
                            X
                        </button>
                    </div>
                </div>
            ))}
            {reservations.length === 0 && (
                <p className="text-center text-gray-500">No booking.</p>
            )}
        </div>
    );
}

// The main App
function App() {
    const [view, setView] = useState<"customer" | "admin">("customer"); // Começa como Cliente

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Nav header */}
            <nav className="bg-white shadow p-4 mb-8">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">
                        🍽️ Mise en Place
                    </h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView("customer")}
                            className={`px-4 py-2 rounded ${
                                view === "customer"
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            I am a Customer
                        </button>
                        <button
                            onClick={() => setView("admin")}
                            className={`px-4 py-2 rounded ${
                                view === "admin"
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            I am the manager
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto p-4">
                {view === "customer" ? <BookingForm /> : <AdminDashboard />}
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
