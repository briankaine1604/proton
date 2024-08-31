"use client";
import { useRef } from "react";
import { Player } from "@lordicon/react";
import home from "../icons/home.json";

export function Home() {
  const playerRef = useRef<Player>(null);

  const handleMouseEnter = () => {
    playerRef.current?.play();
  };

  const handleMouseLeave = () => {
    playerRef.current?.goToFirstFrame();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300 ease-in-out"
    >
      <Player ref={playerRef} icon={home} size={96} />
    </div>
  );
}
