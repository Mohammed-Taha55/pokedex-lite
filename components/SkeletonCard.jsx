// skeleton placeholder that matches PokemonCard layout
export default function SkeletonCard() {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse skeleton-shimmer">
      {/* colored tint placeholder */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gray-100" />

      {/* heart placeholder */}
      <div className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-gray-100" />

      <div className="p-4 flex flex-col items-center gap-2">
        {/* number */}
        <div className="self-start w-10 h-3 rounded bg-gray-200" />

        {/* sprite area */}
        <div className="w-24 h-24 rounded-full bg-gray-100" />

        {/* name */}
        <div className="w-20 h-4 rounded bg-gray-200" />

        {/* type badges */}
        <div className="flex gap-1">
          <div className="w-14 h-5 rounded-full bg-gray-200" />
          <div className="w-12 h-5 rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
