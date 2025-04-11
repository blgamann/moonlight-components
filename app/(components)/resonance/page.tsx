"use client";

import data from "../../../data.json";

// Define simple interfaces based on data.json structure
interface Profile {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
}

interface Answer {
  id: string;
  question_id: string;
  answer_text: string;
  date: string; // Assuming format is YYYY-MM-DD or similar sortable format
  profile_id: string;
}

export default function ResonancePage() {
  // Find 이서연's profile ID
  const seoyeonProfile: Profile | undefined = data.profiles.find(
    (p: Profile) => p.name === "이서연"
  );
  if (!seoyeonProfile) {
    return <div className="p-4">이서연 프로필을 찾을 수 없습니다.</div>;
  }

  // Filter answers by 이서연's profile ID and find the latest one
  const seoyeonAnswers: Answer[] = data.book_answers
    .filter((answer: Answer) => answer.profile_id === seoyeonProfile.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

  const latestAnswer: Answer | undefined = seoyeonAnswers[0]; // Get the most recent answer

  // Placeholder click handlers similar to answer/page.tsx
  const handleDateClick = () => {
    if (!latestAnswer) return;
    alert(`${latestAnswer.date} 답변의 상세 페이지로 이동합니다.`);
  };

  const handleAuthorClick = () => {
    if (!seoyeonProfile) return;
    alert(`${seoyeonProfile.name}님의 프로필로 이동합니다.`);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {latestAnswer ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Answer Content */}
          <div className="mb-6 prose">
            {" "}
            {/* Added prose for better text formatting */}
            <p>{latestAnswer.answer_text}</p>
          </div>
          {/* Meta Info */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-6">
            <p
              className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors hover:underline"
              onClick={handleDateClick}
            >
              {latestAnswer.date}
            </p>
            <p className="text-sm text-gray-500">
              <span
                className="cursor-pointer hover:underline"
                onClick={handleAuthorClick}
              >
                {seoyeonProfile.name}
              </span>
            </p>
          </div>
          {/* Static Resonance Date Indicator - Styled like the button */}
          <div className="relative w-full mt-4 py-3 px-4 bg-white text-gray-600 border border-gray-300 font-semibold rounded-lg shadow-md text-center text-sm">
            {latestAnswer.date}에 공명함
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          이서연님의 공명한 답변이 없습니다.
        </p>
      )}
    </div>
  );
}
