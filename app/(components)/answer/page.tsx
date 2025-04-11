"use client";

import jsonData from "../../../data.json"; // Keep for profile lookup if needed, or pass author directly
import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti"; // Make sure to install: npm install canvas-confetti

// Define the structure for an answer (as passed via props)
export interface Answer {
  id: string; // Use string for ID consistency
  author: string;
  date: string;
  content: React.ReactNode;
  isResonated?: boolean; // Add optional isResonated prop
  resonanceDate?: string; // Add resonance date
}

// Define props for the AnswerPage component
interface AnswerPageProps {
  answer?: Answer; // Make answer prop optional
  onResonate?: (answerId: string, date: string) => void; // Add callback prop
}

// Helper function to find profile name by ID
const getAuthorName = (profileId: string): string => {
  const profile = jsonData.profiles.find((p) => p.id === profileId);
  return profile ? profile.name : "Unknown Author";
};

export default function AnswerPage({
  answer: answerProp,
  onResonate,
}: AnswerPageProps) {
  // Determine the answer to display: use prop or default from data.json
  const answerToDisplay =
    answerProp ??
    (() => {
      const defaultRawAnswer = jsonData.book_answers[0];
      if (!defaultRawAnswer) {
        // Handle case where data.json is empty or book_answers is missing
        return {
          id: "default-error",
          author: "Error",
          date: new Date().toISOString().split("T")[0],
          content: "Could not load default answer.",
        };
      }
      return {
        id: defaultRawAnswer.id,
        author: getAuthorName(defaultRawAnswer.profile_id),
        date: defaultRawAnswer.date,
        content: defaultRawAnswer.answer_text,
      };
    })();

  // Changed props destructuring
  // Event handlers for date and author clicks (use 'answerToDisplay' prop)
  const handleDateClick = () => {
    alert(`${answerToDisplay.date} 답변의 상세 페이지로 이동합니다.`);
  };

  const handleAuthorClick = () => {
    alert(`${answerToDisplay.author}님의 프로필로 이동합니다.`);
  };

  // State for the resonance button interaction
  const [isPressing, setIsPressing] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isFilled, setIsFilled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [localResonanceDate, setLocalResonanceDate] = useState<string | null>(
    null
  ); // Add local state for resonance date

  const HOLD_DURATION = 2300; // ms
  const INTERVAL_DURATION = 23; // ms
  const INCREMENT = (INTERVAL_DURATION / HOLD_DURATION) * 100;

  // Function to trigger confetti effect
  const triggerConfetti = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };

    confetti({
      particleCount: 100,
      spread: 70,
      origin: origin,
      gravity: 0.8,
      ticks: 300,
      scalar: 1.2,
      zIndex: 1000,
    });
    setTimeout(
      () =>
        confetti({
          particleCount: 50,
          spread: 120,
          origin: origin,
          gravity: 0.6,
          ticks: 200,
          scalar: 1.0,
          angle: 90,
          startVelocity: 40,
          zIndex: 1000,
        }),
      100
    );
  };

  // Function to handle press start
  const startPress = () => {
    if (isFilled || answerProp?.isResonated) return; // Prevent if already resonated
    setIsPressing(true);
    setIsFilled(false);
    setFillPercentage(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setFillPercentage((prev) => {
        const next = prev + INCREMENT;
        if (next >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          setIsFilled(true);
          triggerConfetti();
          const currentDate = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD
          setLocalResonanceDate(currentDate); // Set local state immediately
          // Call the callback when resonance is complete
          if (onResonate && answerToDisplay) {
            onResonate(answerToDisplay.id, currentDate);
          }
          return 100;
        }
        return next;
      });
    }, INTERVAL_DURATION);
  };

  // Function to handle press stop
  const stopPress = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (!isFilled) {
      setFillPercentage(0);
    } else {
      setTimeout(() => {
        setIsFilled(false);
        setFillPercentage(0);
      }, 1000);
    }
    setIsPressing(false);
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Reset resonance state when the answer changes
  useEffect(() => {
    setIsPressing(false);
    setFillPercentage(0);
    setIsFilled(false);
    setLocalResonanceDate(null); // Reset local state when answer changes
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [answerToDisplay?.id]); // Depend on the ID of the answer being displayed

  return (
    <>
      {/* Answer Card */}
      <div className="flex flex-col justify-center items-center">
        {/* Apply conditional background based on answerProp.isResonated */}
        <div
          className={`shadow-md rounded-lg p-6 mb-2 ${
            answerProp?.isResonated ? "bg-sky-50" : "bg-white"
          }`}
        >
          {" "}
          {/* Added mb-4 for spacing in list */}
          {/* Answer Content - Use answerToDisplay */}
          <div className="mb-6 whitespace-pre-line">
            {answerToDisplay.content}
          </div>
          {/* Meta Info - Use answerToDisplay */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-6">
            <p
              className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors hover:underline"
              onClick={handleDateClick}
            >
              {answerToDisplay.date}
            </p>
            <p className="text-sm text-gray-500">
              <span
                className="cursor-pointer hover:underline"
                onClick={handleAuthorClick}
              >
                {answerToDisplay.author}
              </span>
              님의 답변
            </p>
          </div>
        </div>

        {/* Conditional Rendering: Resonance Button OR Static Date */}
        {answerProp?.isResonated || localResonanceDate ? ( // Check prop OR local state
          // Render static resonance date if resonated
          <div className="relative w-full mt-0 py-3 px-4 bg-gray-100 text-gray-600 border border-gray-300 font-semibold rounded-lg shadow-inner text-center text-sm">
            {localResonanceDate ?? answerProp?.resonanceDate}에 공명함{" "}
            {/* Prioritize local, fallback to prop */}
          </div>
        ) : (
          // Render interactive button if not resonated
          <button
            ref={buttonRef}
            className="relative w-full py-3 px-4 bg-white text-gray-800 border border-gray-300 font-semibold rounded-lg shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 select-none hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onMouseDown={startPress}
            onMouseUp={stopPress}
            onMouseLeave={stopPress}
            onTouchStart={(e) => {
              e.preventDefault();
              startPress();
            }}
            onTouchEnd={stopPress}
            onContextMenu={(e) => e.preventDefault()}
            disabled={isFilled} // Disable button briefly after fill?
          >
            {/* Fill Indicator */}
            <div
              className="absolute top-0 left-0 h-full bg-gray-300 transition-all ease-linear"
              style={{
                width: `${fillPercentage}%`,
                transitionDuration: `${INTERVAL_DURATION}ms`,
              }}
            />
            {/* Button Text - Simplified */}
            <span className="relative z-10">
              {isPressing ? "공명 중..." : "꾹 눌러서 공명"}{" "}
              {/* Remove "공명 완료!" state */}
            </span>
          </button>
        )}
      </div>
    </>
  );
}
