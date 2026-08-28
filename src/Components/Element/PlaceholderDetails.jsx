 const PlaceholderDetails = () => {
    return (
        <div className="doctor-details-page min-h-screen pt-20 bg-gray-50">
            <div className="container mx-auto px-5 py-10 animate-pulse">

                {/* Back Button Skeleton */}
                <div className="w-40 h-6 bg-gray-300 rounded mb-6"></div>

                {/* Header Card */}
                <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
                    <div className="flex flex-col md:flex-row gap-8">

                        {/* Image Skeleton */}
                        <div className="w-48 h-48 bg-gray-300 rounded-2xl"></div>

                        {/* Info Skeleton */}
                        <div className="flex-1 space-y-4">

                            <div className="space-y-3">
                                <div className="h-8 w-64 bg-gray-300 rounded"></div>
                                <div className="h-6 w-48 bg-gray-300 rounded"></div>
                            </div>

                            {/* Star rating skeleton */}
                            <div className="h-10 w-40 bg-gray-300 rounded-full"></div>

                            {/* Quick Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                            <div className="space-y-2 w-full">
                                                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                                <div className="h-4 w-48 bg-gray-300 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* Buttons Skeleton */}
                            <div className="flex flex-wrap gap-3 mt-4">
                                <div className="h-12 w-48 bg-gray-300 rounded-xl"></div>
                                <div className="h-12 w-40 bg-gray-300 rounded-xl"></div>
                                <div className="h-12 w-32 bg-gray-300 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Skeleton */}
                <div className="bg-white rounded-3xl shadow-lg">
                    <div className="flex border-b">
                        <div className="w-32 h-12 bg-gray-200"></div>
                        <div className="w-32 h-12 bg-gray-200"></div>
                        <div className="w-32 h-12 bg-gray-200"></div>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* Content skeleton */}
                        <div className="h-6 w-52 bg-gray-300 rounded"></div>
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                        </div>

                        <div className="h-6 w-48 bg-gray-300 rounded mt-6"></div>
                        <div className="flex flex-wrap gap-3">
                            {Array(3)
                                .fill(0)
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-8 w-32 bg-gray-200 rounded-full"
                                    ></div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
 }
    export default PlaceholderDetails;
