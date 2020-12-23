import React from "react";

export const enter = (vid_elm: React.RefObject<HTMLVideoElement>) => {
  vid_elm.current?.play();
};

export const leave = (vid_elm: React.RefObject<HTMLVideoElement>) => {
  vid_elm.current?.pause();
};
