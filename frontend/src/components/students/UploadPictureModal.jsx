"use client";

import { useEffect, useRef, useState } from "react";
import { studentsService } from "@/services/students.service";
import { BACKEND_ORIGIN } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ImagePlus } from "lucide-react";

export function UploadPictureModal({ student, onClose, onSuccess }) {
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const getProfilePictureUrl = (profilePicture) => {
    if (!profilePicture) return null;
    if (profilePicture.startsWith("http://") || profilePicture.startsWith("https://")) {
      return profilePicture;
    }
    return `${BACKEND_ORIGIN}${profilePicture}`;
  };

  useEffect(() => {
    if (!student) return;
    setUploadFile(null);
    setUploadError("");
    setUploadPreview(getProfilePictureUrl(student.profile_picture));
  }, [student]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!isCameraOpen || !videoRef.current || !streamRef.current) return;

    const video = videoRef.current;
    video.srcObject = streamRef.current;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        setUploadError("No se pudo reproducir la vista de la camara.");
      });
    }
  }, [isCameraOpen]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const startCamera = async () => {
    try {
      setUploadError("");
      setIsStartingCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
    } catch {
      setUploadError("No se pudo acceder a la camara.");
    } finally {
      setIsStartingCamera(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (!video.videoWidth || !video.videoHeight) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
    
    setUploadError(""); 
    setUploadFile(file); 
    setUploadPreview(URL.createObjectURL(file)); 
    stopCamera();
    }, "image/jpeg", 0.9);
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const maxSize = 2 * 1024 * 1024; 
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (file.size > maxSize) {
      setUploadError("La imagen es demasiado grande. El límite es 2MB.");
      return; 
    }

    if (!allowedTypes.includes(file.type)) {
      setUploadError("Solo se permiten imágenes en formato JPEG o PNG.");
      return; 
    }

    setUploadError("");
    setUploadFile(file);
    setUploadPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!uploadFile) return;
    try {
      setIsUploading(true);
      setUploadError("");
      const updated = await studentsService.uploadPicture(student.id, uploadFile);
      onSuccess(updated);
      handleClose();
    } catch (err) {
      const backendError = err.response?.data?.detail || err.response?.data?.profile_picture?.[0];
      setUploadError(
        backendError || err?.message || "Error al subir la imagen. Completa la implementacion pendiente."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={!!student} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Foto de perfil</DialogTitle>
          <DialogDescription>
            {student && `${student.first_name} ${student.last_name}`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-2">
          {uploadPreview ? (
            <img
              src={uploadPreview}
              alt="Vista previa"
              className="h-32 w-32 rounded-full object-cover border"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <ImagePlus className="h-10 w-10" />
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Seleccionar imagen
          </Button>

          {!isCameraOpen ? (
            <Button variant="outline" onClick={startCamera} disabled={isStartingCamera}>
              {isStartingCamera ? "Abriendo camara..." : "Tomar foto con camara"}
            </Button>
          ) : (
            <div className="w-full space-y-2">
              <video ref={videoRef} autoPlay muted playsInline className="w-full rounded-md border" />
              <div className="flex justify-center gap-2">
                <Button onClick={capturePhoto}>Capturar</Button>
                <Button variant="ghost" onClick={stopCamera}>Cancelar camara</Button>
              </div>
            </div>
          )}

          {uploadError && (
            <p className="text-sm text-red-500 text-center">{uploadError}</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={!uploadFile || isUploading}>
            {isUploading ? "Subiendo..." : "Guardar foto"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
