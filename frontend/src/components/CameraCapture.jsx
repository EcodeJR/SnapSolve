import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";
import { MdCameraswitch, MdPhotoCamera } from "react-icons/md";

const CameraCapture = ({ onCapture, onClose, darkMode }) => {
    const [stream, setStream] = useState(null);
    const [facingMode, setFacingMode] = useState('user');
    const videoRef = useRef(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode }
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const switchCamera = async () => {
        stopCamera();
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        
        canvas.toBlob(blob => {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            onCapture([file]);
            stopCamera();
            onClose();
        }, 'image/jpeg');
    };

    useState(() => {
        startCamera();
        return () => stopCamera();
    }, [facingMode]);

    return (
        <div className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="relative h-full flex flex-col">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button
                        onClick={switchCamera}
                        className="p-3 rounded-full bg-gray-800/50 text-white hover:bg-gray-800/70"
                    >
                        <MdCameraswitch className="text-2xl" />
                    </button>
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
                    className="h-full w-full object-cover"
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