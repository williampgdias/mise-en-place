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
        // Atualização otimista na UI para ser mais rápido
        setReservations((prev) =>
            prev.map((res) =>
                res.id === id ? { ...res, status: newStatus as any } : res
            )
        );
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to cancel this reservation?"))
            return;

        await fetch(`/api/reservations/${id}`, { method: "DELETE" });
        setReservations((prev) => prev.filter((res) => res.id !== id));
    };

    if (loading)
        return (
            <div className="text-center py-10 text-gray-500">
                Loading Dashboard...
            </div>
        );

    return (
        <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Reservation Management
                </h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Today: {reservations.length}
                </span>
            </div>

            {reservations.map((res) => (
                <div
                    key={res.id}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-blue-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-gray-800">
                                {res.first_name} {res.last_name}
                            </h3>
                            <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
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
                        <p className="text-sm text-gray-600 mt-1">
                            📅 {new Date(res.res_date).toLocaleString()} — 👥{" "}
                            {res.guest_number} Guests
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            🪑 Table: {res.table?.name || "Unassigned"}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        {res.status !== "seated" && (
                            <button
                                onClick={() =>
                                    handleStatusChange(res.id, "seated")
                                }
                                className="px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded hover:bg-purple-700 transition"
                            >
                                SEAT
                            </button>
                        )}

                        {res.status === "pending" && (
                            <button
                                onClick={() =>
                                    handleStatusChange(res.id, "confirmed")
                                }
                                className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition"
                            >
                                CONFIRM
                            </button>
                        )}

                        <button
                            onClick={() => handleDelete(res.id)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded hover:bg-red-100 transition"
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            ))}

            {reservations.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-400">
                        No reservations found for today.
                    </p>
                </div>
            )}
        </div>
    );
}

// O App Principal
function App() {
    const [view, setView] = useState<"customer" | "admin">("customer");

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 px-4 py-3 mb-8 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🍽️</span>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                            Mise en Place
                        </h1>
                    </div>

                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setView("customer")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                                ${
                                    view === "customer"
                                        ? "bg-white text-blue-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Customer View
                        </button>
                        <button
                            onClick={() => setView("admin")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                                ${
                                    view === "admin"
                                        ? "bg-white text-purple-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Manager View
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 pb-12">
                {view === "customer" ? (
                    <div className="animate-fade-in-up">
                        <BookingForm />
                    </div>
                ) : (
                    <div className="animate-fade-in-up">
                        <AdminDashboard />
                    </div>
                )}
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
