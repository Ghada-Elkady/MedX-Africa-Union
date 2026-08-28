import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";


export default function PharmaciesDashboard() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/pharmacies/", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
  );
        console.log(response);

        setPharmacies(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load pharmacies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this pharmacy?"
    );
    if (!confirmed) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPharmacies((prev) =>
        prev.filter((pharmacy) => pharmacy._id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete pharmacy. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading pharmacies...</p>
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
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Pharmacies Management</h2>
            <p className="text-green-100 text-sm mt-1">Manage and view all registered pharmacies</p>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-100 border-b border-gray-200 font-semibold text-gray-700 text-sm">
            <div>ID</div>
            <div>Name</div>
            <div className="text-center">Phone</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {pharmacies.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3z" />
                </svg>
                <p className="text-lg font-medium">No pharmacies found</p>
                <p className="text-sm mt-1">Add pharmacies to see them appear here</p>
              </div>
            ) : (
              pharmacies.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                >
                  <div className="text-gray-900 font-medium">
                    #{pharmacy.id}
                  </div>
                  <div className="text-gray-700">
                    {pharmacy?.pharmacy_name}
                    <p className="text-sm text-gray-500">{pharmacy?.pharmacy_profile?.address}</p>
                  </div>
                  <div className="text-gray-700 text-center">
                    {pharmacy?.pharmacy_profile?.phone_number}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        {pharmacies.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {pharmacies.length} {pharmacies.length === 1 ? "pharmacy" : "pharmacies"}
          </div>
        )}
      </div>
    </div>
  );
}
