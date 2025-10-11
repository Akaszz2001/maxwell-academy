

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEventsStore } from "@/store/eventStore";
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { ArrowLeft, Home, ImagePlus, X } from "lucide-react";

const EventForm = () => {
  const { createEvent, updateEvent, events, fetchEvents, removeImageFromEvent } =
    useEventsStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [eventname, setEventname] = useState("");
  const [description, setDescription] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const loadEvent = async () => {
    if (!id) return;
    await fetchEvents();
    const event = events.find((e) => e.id === id);
    if (event) {
      setEventname(event.eventname);
      setDescription(event.description || "");
      setExistingImages(event.images || []);
    }
  };

  loadEvent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]); // only run on mount or id change


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files)
      setNewImages((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeNewImage = (file: File) => {
    setNewImages((prev) => prev.filter((f) => f !== file));
  };

  const removeExistingImage = async (imgUrl: string) => {
    if (!id) return;
    const confirmed = window.confirm("Are you sure you want to delete this image?");
    if (!confirmed) return;
    try {
      await removeImageFromEvent(id, imgUrl);
      setExistingImages((prev) => prev.filter((img) => img !== imgUrl));
    } catch {
      alert("Failed to delete image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventname || (existingImages.length === 0 && newImages.length === 0)) {
      alert("Event name and at least one image are required!");
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await updateEvent(id, { eventname, description, images: newImages });
        alert("Event updated successfully!");
      } else {
        await createEvent({ eventname, description, images: newImages });
        alert("Event created successfully!");
      }
      navigate("/admin/dashboard");
    } catch {
      alert("Failed to save event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, width: "100%" }} className="w-full">
      {/* 🔹 Top Bar */}
     { id &&<div className="flex justify-between items-center mb-4">
            <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
        <Button
          component={Link}
          to="/faculty/dashboard"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Home className="w-5 h-5" /> Dashboard
        </Button>
      </div>}

      {/* 🔹 Heading */}
      <div className="flex items-center justify-center mb-6">
        <ImagePlus className="w-8 h-8 text-blue-600" />
        <Typography variant="h4" className="ml-2 font-bold text-gray-800">
          {id ? "Edit Event" : "Add New Event"}
        </Typography>
      </div>

      {/* 🔹 Form Card */}
      <Card
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full"
          >
            <TextField
              label="Event Name"
              value={eventname}
              onChange={(e) => setEventname(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div>
                <Typography
                  variant="subtitle1"
                  className="font-semibold text-gray-700 mb-2"
                >
                  Existing Images
                </Typography>
                <div className="flex flex-wrap gap-3">
                  {existingImages.map((img) => (
                    <div key={img} className="relative w-24 h-24">
                      <img
                        src={img}
                        alt="existing"
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images */}
            {newImages.length > 0 && (
              <div>
                <Typography
                  variant="subtitle1"
                  className="font-semibold text-gray-700 mb-2"
                >
                  New Images
                </Typography>
                <div className="flex flex-wrap gap-3">
                  {newImages.map((file) => (
                    <div key={file.name} className="relative w-24 h-24">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(file)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 mb-2"
              >
                Upload Images
              </Typography>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700 cursor-pointer"
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : id ? (
                "Update Event"
              ) : (
                "Create Event"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventForm;
