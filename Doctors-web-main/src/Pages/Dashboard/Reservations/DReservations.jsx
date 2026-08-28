import { useEffect, useState } from "react";

// Mock data (Reservations for Patients with Doctors)
const mockReservations = [
    {
        _id: "1",
        reservation_id: 501,
        patient_name: "Ahmed Mohamed",
        doctor_name: "Dr. Sarah Johnson",
        specialization: "Cardiology",
        date: "2025-01-15",
        time: "10:00 AM - 12:00 PM",
    },
    {
        _id: "2",
        reservation_id: 502,
        patient_name: "Mona Ali",
        doctor_name: "Dr. Michael Chen",
        specialization: "Neurology",
        date: "2025-01-16",
        time: "1:00 PM - 3:00 PM",
    },
    {
        _id: "3",
        reservation_id: 503,
        patient_name: "Omar Hassan",
        doctor_name: "Dr. Emily Rodriguez",
        specialization: "Pediatrics",
        date: "2025-01-17",
        time: "9:00 AM - 11:00 AM",
    }
];

const ReservationsDashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                setError(null);

                await new Promise(resolve => setTimeout(resolve, 1000));

                setReservations(mockReservations);
            } catch (err) {
                console.error(err);
                setError("Failed to load reservations. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this reservation?"
        );

        if (!confirmed) return;

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            setReservations(prev =>
                prev.filter(res => res._id !== id)
            );
        } catch (err) {
            console.error(err);
            setError("Failed to delete reservation. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading reservations...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-red-500 text-lg mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white">Patients Reservations</h2>
                        <p className="text-green-100 text-sm mt-1">
                            Manage and view all patient reservations
                        </p>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-100 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                        <div>ID</div>
                        <div>Patient</div>
                        <div>Doctor</div>
                        <div>Date & Time</div>
                        <div className="text-center">Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200">
                        {reservations.length === 0 ? (
                            <div className="px-6 py-12 text-center text-gray-500">
                                <p className="text-lg font-medium">No reservations found</p>
                                <p className="text-sm mt-1">Add new reservations to see them here</p>
                            </div>
                        ) : (
                            reservations.map((res) => (
                                <div
                                    key={res._id}
                                    className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                                >
                                    <div className="text-gray-900 font-medium">#{res.reservation_id}</div>

                                    <div className="text-gray-700">{res.patient_name}</div>

                                    <div className="text-gray-700">
                                        <span className="inline-flex flex-col">
                                            <span className="font-medium">{res.doctor_name}</span>
                                            <span className="text-sm text-gray-500">{res.specialization}</span>
                                        </span>
                                    </div>

                                    <div className="text-gray-600">
                                        <div>{res.date}</div>
                                        <div className="text-sm text-gray-500">{res.time}</div>
                                    </div>

                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => handleDelete(res._id)}
                                            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-red-600 hover:bg-red-50 transition group"
                                            title="Delete reservation"
                                        >
                                            <svg
                                                className="w-5 h-5 group-hover:scale-110 transition-transform"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {reservations.length > 0 && (
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        Showing {reservations.length} reservations
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReservationsDashboard;
