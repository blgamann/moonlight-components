"use client";

import { useState } from "react";
import data from "@/data.json";
import ProfileComponent from "../../profile/page";
import AnswerComponent from "../page";
import QuestionSimpleComponent from "../../question/simple/page";

export default function AnswerListPage() {
  // TODO: Get profileId from route params or props
  const profileId = "profile-1";
  const [currentIndex, setCurrentIndex] = useState(0);

  const profile = data.profiles.find((p) => p.id === profileId);
  const userAnswers = data.book_answers.filter(
    (a) => a.profile_id === profileId
  );
  const questions = data.book_questions;

  if (!profile) {
    return <div>Profile not found</div>;
  }

  if (userAnswers.length === 0) {
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <ProfileComponent profile={profile} />
        </div>
        <h2 className="text-xl font-semibold mb-4">
          {profile.name}님의 답변 목록
        </h2>
        <p>아직 작성된 답변이 없습니다.</p>
      </div>
    );
  }

  const currentAnswerData = userAnswers[currentIndex];
  const currentQuestion = questions.find(
    (q) => q.id === currentAnswerData.question_id
  );
  const currentMappedAnswer = {
    id: currentAnswerData.id,
    author: profile.name,
    date: currentAnswerData.date,
    content: currentAnswerData.answer_text,
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % userAnswers.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + userAnswers.length) % userAnswers.length
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto flex flex-col min-h-[calc(100vh-theme(spacing.16))]">
      <div className="mb-8">
        <ProfileComponent profile={profile} />
      </div>
      <h2 className="text-xl font-semibold mb-4">
        {profile.name}님의 답변 ({currentIndex + 1}/{userAnswers.length})
      </h2>
      <div className="flex-grow">
        <div className="border p-4 rounded-lg shadow-sm mb-6">
          {currentQuestion && (
            <div className="mb-4">
              <QuestionSimpleComponent questionId={currentQuestion.id} />
            </div>
          )}
          <AnswerComponent answers={[currentMappedAnswer]} />
        </div>
      </div>

      {userAnswers.length > 1 && (
        <div className="flex items-center justify-center gap-4 p-2 mt-auto">
          <button
            onClick={handlePrevious}
            className="px-3 py-1 bg-stone-200 border border-stone-300 rounded-md text-sm font-semibold text-gray-800 hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous Answer"
          >
            &lt;- 이전
          </button>

          <span className="px-3 py-1 text-sm text-stone-700">
            {currentIndex + 1} / {userAnswers.length}
          </span>

          <button
            onClick={handleNext}
            className="px-3 py-1 bg-stone-200 border border-stone-300 rounded-md text-sm font-semibold text-gray-800 hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next Answer"
          >
            다음 -&gt;
          </button>
        </div>
      )}
    </div>
  );
}
