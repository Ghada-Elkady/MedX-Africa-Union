import { useEffect, useState } from "react";

// Mock data for demonstration
const mockLaboratories = [
    {
        _id: "1",
        id: 301,
        name: "Alpha Medical Lab",
        address: "Cairo, Nasr City"
    },
    {
        _id: "2",
        id: 302,
        name: "BioCheck Laboratory",
        address: "Alexandria, Sidi Gaber"
    },
    {
        _id: "3",
        id: 303,
        name: "Health Scan Lab",
        address: "Giza, Mohandessin"
    },
    {
        _id: "4",
        id: 304,
        name: "Smart Lab Center",
        address: "Mansoura, Downtown"
    }
];

const LaboratoriesDashboard = () => {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                setLoading(true);
                setError(null);

                await new Promise((resolve) => setTimeout(resolve, 1000));

                setLabs(mockLaboratories);
            } catch (err) {
                console.error(err);
                setError("Failed to load laboratories. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchLabs();
    }, []);

    const handleDelete = async (_id) => {
        const confirmed = window.confirm("Are you sure you want to delete this laboratory?");
        if (!confirmed) return;

        try {
            await new Promise((resolve) => setTimeout(resolve, 500));

            setLabs((prev) => prev.filter((lab) => lab._id !== _id));
        } catch (err) {
            console.error(err);
            setError("Failed to delete laboratory. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading laboratories...</p>
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
                        <div className="text-red-500 text-lg mb-4">{error}</div>
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
                    <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white">Laboratories Management</h2>
                        <p className="text-green-100 text-sm mt-1">Manage and view all registered laboratories</p>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-100 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                        <div>ID</div>
                        <div>Name & Address</div>
                        <div className="text-center">Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-200">
                        {labs.length === 0 ? (
                            <div className="px-6 py-12 text-center text-gray-500">
                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3z" />
                                </svg>
                                <p className="text-lg font-medium">No laboratories found</p>
                                <p className="text-sm mt-1">Add laboratories to see them appear here</p>
                            </div>
                        ) : (
                            labs.map((lab) => (
                                <div
                                    key={lab._id}
                                    className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                                >
                                    <div className="text-gray-900 font-medium">#{lab.id}</div>

                                    <div className="text-gray-700">
                                        {lab.name}
                                        <p className="text-sm text-gray-500">{lab.address}</p>
                                    </div>

                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => handleDelete(lab._id)}
                                            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-red-600 hover:bg-red-50 transition-colors group"
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

                {/* Footer */}
                {labs.length > 0 && (
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        Showing {labs.length} {labs.length === 1 ? "laboratory" : "laboratories"}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LaboratoriesDashboard;
