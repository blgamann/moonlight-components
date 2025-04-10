"use client";

import jsonData from "../../../data.json"; // Corrected relative import path

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti"; // Make sure to install: npm install canvas-confetti

// Define the structure for an answer (as passed via props)
// This structure comes from MatchingPage's AnswerComponentType
interface Answer {
  id: string; // Use string for ID consistency with data.json
  author: string;
  date: string;
  content: React.ReactNode;
}

// Helper function to find profile name by ID
const getAuthorName = (profileId: string): string => {
  const profile = jsonData.profiles.find((p) => p.id === profileId);
  return profile ? profile.name : "Unknown Author";
};

// Prepare the default answer from data.json if props are not provided
const defaultJsonAnswer = jsonData.book_answers[0];
const defaultAnswer: Answer | null = defaultJsonAnswer
  ? {
      // Add null check
      id: defaultJsonAnswer.id,
      author: getAuthorName(defaultJsonAnswer.profile_id),
      date: defaultJsonAnswer.date,
      content: defaultJsonAnswer.answer_text,
    }
  : null; // Handle case where data.json might be empty

// Define props for the AnswerPage component
interface AnswerPageProps {
  // Make answers prop optional
  answers?: Answer[];
}

export default function AnswerPage({ answers }: AnswerPageProps) {
  // REMOVED: Pagination state (currentAnswerIndex, setCurrentAnswerIndex)

  // Determine the answer to display: use prop if available, otherwise use default
  const currentAnswer =
    answers && answers.length > 0 ? answers[0] : defaultAnswer;

  // If even the default answer isn't available (e.g., data.json is empty), show loading/error
  if (!currentAnswer) {
    return <div>답변 데이터를 불러올 수 없습니다.</div>; // Or some other placeholder/error
  }

  // Event handlers for date and author clicks (now use currentAnswer data)
  const handleDateClick = () => {
    alert(`${currentAnswer.date} 답변의 상세 페이지로 이동합니다.`);
  };

  const handleAuthorClick = () => {
    alert(`${currentAnswer.author}님의 프로필로 이동합니다.`);
  };

  // REMOVED: Pagination handlers (handlePrevious, handleNext)

  // State for the resonance button interaction (remains the same)
  const [isPressing, setIsPressing] = useState(false);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isFilled, setIsFilled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const HOLD_DURATION = 2300; // ms
  const INTERVAL_DURATION = 23; // ms
  const INCREMENT = (INTERVAL_DURATION / HOLD_DURATION) * 100;

  // Function to trigger confetti effect (remains the same)
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

  // Function to handle press start (remains the same)
  const startPress = () => {
    if (isFilled) return;
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
          return 100;
        }
        return next;
      });
    }, INTERVAL_DURATION);
  };

  // Function to handle press stop (remains the same)
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

  // Cleanup timer on component unmount (remains the same)
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Reset resonance state when the *passed answer* changes (based on its ID)
  useEffect(() => {
    setIsPressing(false);
    setFillPercentage(0);
    setIsFilled(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // Depend on the ID of the current answer passed via props
  }, [currentAnswer.id]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Answer Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Answer Content - Use currentAnswer from props */}
        <div className="mb-6">{currentAnswer.content}</div>
        {/* Meta Info - Use currentAnswer from props */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-6">
          <p
            className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors hover:underline"
            onClick={handleDateClick}
          >
            {currentAnswer.date}
          </p>
          <p className="text-sm text-gray-500">
            <span
              className="cursor-pointer hover:underline"
              onClick={handleAuthorClick}
            >
              {currentAnswer.author}
            </span>
            님의 답변
          </p>
        </div>
      </div>

      {/* Resonance Button (remains the same) */}
      <button
        ref={buttonRef}
        className="relative w-full mt-4 py-3 px-4 bg-white text-gray-800 border border-gray-300 font-semibold rounded-lg shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 select-none hover:bg-gray-100"
        onMouseDown={startPress}
        onMouseUp={stopPress}
        onMouseLeave={stopPress}
        onTouchStart={(e) => {
          e.preventDefault();
          startPress();
        }}
        onTouchEnd={stopPress}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Fill Indicator */}
        <div
          className="absolute top-0 left-0 h-full bg-gray-300 transition-all ease-linear"
          style={{
            width: `${fillPercentage}%`,
            transitionDuration: `${INTERVAL_DURATION}ms`,
          }}
        />
        {/* Button Text */}
        <span className="relative z-10">
          {isFilled
            ? "공명 완료!"
            : isPressing
            ? "공명 중..."
            : "꾹 눌러서 공명"}
        </span>
      </button>

      {/* REMOVED: Pagination/Navigation Section */}
      {/*
      <div className="mt-6 flex items-center justify-center space-x-4 p-2">
        <button ... >
          &lt;- 이전
        </button>
        <span> ... </span>
        <button ... >
          다음 -&gt;
        </button>
      </div>
      */}
    </div>
  );
}
