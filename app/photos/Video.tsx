"use client";

function Video() {
  return (
    <figure className="video__container">
      <video
        className="video__media"
        autoPlay
        loop
        muted
        playsInline
        src="https://garoaskincare.com/home/video.mp4"
      ></video>
    </figure>
  );
}

export default Video;
