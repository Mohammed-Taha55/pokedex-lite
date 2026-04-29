export default function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <span className="text-5xl">⚠️</span>
      <p className="text-red-500 font-semibold text-lg">Something went wrong</p>
      <p className="text-gray-500 text-sm max-w-sm">{message}</p>
      <p className="text-gray-400 text-xs">Try refreshing the page.</p>
    </div>
  );
}
