import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        {
            to: "/dashboard/doctors",
            label: "Doctors",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            to: "/dashboard/add-doctor",
            label: "Add Doctor",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            )
        },
        {
            to: "/dashboard/pharmacies",
            label: "Pharmacies",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            to: "/dashboard/add-pharmacy",
            label: "Add Pharmacy",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            to: "/dashboard/laboratories",
            label: "Laboratories",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            )
        },
        {
            to: "/dashboard/add-laboratory",
            label: "Add Laboratory",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            to: "/dashboard/radiology",
            label: "Radiologies",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24" height="24" fill="#000000" style={{ opacity: 1 }}>
                    <path d="M50.579 56.62a2.99 2.99 0 1 1-5.98 0v-2.608h5.979zm-7.889 7.103h-8.503l.013-4.196h-2.849l-.004 4.196h-8.519v-9.711H42.69zM20.852 56.62a2.989 2.989 0 1 1-5.979 0v-2.608h5.979zM32.729.704a7.723 7.723 0 0 1 7.722 7.726a7.72 7.72 0 0 1-7.722 7.724a7.725 7.725 0 1 1 0-15.45m21.968 50.297h-43.94V25.322h43.94zm-6.863-23.558H17.787v21.472h30.047z" />
                    <path d="M34.187 40.135v1.885h5.503c.229 0 .565.206.565.562c0 3.21-.402 4.722-2.093 4.722c-1.754 0-2.114-3.797-3.975-4.047v3.634h-2.941V43.25c-1.953.148-2.268 4.054-4.091 4.054c-1.69 0-2.001-1.512-2.001-4.722c0-.356.337-.562.565-.562h5.526v-1.885h-5.721a.593.593 0 1 1 0-1.189h5.721v-1.885h-6.439a.595.595 0 1 1 0-1.191h6.439v-1.883h-6.044a.595.595 0 0 1-.596-.596c0-.326.267-.597.596-.597h6.044v-1.882H26.51a.596.596 0 1 1 0-1.194h4.735v-1.041h2.941v1.041h4.735a.597.597 0 0 1 0 1.194h-4.735v1.881h6.062a.6.6 0 0 1 .597.597a.595.595 0 0 1-.597.596h-6.062v1.883h6.459a.595.595 0 1 1 0 1.191h-6.459v1.885h5.722a.595.595 0 1 1 0 1.189l-5.722.001zm7.542-22.091H23.982c-3.211 0-6.182 1.713-7.853 4.268h33.194a8.9 8.9 0 0 0-7.594-4.268" />
                </svg>
            )
        },
        {
            to: "/dashboard/add-radiology",
            label: "Add Radiology",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            to: "/dashboard/reservations",
            label: "Reservations",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        }
    ];
    const location = useLocation();
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
            >
                {sidebarOpen ? (
                    <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed md:static inset-y-0 left-0 z-40
          w-72 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">A</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                                <p className="text-xs text-gray-500">Dashboard Management</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-1">
                            {menuItems.map((item) => (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        onClick={() => setSidebarOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                                    >
                                        <span className="group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </span>
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="font-medium">Back to Home</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Your main content goes here */}
                <div className="p-4 md:p-8">
                    {location.pathname === "/dashboard" &&
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Dashboard Management</h2>
                            <p className="text-gray-600 text-center">Welcome to the Admin Panel! You can manage your dashboard here.</p>
                            <div className="features py-10">
                                <h2 className="text-2xl font-bold text-gray-800 mb-5">**All Information About Dashboard **</h2>
                                <div className="feature mb-5">
                                    <h3 className="text-lg font-semibold mb-3">- Add New Doctor to Database</h3>
                                    <p className="text-gray-500 ml-10">Adding a new doctor to the database and adding all information about the doctor such as name, specialty, location, profile picture, description, contact information, and other relevant details.</p>
                                </div>
                                <div className="feature mb-5">
                                    <h3 className="text-lg font-semibold mb-3">- View All Doctors and Their Information and can delete them if needed.</h3>
                                    <p className="text-gray-500 ml-10">View a list of all doctors in the database and their information, such as name, specialty, location, contact information, and other relevant details and can delete them if needed.</p>
                                </div>
                                <div className="feature mb-5">
                                    <h3 className="text-lg font-semibold mb-3">- Add New Pharmacy to Database.</h3>
                                    <p className="text-gray-500 ml-10">Adding a new pharmacy to the database and adding all information about the pharmacy such as name, location, logo, description, contact information, and other relevant details.</p>
                                </div>
                                <div className="feature mb-5">
                                    <h3 className="text-lg font-semibold mb-3">- View All Pharmacies and Their Information and can delete them if needed.</h3>
                                    <p className="text-gray-500 ml-10">View a list of all pharmacies in the database and their information, such as name, location, logo, contact information, and other relevant details and can delete them if needed.</p>
                                </div>
                                <div className="feature mb-5">
                                    <h3 className="text-lg font-semibold mb-3">- Add New Laboratory to Database</h3>
                                    <p className="text-gray-500 ml-10">Adding a new laboratory to the database and adding all information about the laboratory such as name, location, logo, description, contact information, and other relevant details.</p>
                                </div>
                                <div className="feature mb-5">
                                    <h3 className="text-lg font-semibold mb-3">- View All Laboratories and Their Information and can delete them if needed.</h3>
                                    <p className="text-gray-500 ml-10">View a list of all laboratories in the database and their information, such as name, location, logo, contact information, and other relevant details and can delete them if needed.</p>
                                </div>
                                <div className="feature mb-5">
                                    <h3 className="text-lg font-semibold mb-3">- Add New Radiology to Database</h3>
                                    <p className="text-gray-500 ml-10">Adding a new Radiology to the database and adding all information about the Radiology such as name, location, logo, description, contact information, and other relevant details.</p>
                                </div>
                                <div className="feature mb-5">
                                    <h3 className="text-lg font-semibold mb-3">- View All Radiology and Their Information and can delete them if needed.</h3>
                                    <p className="text-gray-500 ml-10">View a list of all Radiology in the database and their information, such as name, location, logo, contact information, and other relevant details and can delete them if needed.</p>
                                </div>
                                <div className="feature mb-5">
                                    <h3 className="text-lg font-semibold mb-3">- View All Reservations and Their Information and can delete them if needed.</h3>
                                    <p className="text-gray-500 ml-10">View a list of all reservations in the database and their information, such as name, location, logo, contact information, and other relevant details and can delete them if needed.</p>
                                </div>

                            </div>
                        </div>}
                    <Outlet />
                </div>
            </main>
        </div>
    );
}