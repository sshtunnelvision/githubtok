"use client";

import { useState, useEffect } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { Repository } from "@/types/github";
import { RepoCard } from "./repo-card";

interface SwipeContainerProps {
  repositories: Repository[];
  onSwipe: (direction: "left" | "right" | "up") => void;
}

export function SwipeContainer({ repositories, onSwipe }: SwipeContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const handleSwipe = async (direction: "left" | "right" | "up") => {
    const directionToAnimation = {
      left: { x: "-100%" },
      right: { x: "100%" },
      up: { y: "-100%" },
    };

    await controls.start({
      ...directionToAnimation[direction],
      transition: { duration: 0.2 },
    });
    onSwipe(direction);
    controls.set({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev + 1) % repositories.length);
  };

  const handleDragEnd = async (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const offset = info.offset;
    const velocity = info.velocity;

    // Lower threshold for easier swipes
    const swipeThreshold = 10000;
    const offsetThreshold = 100;

    const isHorizontalSwipe = Math.abs(offset.x) > Math.abs(offset.y);
    const isVerticalSwipe = Math.abs(offset.y) > Math.abs(offset.x);

    if (
      (Math.abs(velocity.x) > swipeThreshold ||
        Math.abs(offset.x) > offsetThreshold) &&
      isHorizontalSwipe
    ) {
      // Horizontal swipe
      await handleSwipe(offset.x > 0 ? "right" : "left");
    } else if (
      (Math.abs(velocity.y) > swipeThreshold ||
        Math.abs(offset.y) > offsetThreshold) &&
      isVerticalSwipe &&
      offset.y < 0
    ) {
      // Vertical swipe (up only)
      await handleSwipe("up");
    } else {
      // If not a swipe, animate back to center
      controls.start({
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 500, damping: 30 },
      });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          handleSwipe("left");
          break;
        case "ArrowRight":
          handleSwipe("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [repositories.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!repositories.length) {
    return <div>No repositories to display</div>;
  }

  return (
    <div className="relative w-full h-[calc(100vh-14rem)] flex items-center justify-center">
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileDrag={{ scale: 1.05 }}
        style={{ x: 0, y: 0 }}
        className={`touch-none select-none transition-opacity ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <RepoCard repo={repositories[currentIndex]} />
      </motion.div>

      {/* Desktop navigation buttons */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-12">
        <button
          onClick={() => handleSwipe("left")}
          className="p-3 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
          aria-label="Skip repository"
        >
          ←
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="p-3 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
          aria-label="Like repository"
        >
          →
        </button>
      </div>
    </div>
  );
}
