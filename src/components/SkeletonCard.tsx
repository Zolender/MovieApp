const SkeletonCard = () => {
    return (
        <div className="animate-pulse">
            {/* for the poster */}
            <div className="w-full h-64 bg-gray-300" />
            {/* fot the title */}
            <div className="h-4 bg-gray-300 rounded mt-2 w-3/4"/>
            <div className="h-4 bg-gray-300 rounded mt-1 w-1/4"/>
        </div>
    );
}
 
export default SkeletonCard;