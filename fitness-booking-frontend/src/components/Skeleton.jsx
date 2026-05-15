export default function Skeleton({ width = "w-full", height = "h-4", className = "" }) {
  return (
    <div
      className={`bg-gray-700 rounded-md ${width} ${height} shimmer ${className}`}
    />
  );
}