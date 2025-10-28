
// import { useExamResultStore } from "@/store/examResultStore";
// import { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";

// // import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// import { Box, Button, Card, CardContent, Typography } from "@mui/material";
// import { ArrowLeft, Home, User } from "lucide-react";

// interface User {
//   score: number;
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   totalMark:number
// }

// export default function AttendedStudentsList() {
//   const { examId } = useParams<{ examId: string }>();
//   const { fetchExamParticipants } = useExamResultStore();
//   const navigate = useNavigate();

//   const [attended, setAttended] = useState<User[]>([]);
//   const [notAttended, setNotAttended] = useState<User[]>([]);

//   useEffect(() => {
//     if (!examId) return;
//     (async () => {
//       try {
//         const { attended, notAttended } = await fetchExamParticipants(examId);
//         console.log(attended);
        
//         setAttended(attended);
//         setNotAttended(notAttended);
//       } catch (err) {
//         console.error("Failed to fetch participants:", err);
//       }
//     })();
//   }, [examId, fetchExamParticipants]);

//   return (
//     <div className="p-4 md:p-6 max-w-6xl mx-auto">
//       {/* Top Bar */}
//       {/* <div className="flex justify-between items-center mb-6">
//         <Button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
//         >
//           <ArrowLeft className="w-5 h-5" /> Back
//         </Button>

//         <Button
//           asChild
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
//         >
//           <Link to="/faculty/dashboard">
//             <Home className="w-5 h-5" /> Dashboard
//           </Link>
//         </Button>
//       </div> */}
// <Box
//       display="flex"
//       justifyContent="space-between"
//       alignItems="center"
//       mb={3}
//     >
//       {/* Back Button */}
//       <Button
//         onClick={() => navigate(-1)}
//         variant="contained"
//         startIcon={<ArrowLeft className="w-5 h-5" />}
//         sx={{
//           backgroundColor: "#e5e7eb", // gray-200
//           color: "#1f2937", // gray-800
//           textTransform: "none",
//           "&:hover": {
//             backgroundColor: "#d1d5db", // gray-300
//           },
//         }}
//       >
//         Back
//       </Button>

//       {/* Dashboard Button */}
//       <Button
//         component={Link}
//         to="/faculty/dashboard"
//         variant="contained"
//         startIcon={<Home className="w-5 h-5" />}
//         sx={{
//           backgroundColor: "#2563eb", // blue-600
//           color: "white",
//           textTransform: "none",
//           "&:hover": {
//             backgroundColor: "#1d4ed8", // blue-700
//           },
//         }}
//       >
//         Dashboard
//       </Button>
//     </Box>
//       {/* Heading */}
//       <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
//         <User className="w-8 h-8 text-blue-600" />
//         <Typography variant="h4" className="font-extrabold text-gray-800 text-center">
//           Exam Participants
//         </Typography>
//       </div>

//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Attended Students */}
//         <div>
//           <Typography variant="h6" className="font-semibold mb-3 text-green-600  pb-1">
//             ✅ Attended Students ({attended.length})
//           </Typography>

//           <div className="space-y-4">
//             {attended.map((s) => {

//               const percentage=(s.score/s.totalMark)*100
//               const isPassed=percentage>=50
// //               return(
// //               <Card
// //               style={{backgroundColor:isPassed
// //                 ? "#bbf7d0"
// //                 : "#fecaca",
// //                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
// //               "&:hover": {
// //                 transform: "translateY(-4px)",
// //                 boxShadow: 6,
// //               },
              
// //               }}
// //               key={s.id} className="hover:shadow-lg transition-shadow duration-300">
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center gap-2">
// //                     <User className="w-5 h-5 text-black-500" /> {s.name}
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
// //                   <Typography variant="body2" className="text-black-600 font-stretch-100%">
// //                     Score: {s.score}
// //                   </Typography>
// //                   <Typography variant="body2" className="text-black-600">
// //                     Percentage: {percentage.toFixed(2)}%
// //                   </Typography>
// //                   <Button asChild className="text-white w-full sm:w-auto"
// //                   style={{backgroundColor:isPassed? "green":"red"}}
// //                   >
// //                     <Link to={`/faculty/dashboard/studentResults/${examId}/studentList/${s.id}`}>
// //                       View Result
// //                     </Link>
// //                   </Button>
// //                 </CardContent>
// //               </Card>
// // )})}
// return (
//   <Card
//     key={s.id}
//     sx={{
//       p: 3,
//       mb: 3,
//       borderRadius: 3,
//       boxShadow: 4,
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       background: isPassed
//         ? "linear-gradient(135deg, #bbf7d0, #86efac)"
//         : "linear-gradient(135deg, #fecaca, #fca5a5)",
//       transition: "transform 0.2s ease, box-shadow 0.2s ease",
//       "&:hover": {
//         transform: "translateY(-4px)",
//         boxShadow: 6,
//       },
//     }}
//   >
//     <Box>
//       <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <User className="w-5 h-5 text-gray-700" />
//         {s.name}
//       </Typography>

