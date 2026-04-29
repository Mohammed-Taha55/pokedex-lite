// shown when something is loading
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-14 h-14 border-4 border-red-200 border-t-red-500 rounded-full animate-spin" />
      <p className="text-gray-500 text-sm">Loading Pokémon...</p>
    </div>
  );
}
