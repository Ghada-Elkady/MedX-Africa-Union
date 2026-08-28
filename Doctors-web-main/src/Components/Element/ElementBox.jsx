import { Link } from "react-router-dom";;
const ElementBox = (props) => {
    return (
      <div
        key={props.id}
        className="props-card bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-300 group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={props.image}
            alt={props.name}
            className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-500`}
          />
          <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
            <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
            <span className="font-bold text-sm">{props.rating || 0}</span>
            <span className="text-gray-500 text-xs">
              ({props.reviews || 0})
            </span>
          </div>
          {props.emergency && (
            <div className="absolute top-3 left-3 bg-red-500 text-white rounded-full px-3 py-1 text-xs font-bold shadow-lg">
              24/7 Emergency
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-[calc(100%-12rem)] justify-between">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl">{props.icon}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors leading-tight line-clamp-1"">
                {props.name}
              </h3>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <i className="fa-solid fa-location-dot text-blue-600"></i>
            <div>
              <p className="text-sm font-medium">{props.location}</p>
              {/* <p className="text-xs text-gray-500">{props.locationAr}</p> */}
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <i className="fa-solid fa-clock text-blue-600"></i>
            <p className="text-sm font-medium">
              {props.openTime || "8:00 AM"} - {props.closeTime || "10:00 PM"}
            </p>
          </div>

          {/* Specialties */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {props.specialties?.slice(0, 3).map((specialty, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-semibold">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Button */}
          <Link
            to={props.link || "#"}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
            View Details
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    );
}

export default ElementBox;
