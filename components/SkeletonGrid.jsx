// grid of skeleton cards shown while pokemon data is loading
import SkeletonCard from "./SkeletonCard";

export default function SkeletonGrid({ count = 18 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
