import React, { useRef, useState } from 'react';

function MediaDisplay({ url }) {
  // Determine if the URL points to an image or video
  const isImage = /\.(jpeg|jpg|gif|png)$/i.test(url);
  const isVideo = /\.(mp4|ogg|webm)$/i.test(url);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };


  const handleVideoEnded = () => {
    // When the video ends, seek back to the start
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };


//   const toggleMute = () => {
//     videoRef.current.muted = !videoRef.current.muted;
//     setIsMuted(videoRef.current.muted);
//   };

  // Render either an image or video based on the URL
  if (isImage) {
    return <img src={url} alt="Image" className=' w-full h-full object-cover'  />;
  } else if (isVideo) {
    return (
      <div className=' '>
        <video controls={true}     className=' w-full h-[100%] object-cover hover:cursor-pointer'>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  } else {
    return <div>Unsupported media format</div>;
  }
}

export default MediaDisplay;
