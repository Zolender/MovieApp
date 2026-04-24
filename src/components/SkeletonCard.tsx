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
            {/* Poster placeholder */}
            <div
                className="w-full"
                style={{
                    height: "260px",
                    backgroundColor: "var(--skeleton-base)",
                }}
            />
            {/* Info placeholder */}
            <div className="p-3 flex flex-col gap-2">
                <div
                    className="rounded w-3/4"
                    style={{ height: "14px", backgroundColor: "var(--skeleton-base)" }}
                />
                <div
                    className="rounded w-1/4"
                    style={{ height: "12px", backgroundColor: "var(--skeleton-base)" }}
                />
            </div>
        </div>
    )
}

export default SkeletonCard
