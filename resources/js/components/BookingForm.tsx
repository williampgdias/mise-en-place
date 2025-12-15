import React, { useState } from "react";

export default function BookingForm() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        tel_number: "",
        res_date: "",
        guest_number: 2,
    });

    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        try {
            const response = await fetch("/api/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken || "",
                },
                body: JSON.stringify(formData),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error(
                    "Session expired. Please refresh the page and try again."
                );
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong.");
            }

            setMessage({
                type: "success",
                text: `Booking Confirmed! You are assigned to table: ${data.table_assigned}`,
            });
            setFormData({
                ...formData,
                first_name: "",
                last_name: "",
                email: "",
                tel_number: "",
            });
        } catch (error: any) {
            console.error(error);
            setMessage({ type: "error", text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-blue-600 py-6 px-8">
                <h2 className="text-3xl font-bold text-white text-center">
                    📅 Book a Table
                </h2>
                <p className="text-blue-100 text-center mt-2">
                    Reserve your spot at Mise en Place
                </p>
            </div>

            <div className="p-8">
                {message && (
                    <div
                        className={`p-4 mb-6 rounded-lg text-sm font-medium ${
                            message.type === "success"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="John"
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 bg-gray-50 transition"
                                value={formData.first_name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        first_name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Doe"
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 bg-gray-50 transition"
                                value={formData.last_name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        last_name: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="john@example.com"
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 bg-gray-50 transition"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                required
                                placeholder="+1 234 567 890"
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 bg-gray-50 transition"
                                value={formData.tel_number}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        tel_number: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                required
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 bg-gray-50 transition"
                                value={formData.res_date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        res_date: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Guests
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                required
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 bg-gray-50 transition"
                                value={formData.guest_number}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        guest_number: parseInt(e.target.value),
                                    })
                                }
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 px-4 rounded-lg shadow-lg text-sm font-bold text-white tracking-wide uppercase transition duration-200 transform hover:-translate-y-0.5
                            ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            }`}
                    >
                        {loading
                            ? "Checking Availability..."
                            : "Confirm Reservation"}
                    </button>
                </form>
            </div>
        </div>
    );
}
