/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Calendar, FileText } from "lucide-react";
// import { useAnnouncementStore } from "@/store/announcementStore";
// import { useNavigate } from "react-router-dom";

// export default function ListAnnouncements() {
//   const { announcements, fetchAnnouncements, isLoading } = useAnnouncementStore();
// const navigate=useNavigate()
//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   if (isLoading) {
//     return (
//       <p className="text-center mt-10 text-gray-600 animate-pulse">
//         Loading announcements...
//       </p>
//     );
//   }

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6 md:px-12">
//       {/* Background Decorations */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full opacity-25 blur-3xl -z-10" />
//       <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-300 rounded-full opacity-25 blur-3xl -z-10" />

//       <div className="relative max-w-7xl mx-auto">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-14 text-center tracking-tight">
//           Announcements
//         </h1>

//         {/* Announcement Cards Grid */}
//         <div  className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {announcements.length === 0 && (
//             <p className="text-center col-span-full text-gray-500">
//               No announcements yet 📢
//             </p>
//           )}

//           {announcements.map((announcement) => (
//             <Card  onClick={()=>navigate(`/admin/dashboard/editAnnouncement/${announcement.id}`)}
//               key={announcement.id}
//               className="flex flex-col justify-between shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-lg"
//             >
//               <div >
//                 <CardHeader>
//                   <CardTitle className="text-lg font-semibold text-gray-900">
//                     {announcement.title}
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent>
//                   {/* <p className="text-gray-700 text-sm mb-2">
//                     {announcement.subject}
//                   </p> */}

//                   <div className="flex items-center text-gray-600 text-sm mb-2">
//                     <Calendar className="w-5 h-5 mr-2 text-green-600" />
//                     <span>
//                       {announcement.created
//                         ? new Date(announcement.created).toLocaleString([], {
//                             dateStyle: "medium",
//                             timeStyle: "short",
//                           })
//                         : "Date not available"}
//                     </span>
//                   </div>

//                   {/* Attachments */}
//                   {announcement.attachement && announcement.attachement.length > 0 && (
//                     <div className="flex flex-col gap-1 mt-2">
//                       {announcement.attachement.map((file: any, index: number) => (
//                         <a
//                           key={index}
//                           href={file.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
//                         >
//                           <FileText size={16} /> {file.name || "Attachment"}
//                         </a>
//                       ))}
//                     </div>
//                   )}
//                 </CardContent>
//               </div>

//               <CardFooter className="flex justify-end items-center gap-3 pt-4">
//                 {/* Future buttons for edit/delete can go here */}
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import  { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, FileText, Trash2 } from "lucide-react";
import { useAnnouncementStore } from "@/store/AnnouncementStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ListAnnouncements() {
  const { announcements, fetchAnnouncements, deleteAnnouncement, isLoading } =
    useAnnouncementStore();
  const navigate = useNavigate();
  const [delannouncemsg,setDelAnnounceMsg]=useState(false)
  const [delannounceid,setDelAnnounceId]=useState("")

  useEffect(() => {
    fetchAnnouncements();
    console.log(announcements);
    
  }, [ fetchAnnouncements]);

  const confirmAnnounceDel=async()=>{
    setDelAnnounceMsg(false)
    try {
       await deleteAnnouncement(delannounceid);
       toast.success("Successfully Deleted the announcement")
    } catch (err) {
      console.log(err);
      toast.error("Deletion failed")
    }
  }
  const cancelAnnounceDel=()=>{
    setDelAnnounceMsg(false)
    setDelAnnounceId("")
  }

  const handleDelete = async (id: string) => {
    setDelAnnounceId(id)
    setDelAnnounceMsg(true)
   
  };

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-600 animate-pulse">
        Loading announcements...
      </p>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6 md:px-12">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200 rounded-full opacity-25 blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-300 rounded-full opacity-25 blur-3xl -z-10" />

      <div className="relative max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-14 text-center tracking-tight">
          Announcements
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {announcements.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No announcements yet 📢
            </p>
          )}

          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="flex flex-col justify-between shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-lg relative"
            >
              <div
                onClick={() =>
                  navigate(`/admin/dashboard/editAnnouncement/${announcement.id}`)
                }
                className="cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {announcement.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <Calendar className="w-5 h-5 mr-2 text-green-600" />
                    <span>
                      {announcement.created
                        ? new Date(announcement.created).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Date not available"}
                    </span>
                  </div>

                  {announcement.attachement && announcement.attachement.length > 0 && (
                    <div className="flex flex-col gap-1 mt-2">
                      {announcement.attachement.map((file: any, index: number) => (
                        <a
                          key={index}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                        >
                          <FileText size={16} /> {file.name || "Attachment"}
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </div>

              <CardFooter className="flex justify-end items-center gap-3 pt-4">
                <Trash2
                  className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(announcement.id!)}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {
        delannouncemsg &&
        <ConfirmDialog title="Delete Announcement" message="Are you sure want to delete this announcement" confirmText="Yes"  cancelText="No" onConfirm={confirmAnnounceDel} onCancel={cancelAnnounceDel}/>
      }
    </div>
  );
}
