"use client";

import { useState, useEffect } from "react";
import data from "@/data.json";
import ProfileComponent from "../../profile/page";
import AnswerComponent from "../page";
import QuestionSimpleComponent from "../../question/simple/page";

// Define interfaces for clarity (assuming these match data.json structure)
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
  date: string;
  profile_id: string;
}

interface Question {
  id: string;
  book_id: string;
  question_text: string;
  // Add question_context if relevant
}

interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string; // Assuming this field exists for the book cover image URL
  // Add other relevant book fields
}

export default function AnswerListPage() {
  // TODO: Get profileId from route params or props
  const profileId = "profile-1";

  const profile = data.profiles.find((p: Profile) => p.id === profileId);
  const userAnswers = data.book_answers.filter(
    (a: Answer) => a.profile_id === profileId
  );
  const questions = data.book_questions as Question[];
  const books = data.books as Book[];

  // Create a map for question_id -> book_id lookup
  const questionToBookMap = new Map<string, string>();
  questions.forEach((q) => questionToBookMap.set(q.id, q.book_id));

  // --- Find answered books (Moved Up) ---
  const answeredQuestionIds = new Set(userAnswers.map((a) => a.question_id));
  const answeredBookIds = new Set<string>();
  questions.forEach((q) => {
    if (answeredQuestionIds.has(q.id)) {
      answeredBookIds.add(q.book_id);
    }
  });
  const answeredBooks = books.filter((b) => answeredBookIds.has(b.id));
  // --- End Logic ---

  // Initialize states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(
    answeredBooks.length > 0 ? answeredBooks[0].id : null // Default to first answered book
  );

  // --- Filter answers based on selected book ---
  const filteredAnswers = selectedBookId
    ? userAnswers.filter(
        (a) => questionToBookMap.get(a.question_id) === selectedBookId
      )
    : []; // If no book is selected (only happens initially if no books are answered), show no answers.
  // --- End Filter Logic ---

  // --- Effect to reset index when filteredAnswers changes ---
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedBookId]); // Dependency array changed to selectedBookId
  // --- End Effect ---

  // --- Get selected book details for title ---
  const selectedBook = selectedBookId
    ? books.find((b) => b.id === selectedBookId)
    : null;
  // --- End Book Details ---

  if (!profile) {
    return <div>Profile not found</div>;
  }

  // Use filteredAnswers for display
  const currentAnswerData = filteredAnswers[currentIndex];
  const currentQuestion = currentAnswerData
    ? questions.find((q) => q.id === currentAnswerData.question_id)
    : undefined;
  const currentMappedAnswer =
    currentAnswerData && profile
      ? {
          id: currentAnswerData.id,
          author: profile.name,
          date: currentAnswerData.date,
          content: currentAnswerData.answer_text,
        }
      : undefined;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredAnswers.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredAnswers.length) % filteredAnswers.length
    );
  };

  const handleBookClick = (bookId: string) => {
    setSelectedBookId((prevId) => (prevId === bookId ? null : bookId)); // Toggle selection
    // setCurrentIndex(0); // Moved to useEffect
  };

  return (
    <div className="p-4 max-w-2xl mx-auto flex flex-col">
      {/* --- Section: Answered Books List (using actual data) --- */}
      {answeredBooks.length > 0 && (
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            {profile.name}님이 답변한 책 목록:
          </h3>
          <ul className="flex flex-nowrap gap-x-3 gap-y-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-stone-100">
            {answeredBooks.map((book) => (
              <li
                key={book.id} // Use original book id as key
                onClick={() => handleBookClick(book.id)}
                // Add visual feedback for selection and cursor
                className={`relative group bg-white border p-1 rounded-md shadow-sm flex-shrink-0 w-24 text-center overflow-hidden cursor-pointer transition-all duration-200 ease-in-out ${
                  selectedBookId === book.id
                    ? "border-blue-500 border-2 scale-105"
                    : "border-stone-200"
                }`}
              >
                {/* Image remains the same */}
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-32 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder-book.png";
                    (e.target as HTMLImageElement).classList.add("bg-gray-100");
                  }}
                />
                {/* Title on hover remains the same */}
                <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-1 text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out rounded-b-md">
                  {book.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* --- End Section --- */}

      {/* --- Display Area: Based on filteredAnswers --- */}
      {filteredAnswers.length > 0 && currentMappedAnswer && profile ? (
        <>
          {/* Update title based on selection */}
          <h2 className="text-xl font-semibold my-4">
            {selectedBook
              ? `${profile.name}님의 '${selectedBook.title}' 관련 답변 (${
                  currentIndex + 1
                }/${filteredAnswers.length})`
              : `${profile.name}님의 전체 답변 (${currentIndex + 1}/${
                  filteredAnswers.length
                })`}
          </h2>
          <div className="flex-grow">
            {currentQuestion && (
              <div className="mb-4">
                <QuestionSimpleComponent questionId={currentQuestion.id} />
              </div>
            )}
            <AnswerComponent answers={[currentMappedAnswer]} />
          </div>

          {/* Pagination - Show controls if there are answers, disable buttons if only one */}
          {filteredAnswers.length > 0 && ( // Show container if there's at least one answer
            <div className="flex items-center justify-center gap-x-4 p-2 mt-4">
              {/* Previous Button: Render but disable if only one answer */}
              <button
                onClick={handlePrevious}
                className="px-4 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Answer"
                disabled={filteredAnswers.length <= 1} // Disable if 1 or fewer answers
              >
                &lt;- 이전
              </button>

              {/* Page Count: Always show if there's at least one answer */}
              <span className="text-sm font-medium text-slate-800">
                {currentIndex + 1} / {filteredAnswers.length}
              </span>

              {/* Next Button: Render but disable if only one answer */}
              <button
                onClick={handleNext}
                className="px-4 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Answer"
                disabled={filteredAnswers.length <= 1} // Disable if 1 or fewer answers
              >
                다음 -&gt;
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 text-center text-gray-500">
          {selectedBookId ? (
            <p>
              '${selectedBook?.title || "선택된 책"}'에 대한 답변이 없습니다.
            </p>
          ) : (
            <p>아직 작성된 답변이 없습니다.</p>
          )}
          {/* Show message only if no books were answered at all */}
          {answeredBooks.length === 0 && <p>답변한 책도 아직 없습니다.</p>}
        </div>
      )}
    </div>
  );
}
