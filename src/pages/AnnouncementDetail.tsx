import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAnnouncementStore } from "@/store/announcementStore";
import { useAuthStore } from "@/store/authStore";

export default function AnnouncementDetail() {
  const { announceID } = useParams();
  const { fetchAnnouncementsById, isLoading } = useAnnouncementStore();
  const [announcement, setAnnouncement] = useState<any>(null);
  const {user}=useAuthStore()

  useEffect(() => {
    // Mark announcements as visited
    const visited = JSON.parse(localStorage.getItem("visitedAnnouncements") || "{}");

// initialize user key if not exists
if (!visited[user.id]) visited[user.id] = [];

// mark current announcement as visited
if (!visited[user.id].includes(announceID)) {
  visited[user.id].push(announceID);
  localStorage.setItem("visitedAnnouncements", JSON.stringify(visited));
}
  }, [announceID]);
  
  useEffect(() => {
    if (announceID) {
       
        
      fetchAnnouncementsById(announceID).then(setAnnouncement);
    }
  }, [announceID,fetchAnnouncementsById]);

  if (isLoading || !announcement)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading announcement...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{announcement.title}</h2>
          <Link
            to="/announcements"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            ← Back to list
          </Link>
        </div>

        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Published Date: </span>
          {new Date(announcement.created).toLocaleString()}
        </p>

        {announcement.subject && (
          <p className="text-gray-800 text-lg leading-relaxed mb-8 whitespace-pre-line">
            {announcement.subject}
          </p>
        )}

        {announcement.attachementUrls && announcement.attachementUrls.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Attachments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {announcement.attachementUrls.map((url: string, idx: number) => {
                const fileName = url.split("/").pop();
                const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName || "");
                const isPDF = /\.pdf$/i.test(fileName || "");

                return (
                  <div
                    key={idx}
                    className="bg-gray-50 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3 flex flex-col items-center justify-center"
                  >
                    {isImage ? (
                      <img
                        src={url}
                        alt={fileName || "Attachment"}
                        className="w-full h-48 object-cover rounded-md mb-2"
                      />
                    ) : isPDF ? (
                      <iframe
                        src={url}
                        title={fileName}
                        className="w-full h-48 rounded-md mb-2"
                      ></iframe>
                    ) : (
                      <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-md text-gray-500 text-sm">
                        File preview not available
                      </div>
                    )}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 truncate w-full text-center"
                    >
                      {fileName}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
