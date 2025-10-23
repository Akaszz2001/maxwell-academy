import  { useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react"; // Assuming lucide-react is installed
import * as htmlToImage from "html-to-image";
import { Button } from "@/components/ui/button"; // Adjust path if needed
import { useAuthStore } from "@/store/authStore";

export default function CredentialShowing() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};
  const captureRef = useRef<HTMLDivElement>(null);
const {user}=useAuthStore()
  const takeScreenshot = async () => {
    console.log(formData)
    if (!captureRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(captureRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "signup.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Signup Details",
          text: "Here are my signup details",
          files: [file],
        });
      } else {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "signup.png";
        link.click();
      }
    } catch (err) {
      console.error("Screenshot failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex flex-col items-center">
      {/* Top navigation buttons */}
 { user &&    <div className="w-full max-w-7xl flex justify-between items-center mb-6 px-2 md:px-0">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>

        <Button
          asChild
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Link to="/admin/dashboard">
            <Home className="w-5 h-5" /> Dashboard
          </Link>
        </Button>
      </div>}

      {/* Signup success card */}
      <div
        ref={captureRef}
        className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg text-center transition-transform transform hover:scale-[1.02]"
      >
        {formData.role==="student" ?<h2 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Successfully Created Student Account
        </h2>: <h2 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Successfully Created Faculty Account
        </h2>}
        <p className="text-gray-700 mb-6 text-lg">
         Dear <span className="font-semibold">{formData.name}</span>, these are your account credentials. Do not share them with others. {!user && "You must wait until the admin verifies your account before you can log in."}
</p>
        <div className="space-y-3 text-left bg-gray-50 p-5 rounded-xl shadow-inner">
          <p>
            <span className="font-semibold">Name:</span> {formData.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {formData.phone || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Password:</span> {formData.password}
          </p>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={takeScreenshot}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Share
          </button>
          {/* <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition font-semibold"
          >
            Go to Login
          </button> */}
        </div>
      </div>
    </div>
  );
}
