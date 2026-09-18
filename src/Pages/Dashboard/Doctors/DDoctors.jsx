import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { MOCK_DOCTORS } from "../../../services/apiService";

const DoctorsDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
const cookie = new Cookies();
  const token = cookie.get("Bearer");

  useEffect(() => {
    // Simulate API call
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://127.0.0.1:8000/api/admin/doctors/", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDoctors(response.data.filter((doctor) => doctor.is_active !== false));
      } catch (err) {
        console.warn("Backend admin API unavailable, showing demo data:", err.message);
        setDemoMode(true);
        setDoctors(MOCK_DOCTORS.map((d) => ({
          id: d.id,
          first_name: d.name,
          last_name: "",
          address: d.address || d.location,
          specialization: d.specialty,
          is_active: true
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmed) return;

    if (demoMode) {
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
      setError(null);
      return;
    }

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/doctors/${id}/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.status === 204) {
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
        setError(null);
      } else {
        setError("Failed to delete doctor. Please try again.");
        }
    } catch (err) {
      console.error(err);
      setError("Failed to delete doctor. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading doctors...</p>
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Doctors Management</h2>
              <p className="text-blue-100 text-sm mt-1">Manage and view all registered doctors</p>
            </div>
            <Link
              to="/dashboard/add-doctor"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Doctor
            </Link>
          </div>

          {demoMode && (
            <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 text-amber-800 text-sm">
              <span className="font-semibold">Demo mode:</span> backend not reachable — showing sample data. Your changes are saved locally only.
            </div>
          )}

          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-100 border-b border-gray-200 font-semibold text-gray-700 text-sm">
            <div>ID</div>
            <div>Name</div>
            <div>Specialization</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {doctors.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-lg font-medium">No doctors found</p>
                <p className="text-sm mt-1">Add doctors to see them appear here</p>
              </div>
            ) : (
                doctors.map((doctor) => (
                  <Fragment key={doctor.id}>
                    {doctor.is_active ? (
                      <div
                        key={doctor.id}
                        className={"grid grid-cols-4 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"}
                      >
                        <div className="text-gray-900 font-medium">
                          #{doctor.id}
                        </div>
                        <div className="text-gray-700">
                          <h3>{doctor.first_name} {doctor.last_name}</h3>
                          <p className="text-sm text-gray-500">{doctor.address}</p>
                        </div>
                        <div className="text-gray-600">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {doctor?.specialization || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleDelete(doctor.id)}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-red-600 hover:bg-red-50 transition-colors group"
                            aria-label="Delete doctor"
                            title="Delete doctor"
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
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
                    ) : (
                      <div
                        key={doctor.id}
                        className={"grid grid-cols-4 gap-4 px-6 py-4 bg-gray-100 items-center"}
                      >
                        <div className="text-gray-900 font-medium">
                          #{doctor.id}
                        </div>
                        <div className="text-gray-700">
                          <h3>{doctor.first_name} {doctor.last_name}</h3>
                          <p className="text-sm text-gray-500">{doctor.address}</p>
                        </div>
                        <div className="text-gray-600">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800">
                            {doctor?.specialization || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-center">
                          <button
                            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 cursor-not-allowed group"
                            aria-label="Delete doctor"
                            title="Delete doctor"
                          >
                            <svg
                              className="w-5 h-5"
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
                    )}
                  </Fragment>
              ))
            )}
          </div>
        </div>

        {/* Footer info */}
        {doctors.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {doctors.length} {doctors.length === 1 ? 'doctor' : 'doctors'}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsDashboard;