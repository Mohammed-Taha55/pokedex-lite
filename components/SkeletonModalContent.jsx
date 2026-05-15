// skeleton for the modal's detail section (height/weight, abilities, stats)
export default function SkeletonModalContent() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* height / weight / base exp row */}
      <div className="flex justify-around text-center bg-gray-50 rounded-2xl py-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-3 rounded bg-gray-200" />
            <div className="w-14 h-4 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* abilities */}
      <div>
        <div className="w-16 h-3 rounded bg-gray-200 mb-2" />
        <div className="flex gap-2">
          <div className="w-20 h-6 rounded-full bg-gray-200" />
          <div className="w-24 h-6 rounded-full bg-gray-100" />
        </div>
      </div>

      {/* base stats */}
      <div>
        <div className="w-20 h-3 rounded bg-gray-200 mb-3" />
        <div className="flex flex-col gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-14 h-3 rounded bg-gray-200 shrink-0" />
              <div className="w-8 h-3 rounded bg-gray-200 shrink-0" />
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gray-200"
                  style={{ width: `${30 + i * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