//       <Typography variant="body1" sx={{ mt: 1 }}>
//         <strong>Score:</strong> {s.score} / {s.totalMark}
//       </Typography>

//       <Typography variant="body1" sx={{ mt: 0.5 }}>
//         <strong>Percentage:</strong> {percentage.toFixed(2)}%
//       </Typography>

//       {/* <Typography
//         variant="body1"
//         fontWeight="bold"
//         sx={{
//           mt: 1,
//           color: isPassed ? "success.dark" : "error.dark",
//         }}
//       >
//         {isPassed
//           ? "✅ Pass: You have Passed. Congratulations!"
//           : "❌ Failed: Don’t give up! Keep Trying. Success will be yours."}
//       </Typography> */}
//     </Box>

//     <Button
//       sx={{
//         px: 3,
//         py: 1.2,
//         fontWeight: "bold",
//         borderRadius: 2,
//         backgroundColor: isPassed ? "#16a34a" : "#dc2626",
//         "&:hover": {
//           backgroundColor: isPassed ? "#15803d" : "#b91c1c",
//         },
//       }}
//       variant="contained"
//       component={Link}
//       to={`/faculty/dashboard/studentResults/${examId}/studentList/${s.id}`}
//     >
//       View Result
//     </Button>
//   </Card>
// )})}

//             {attended.length === 0 && (
//               <Typography variant="body2" className="text-gray-500 text-center">
//                 No students attended yet.
//               </Typography>
//             )}
//           </div>
//         </div>

//         {/* Not Attended Students */}
//         <div>
//           <Typography variant="h6" className="font-semibold mb-3 text-red-600  pb-1">
//             ❌ Not Attended Students ({notAttended.length})
//           </Typography>

//           <div className="space-y-4">
//             {notAttended.map((s) => (
//               <Card key={s.id} className="hover:shadow-lg transition-shadow duration-300">
//                 <CardContent className="flex items-center gap-2">
//                   <User className="w-5 h-5 text-gray-500" />
//                   <Typography variant="body1">{s.name}</Typography>
//                 </CardContent>
//               </Card>
//             ))}

//             {notAttended.length === 0 && (
//               <Typography variant="body2" className="text-gray-500 text-center">
//                 All students attended.
//               </Typography>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useExamResultStore } from "@/store/examResultStore";
import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { ArrowLeft, Home, User, Search, ArrowDown, ArrowUp } from "lucide-react";

interface User {
  score: number;
  id: string;
  name: string;
  email: string;
  role: string;
  totalMark: number;
}

