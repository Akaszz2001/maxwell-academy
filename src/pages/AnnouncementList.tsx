import { useEffect } from "react";
import { useAnnouncementStore } from "@/store/announcementStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function AnnouncementList() {
  const { announcements, fetchAnnouncementsByRole, isLoading } = useAnnouncementStore();
  const navigate = useNavigate();
    const {user}=useAuthStore()
  useEffect(() => {
    console.log(announcements);
    const fetch=async()=>{
        await  fetchAnnouncementsByRole();
    }       
   fetch()
  }, [fetchAnnouncementsByRole]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading announcements...</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Announcements</h2>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-500">No announcements available.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((a) => (
            <li
              key={a.id}
              onClick={() => navigate(`/${user?.role}/dashboard/announcements/${a.id}`)}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{a.title}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(a.updated || a.created).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  {a.audience}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
