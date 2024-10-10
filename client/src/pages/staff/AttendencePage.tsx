import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { recordStaffAttendence } from "../../services/AttendenceService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface Location {
  latitude: number | null;
  longitude: number | null;
}

const AttendancePage = () => {
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false);
  const [hasVideoPermission, setHasVideoPermission] = useState<boolean>(false);
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [imageNew,setImageNew] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const requestLocationPermission = () => {
      if (navigator.geolocation) {
        console.log("Requesting location access...");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location obtained:", position.coords);
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setHasLocationPermission(true);
          },
          (error) => {
            console.error("Error getting location:", error.message);
            setHasLocationPermission(false);
            setLocationError(error.message);
          }
        );
      } else {
        const msg = "Geolocation is not supported by this browser.";
        console.error(msg);
        setHasLocationPermission(false);
        setLocationError(msg);
      }
    };

    requestLocationPermission();
  }, []);

  const handleUserMedia = useCallback(() => {
    console.log("Video permissions granted and webcam is accessible.");
    setHasVideoPermission(true);
  }, []);

  const handleUserMediaError = useCallback(() => {
    console.error("Error accessing webcam:");
    setHasVideoPermission(false);
    setVideoError("Unable to access the webcam.");
  }, []);

  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImageNew(imageSrc)
        const imageFile = base64ToFile(imageSrc, "captured-image.png");
        setCapturedImage(imageFile);
        console.log("Image captured:", imageFile);
      } else {
        console.error("Failed to capture image.");
      }
    } else {
      console.error("Webcam reference is not available.");
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true); 
    if (location.latitude && location.longitude && capturedImage) {
      try {
        const data = {
          location,
          capturedImage,
        };
        const response = await recordStaffAttendence(data);
        setLoading(false);
        if (response.success) {
          toast.success(response.message); 
          navigate("/staff-dashboard");
        } else {
          toast.error(response.message);   
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to record attendance.",);
      }
    } else {
      toast.error("Failed to record attendance.");
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, capturedImage]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-6 w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Mark Your Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          {!hasLocationPermission && !locationError && (
            <p>Requesting location access...</p>
          )}
          {!hasLocationPermission && locationError && (
            <div>
              <p>Please allow location access to mark your attendance.</p>
              <p className="text-red-500">Error: {locationError}</p>
            </div>
          )}
          {hasLocationPermission && !hasVideoPermission && !videoError && (
            <p>Requesting video access...</p>
          )}
          {hasLocationPermission && !hasVideoPermission && videoError && (
            <div>
              <p>Please allow video access to capture your image.</p>
              <p className="text-red-500">Error: {videoError}</p>
            </div>
          )}

          {hasLocationPermission && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={{
                facingMode: "user",
              }}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              mirrored={true}
              className={`w-full h-auto mb-4 ${
                hasVideoPermission ? "block" : "hidden"
              }`}
            />
          )}

          {hasVideoPermission && (
            <>
              <Button onClick={handleCapture} disabled={loading} className="mt-2">
                Capture Image
              </Button>

              {imageNew && (
                <>
                  <img
                    src={imageNew}
                    alt="Captured"
                    className="w-full h-auto mt-4 mb-4"
                  />
                  <Button onClick={handleSubmit} disabled={loading || !capturedImage}>
                  {loading ? "Please wait, verifying..." : "Submit Attendance"}
                  </Button>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { AttendancePage };