export default function AttendedStudentsList() {
  const { examId } = useParams<{ examId: string }>();
  const { fetchExamParticipants } = useExamResultStore();
  const navigate = useNavigate();

  const [attended, setAttended] = useState<User[]>([]);
  const [notAttended, setNotAttended] = useState<User[]>([]);
  const [searchAttended, setSearchAttended] = useState("");
  const [searchNotAttended, setSearchNotAttended] = useState("");

  const attendedRef = useRef<HTMLDivElement | null>(null);
  const notAttendedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!examId) return;
    (async () => {
      try {
        const { attended, notAttended } = await fetchExamParticipants(examId);
        setAttended(attended);
        console.log(attended);
        
        setNotAttended(notAttended);
      } catch (err) {
        console.error("Failed to fetch participants:", err);
      }
    })();
  }, [examId, fetchExamParticipants]);

  // ✅ Case-insensitive filtering
  const filteredAttended = attended.filter((s) =>
    s.name.toLowerCase().includes(searchAttended.toLowerCase())
  );
  const filteredNotAttended = notAttended.filter((s) =>
    s.name.toLowerCase().includes(searchNotAttended.toLowerCase())
  );

  // ✅ Smooth scroll functions
  const scrollToNotAttended = () =>
    notAttendedRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          startIcon={<ArrowLeft className="w-5 h-5" />}
          sx={{
            backgroundColor: "#e5e7eb",
            color: "#1f2937",
            textTransform: "none",
            "&:hover": { backgroundColor: "#d1d5db" },
          }}
        >
          Back
        </Button>

        <Button
          component={Link}
          to="/faculty/dashboard"
          variant="contained"
          startIcon={<Home className="w-5 h-5" />}
          sx={{
            backgroundColor: "#2563eb",
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: "#1d4ed8" },
          }}
        >
          Dashboard
        </Button>
      </Box>

      {/* Title and Jump Button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <Box display="flex" alignItems="center" gap={2}>
          <User className="w-8 h-8 text-blue-600" />
          <Typography variant="h4" className="font-extrabold text-gray-800">
            Exam Participants
          </Typography>
        </Box>

        <Button
          onClick={scrollToNotAttended}
          variant="outlined"
          endIcon={<ArrowDown className="w-4 h-4" />}
          sx={{
            mt: { xs: 2, md: 0 },
            borderColor: "#2563eb",
            color: "#2563eb",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#eff6ff",
              borderColor: "#1d4ed8",
            },
          }}
        >
          Go to Not Attended
        </Button>
      </div>

      {/* ✅ Attended Section */}
      <div ref={attendedRef}>
        <Typography variant="h6" className="font-semibold mb-2 text-green-600">
          ✅ Attended Students ({filteredAttended.length}/{attended.length})
        </Typography>

        <TextField
          fullWidth
          placeholder="Search Attended Students..."
          value={searchAttended}
          onChange={(e) => setSearchAttended(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            mb: 3,
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&:hover fieldset": {
                borderColor: "#2563eb",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#2563eb",
                boxShadow: "0 0 5px rgba(37,99,235,0.5)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="w-5 h-5 text-gray-500" />
              </InputAdornment>
            ),
          }}
        />

        <div className="space-y-4 mb-10">
          {filteredAttended.map((s) => {
            const percentage = (s.score / s.totalMark) * 100;
            const isPassed = percentage >= s.passPercentage;

            return (
              <Card
                key={s.id}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: isPassed
                    ? "linear-gradient(135deg, #bbf7d0, #86efac)"
                    : "linear-gradient(135deg, #fecaca, #fca5a5)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <User className="w-5 h-5 text-gray-700" />
                    {s.name}
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Score:</strong> {s.score} / {s.totalMark}
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    <strong>Percentage Scored:</strong> {percentage.toFixed(2)}% 
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    <strong>Percentage Required: </strong>{s.passPercentage} %
                  </Typography>
                </Box>

                <Button
                  sx={{
                    px: 3,
                    py: 1.2,
                    fontWeight: "bold",
                    borderRadius: 2,
                    backgroundColor: isPassed ? "#16a34a" : "#dc2626",
                    "&:hover": {
                      backgroundColor: isPassed ? "#15803d" : "#b91c1c",
                    },
                  }}
                  variant="contained"
                  component={Link}
                  to={`/faculty/dashboard/studentResults/${examId}/studentList/${s.id}`}
                >
                  View Result
                </Button>
              </Card>
            );
          })}

          {filteredAttended.length === 0 && (
            <Typography variant="body2" className="text-gray-500 text-center">
              No matching students found.
            </Typography>
          )}
        </div>
      </div>

      {/* ✅ Not Attended Section */}
      <div ref={notAttendedRef}>
        <Typography variant="h6" className="font-semibold mb-2 text-red-600">
          ❌ Not Attended Students ({filteredNotAttended.length}/{notAttended.length})
        </Typography>

        <TextField
          fullWidth
          placeholder="Search Not Attended Students..."
          value={searchNotAttended}
          onChange={(e) => setSearchNotAttended(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            mb: 3,
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&:hover fieldset": {
                borderColor: "#dc2626",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#dc2626",
                boxShadow: "0 0 5px rgba(220,38,38,0.4)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="w-5 h-5 text-gray-500" />
              </InputAdornment>
            ),
          }}
        />

        <div className="space-y-4 mb-6">
          {filteredNotAttended.map((s) => (
            <Card
              key={s.id}
              sx={{
                p: 2.5,
                borderRadius: 3,
                boxShadow: 3,
                background: "linear-gradient(135deg, #fef2f2, #fecaca)",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <User className="w-5 h-5 text-gray-600" />
              <Typography variant="body1" sx={{ color: "#374151" }}>
                {s.name}
              </Typography>
            </Card>
          ))}

          {filteredNotAttended.length === 0 && (
            <Typography variant="body2" className="text-gray-500 text-center">
              No matching students found.
            </Typography>
          )}
        </div>
      </div>

      {/* 🔝 Return to Top Button */}
      <Box textAlign="center" mt={6}>
        <Button
          onClick={scrollToTop}
          variant="outlined"
          startIcon={<ArrowUp className="w-4 h-4" />}
          sx={{
            borderColor: "#2563eb",
            backgroundColor:"#2563eb",
            color: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#427af5",
              borderColor: "#2563ea",
            },
          }}
        >
          Return to Top
        </Button>
      </Box>
    </div>
  );
}
