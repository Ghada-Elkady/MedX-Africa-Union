import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { MOCK_PHARMACIES } from "../../../services/apiService";


export default function PharmaciesDashboard() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/pharmacies/", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
  );
        setPharmacies(response.data);
      } catch (err) {
        console.warn("Backend admin API unavailable, showing demo data:", err.message);
        setDemoMode(true);
        setPharmacies(MOCK_PHARMACIES.map((p, index) => ({
          id: p.id || index + 1,
          pharmacy_name: p.name,
          pharmacy_profile: { address: p.city, phone_number: p.phone }
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
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
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Pharmacies Management</h2>
              <p className="text-green-100 text-sm mt-1">Manage and view all registered pharmacies</p>
            </div>
            <Link
              to="/dashboard/add-pharmacy"
              className="inline-flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Pharmacy
            </Link>
          </div>

          {demoMode && (
            <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 text-amber-800 text-sm">
              <span className="font-semibold">Demo mode:</span> backend not reachable — showing sample data.
            </div>
          )}

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