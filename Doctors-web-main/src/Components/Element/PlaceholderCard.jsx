const PlaceholderCard = () => {
    return (
        <div className="doctor-item shadow-lg bg-blue-50 rounded-xl flex flex-col items-center gap-5 overflow-hidden animate-pulse">
            <div className="w-full h-70 bg-gray-300"></div>
            <div className="info flex gap-3 bg-white p-3 shadow-lg -mt-10 w-full">
                <div className="text w-full space-y-3">
                    <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                    <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceholderCard;