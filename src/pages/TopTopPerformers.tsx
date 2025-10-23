import { useEffect } from "react";
import { usePerformerStore } from "@/store/performersStore";

export default function TopPerformers() {
  const { performers, fetchPerformers } = usePerformerStore();

  useEffect(() => {
    fetchPerformers();
  }, [fetchPerformers]);

  // Only take top 3 performers
  const topPerformers = performers

  if (!topPerformers.length) {
    return <p className="text-center py-10 text-gray-500">No performers available yet.</p>;
  }

  // return (
  //   <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 px-6">
  //     <div className="max-w-6xl mx-auto text-center">
  //       {/* Title */}
  //       <h2 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
  //         🌟 Top Performers
  //       </h2>
  //       <p className="text-gray-600 mb-12 text-lg">
  //         Celebrating excellence and dedication — meet our outstanding achievers.
  //       </p>

  //       {/* Performer Cards */}
  //       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
  //         {topPerformers.map((performer, index) => (
  //           <div
  //             key={performer.id}
  //             className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 flex flex-col items-center relative group"
  //           >
  //             {/* Rank Badge */}
  //             <span className="absolute top-4 right-4 bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
  //               Rank {performer.rank}
  //             </span>

  //             {/* Performer Image */}
  //             <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-200 shadow-md mb-4 group-hover:scale-105 transition-transform duration-300">
  //               <img
  //                 src={performer.photo}
  //                 alt={performer.name}
  //                 className="w-full h-full object-cover"
  //               />
  //             </div>

  //             {/* Name */}
  //             <h3 className="text-xl font-bold text-gray-800 mb-1">{performer.name}</h3>

  //             {/* Decorative line */}
  //             <div className="w-12 h-1 bg-blue-500 rounded-full mb-2"></div>

  //             {/* Rank */}
  //             <p className="text-gray-600 text-sm">🏅 Rank {performer.rank}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // );


return (
  <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 px-6">
    <div className="max-w-6xl mx-auto text-center">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
        🌟 Top Performers
      </h2>
      <p className="text-gray-600 mb-12 text-lg">
        Celebrating excellence and dedication — meet our outstanding achievers.
      </p>

      {/* Performer Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
        {topPerformers.map((performer) => (
          <div
            key={performer.id}
            className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-5 flex flex-col items-center relative group"
          >
            {/* Rank Badge */}
            <span className="absolute top-4 right-4 bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
              Rank {performer.rank}
            </span>

            {/* Performer Image */}
            <div className="w-28 h-36 overflow-hidden rounded-lg border-4 border-blue-200 shadow-sm mb-4">
           <img
  src={
    performer.photo instanceof File
      ? URL.createObjectURL(performer.photo) // convert File to URL 
      : performer.photo || "/placeholder.png" // existing URL or fallback
  }
  alt={performer.name || "Performer"}
  className="w-full h-full object-cover"
/>

            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-gray-800 mb-1">{performer.name}</h3>

            {/* Decorative line */}
            <div className="w-12 h-1 bg-blue-500 rounded-full mb-2"></div>

            {/* Rank */}
            <p className="text-gray-600 text-sm">🏅 Rank {performer.rank}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


}




