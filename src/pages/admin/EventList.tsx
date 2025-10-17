// // src/components/EventsGallery.tsx
// import { useEventsStore } from "@/store/eventStore";
// import React, { use, useEffect, useState } from "react";
// import Slider from "react-slick";
// import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "@/store/authStore";

// const NextArrow = ({ onClick }: { onClick?: () => void }) => (


//   <div
//     className="absolute top-1/2 right-2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
//     onClick={onClick}
//   >
//     <ChevronRight size={24} />
//   </div>
// );

// const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
//   <div
//     className="absolute top-1/2 left-2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
//     onClick={onClick}
//   >
//     <ChevronLeft size={24} />
//   </div>
// );

// const EventsGallery = () => {
//   const { fetchEvents, events, deleteEvent } = useEventsStore();
//   const [loading, setLoading] = useState(true);
//   const {user}=useAuthStore()
// const navigate=useNavigate()
//   useEffect(() => {
//     const load = async () => {
//       await fetchEvents();
//       setLoading(false);
//     };
//     load();
//   }, [fetchEvents]);

//   const handleDelete = async (id: string) => {
//     const confirmed = window.confirm("Are you sure you want to delete this event?");
//     if (!confirmed) return;

//     try {
//       await deleteEvent(id);
//       alert("Event deleted successfully!");
//     } catch (err) {
//       alert("Failed to delete event.");
//     }
//   };

//   if (loading) return <div>Loading events...</div>;

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     arrows: true,
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold text-center mb-8">Event Gallery</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map((event) => (
//           <div
//             key={event.id}
//             className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition relative"
//           >
//             {/* Delete button */}
//       {   user && user.role==="admin" || user?.role=== "faculty"  &&<button
//               onClick={() => handleDelete(event.id)}
//               className="absolute top-2 right-2 z-20 bg-red-300 hover:bg-red-500 text-white p-2 rounded-full shadow"
//               title="Delete Event"
//             >
//               <Trash2 size={16} />
//             </button>
// }
//             <div className="relative">
//               <Slider {...sliderSettings}>
//                 {event.images?.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={event.eventname}
//                     className="w-full h-64 object-cover"
//                   />
//                 ))}
//               </Slider>
//             </div>
//             <div className="p-4" onClick={()=>user&& user?.role==="admin"&& navigate(`/admin/dashboard/addEvent/${event.id}`)}>
//               <h3 className="font-semibold text-xl mb-2">{event.eventname}</h3>
//              <h3 className="text-gray-500 line-clamp-2 overflow-hidden">
//   {event.description}
// </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventsGallery;



import { useEventsStore } from "@/store/eventStore";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 right-2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
    onClick={onClick}
  >
    <ChevronRight size={24} />
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 left-2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
    onClick={onClick}
  >
    <ChevronLeft size={24} />
  </div>
);

const EventsGallery = () => {
  const { fetchEvents, events, deleteEvent } = useEventsStore();
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [deletemsg,showDeleteMsg]=useState(false)
  const [deleventid,setDelEventId]=useState("")


  // Modal state
  const [selectedEvent, setSelectedEvent] = useState(null as any);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      await fetchEvents();
      setLoading(false);
    };
    load();
  }, [fetchEvents]);

   const confirmDelEvent=async()=>{
          showDeleteMsg(false)
   try {

      await deleteEvent(deleventid);
      toast.success("Event deleted successfully!");
        setDelEventId("")
    } catch (err) {
      toast.error("Failed to delete event.");
    }
   }
const cancelDelEvent=()=>{
   showDeleteMsg(false)
}

  const handleDelete = async (id: string) => {

    setDelEventId(id)
    showDeleteMsg(true)
    // const confirmed = window.confirm("Are you sure you want to delete this event?");
    // if (!confirmed) return;

    // try {
    //   await deleteEvent(id);
    //   toast.success("Event deleted successfully!");
    // } catch (err) {
    //   toast.error("Failed to delete event.");
    // }
  };

  const openModal = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading events...</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: true,
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Event Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition relative"
          >
            {/* Delete button */}
            {user && (user.role === "admin" || user.role === "faculty") && (
              <button
                onClick={() => handleDelete(event.id)}
                className="absolute top-2 right-2 z-20 bg-red-300 hover:bg-red-500 text-white p-2 rounded-full shadow"
                title="Delete Event"
              >
                <Trash2 size={16} />
              </button>
            )}

            <div className="relative">
              <Slider {...sliderSettings}>
                {event.images?.map((img, idx) => (
                  <img  onClick={() => openModal(event)}
                    key={idx}
                    src={img}
                    alt={event.eventname}
                    className="w-full h-64 object-cover"
                  />
                ))}
              </Slider>
            </div>

            <div
              className="p-4 cursor-pointer"
              onClick={() =>user?.role==="admin"&& navigate(`/admin/dashboard/addEvent/${event.id}`)}
            >
              <h3 className="font-semibold text-xl mb-2">{event.eventname}</h3>
              <h3 className="text-gray-500 line-clamp-2 overflow-hidden">
                {event.description}
              </h3>
            </div>
          </div>
        ))}
      </div>
{
  deletemsg && 
  <ConfirmDialog title="Delete the event" message="Are you sure you want to delete this event?" confirmText="Yes" cancelText="No"  onConfirm={confirmDelEvent} onCancel={cancelDelEvent}/>
}
      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50 overflow-auto pt-20 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedEvent.eventname}</h2>

              <div className="mb-4">
                <Slider {...sliderSettings}>
                  {selectedEvent.images?.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={selectedEvent.eventname}
                      className="w-full h-64 object-cover rounded"
                    />
                  ))}
                </Slider>
              </div>

              <p className="text-gray-700 max-h-96 overflow-auto">
                {selectedEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsGallery;
