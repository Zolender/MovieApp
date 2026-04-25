const SkeletonCard = () => {
    return (
        <div
            className="animate-pulse flex flex-col"
            style={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "0.75rem",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    aspectRatio: "2/3",
                    backgroundColor: "var(--skeleton-base)",
                }}
            />
            <div className="p-3 flex flex-col gap-2">
                <div
                    className="rounded w-3/4"
                    style={{ height: "13px", backgroundColor: "var(--skeleton-base)" }}
                />
                <div
                    className="rounded w-1/4"
                    style={{ height: "11px", backgroundColor: "var(--skeleton-base)" }}
                />
            </div>
        </div>
    )
}
 
export default SkeletonCard
