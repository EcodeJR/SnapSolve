import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";
import { MdCameraswitch, MdPhotoCamera } from "react-icons/md";

const CameraCapture = ({ onCapture, onClose, darkMode }) => {
    const [stream, setStream] = useState(null);
    const [facingMode, setFacingMode] = useState('user');
    const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
    const videoRef = useRef(null);

    // Check for available cameras
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const cameras = devices.filter(device => device.kind === 'videoinput');
                setHasMultipleCameras(cameras.length > 1);
            })
            .catch(err => console.error("Error checking cameras:", err));
    }, []);

    const startCamera = async () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        try {
            const constraints = {
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            };

            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(mediaStream);
            
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                // Wait for video to be ready
                await new Promise((resolve) => {
                    videoRef.current.onloadedmetadata = () => {
                        resolve();
                    };
                });
                await videoRef.current.play();
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            // Fallback to any available camera if specific mode fails
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (fallbackErr) {
                console.error("Camera access completely failed:", fallbackErr);
            }
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const switchCamera = async () => {
        await stopCamera();
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        // Flip horizontally if using front camera
        if (facingMode === 'user') {
            ctx.scale(-1, 1);
            ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        } else {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        
        canvas.toBlob(blob => {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            onCapture([file]);
            stopCamera();
            onClose();
        }, 'image/jpeg', 0.8);
    };

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, [facingMode]);

    return (
        <div className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="relative h-full flex flex-col">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    {hasMultipleCameras && (
                        <button
                            onClick={switchCamera}
                            className="p-3 rounded-full bg-gray-800/50 text-white hover:bg-gray-800/70"
                        >
                            <MdCameraswitch className="text-2xl" />
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="p-3 rounded-full bg-red-500/50 text-white hover:bg-red-500/70"
                    >
                        <IoClose className="text-2xl" />
                    </button>
                </div>

                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className={`h-full w-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                />

                <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <button
                        onClick={capturePhoto}
                        className="p-6 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                    >
                        <MdPhotoCamera className="text-3xl text-gray-800" />
                    </button>
                </div>
            </div>
        </div>
    );
};

CameraCapture.propTypes = {
    onCapture: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired
};

export default CameraCapture;