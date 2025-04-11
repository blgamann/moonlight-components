"use client";

import { useState } from "react";
import data from "@/data.json"; // Adjusted import path

// Interfaces (similar to resonance/page.tsx)
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

// Interface for Books (assuming structure)
interface Book {
  id: string;
  title: string;
  author: string; // Add other relevant fields if needed
  imageUrl: string;
}

// Interface for Questions (Updated)
interface Question {
  id: string;
  book_id: string; // Changed from book_title
  question_text: string;
  // Add question_context if needed
}

export default function ResonanceListPage() {
  // --- Data Loading & Initial Setup --- //
  const targetProfile: Profile | undefined = data.profiles.find(
    (p: Profile) => p.name === "이서연"
  );
  const questions = data.book_questions as Question[];
  const books = data.books as Book[];
  const allAnswers = data.book_answers as Answer[];
  const allProfiles = data.profiles as Profile[];

  // Need questionToBookMap early for simulation
  const questionToBookMap = new Map<string, string>();
  questions.forEach((q) => questionToBookMap.set(q.id, q.book_id));

  // --- Simulate Resonance Data --- //
  const otherAnswers = allAnswers.filter(
    (a) => a.profile_id !== targetProfile?.id
  ); // Added safe check
  const answersByBook = new Map<string, Answer[]>();
  otherAnswers.forEach((answer) => {
    const bookId = questionToBookMap.get(answer.question_id);
    if (bookId) {
      if (!answersByBook.has(bookId)) {
        answersByBook.set(bookId, []);
      }
      answersByBook.get(bookId)?.push(answer);
    }
  });
  let simulatedResonances: Answer[] = [];
  answersByBook.forEach((bookAnswers) => {
    simulatedResonances.push(...bookAnswers.slice(0, 2));
  });
  const resonanceAnswers = simulatedResonances.sort(
    (a: Answer, b: Answer) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  // --- End Simulation Logic ---

  // --- Calculate Resonated Books (based on simulated data) --- //
  const resonatedBookIds = new Set<string>();
  resonanceAnswers.forEach((answer) => {
    const bookId = questionToBookMap.get(answer.question_id);
    if (bookId) {
      resonatedBookIds.add(bookId);
    }
  });
  const resonatedBooks = books.filter((b) => resonatedBookIds.has(b.id));
  // --- End Resonated Books Calculation ---

  // --- Calculate initial selected book ID --- //
  const initialSelectedBookId =
    resonatedBooks.length > 0 ? resonatedBooks[0].id : null;

  // --- Initialize State --- //
  const [selectedBookId, setSelectedBookId] = useState<string | null>(
    initialSelectedBookId
  );
  const [currentResonanceIndex, setCurrentResonanceIndex] = useState(0); // State for pagination

  // --- Create Look-up Maps (after state init) --- //
  const questionsMap = new Map<string, Question>();
  questions.forEach((q: Question) => questionsMap.set(q.id, q));
  const booksMap = new Map<string, Book>();
  books.forEach((b: Book) => booksMap.set(b.id, b));
  const profilesMap = new Map<string, Profile>();
  allProfiles.forEach((p: Profile) => profilesMap.set(p.id, p));

  // --- Filter Resonances based on State --- //
  const filteredResonances = selectedBookId
    ? resonanceAnswers.filter(
        (a) => questionToBookMap.get(a.question_id) === selectedBookId
      )
    : resonanceAnswers;

  const selectedBook = selectedBookId ? booksMap.get(selectedBookId) : null;

  // --- Get the current resonance to display --- //
  const currentResonance = filteredResonances[currentResonanceIndex];

  // --- Event Handlers --- //
  const handleDateClick = (answer: Answer) => {
    console.log(`Navigate to details for answer from date: ${answer.date}`);
    // Replace console.log with actual navigation logic if needed
    // e.g., router.push(`/answers/${answer.id}`);
  };

  const handleAuthorClick = (authorProfileId: string | undefined) => {
    console.log(`Navigate to profile: ${authorProfileId}`);
    // Replace console.log with actual navigation logic if needed
    // e.g., router.push(`/profiles/${authorProfileId}`);
  };

  const handleQuestionClick = (questionId: string) => {
    console.log(`Navigate to question details: ${questionId}`);
    // Replace console.log with actual navigation logic if needed
    // e.g., router.push(`/questions/${questionId}`);
  };

  const handleBookClick = (bookId: string) => {
    setSelectedBookId((prevId) => (prevId === bookId ? null : bookId));
    setCurrentResonanceIndex(0); // Reset index when book changes
  };

  // --- Pagination Handlers --- //
  const handleNextResonance = () => {
    setCurrentResonanceIndex(
      (prevIndex) => (prevIndex + 1) % filteredResonances.length
    );
  };

  const handlePreviousResonance = () => {
    setCurrentResonanceIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredResonances.length) % filteredResonances.length
    );
  };

  // --- Render Logic --- //
  if (!targetProfile) {
    return <div className="p-4">대상 프로필을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto flex flex-col">
      {/* Combined Title and Book List Area */}
      <div className="mb-6 pb-4 border-b">
        <h1 className="text-2xl font-bold mb-6">
          {targetProfile.name}님의 공명 목록
        </h1>
        {/* --- Section: Resonated Books List --- */}
        {resonatedBooks.length > 0 && (
          <div className="">
            {/* Title for book list is optional now or could be smaller */}
            {/* <h3 className="text-lg font-semibold mb-3 text-gray-700">{targetProfile.name}님이 공명한 책 목록:</h3> */}
            <ul className="flex flex-nowrap gap-x-3 gap-y-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-stone-100">
              {resonatedBooks.map((book) => (
                <li
                  key={book.id}
                  onClick={() => handleBookClick(book.id)}
                  className={`relative group bg-white border p-1 rounded-md shadow-sm flex-shrink-0 w-24 text-center overflow-hidden cursor-pointer transition-all duration-200 ease-in-out ${
                    selectedBookId === book.id
                      ? "border-blue-500 border-2 scale-105"
                      : "border-stone-200"
                  }`}
                >
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-32 object-cover rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder-book.png";
                      (e.target as HTMLImageElement).classList.add(
                        "bg-gray-100"
                      );
                    }}
                  />
                  <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-1 text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out rounded-b-md">
                    {book.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* --- Display Area: Single Resonance Card + Pagination --- */}
      <div className="flex-grow flex flex-col">
        {selectedBook && (
          <h2 className="text-xl font-semibold mb-4">
            '{selectedBook.title}' 관련 공명 ({currentResonanceIndex + 1}/
            {filteredResonances.length})
          </h2>
        )}
        {!selectedBook && filteredResonances.length > 0 && (
          <h2 className="text-xl font-semibold mb-4 text-center">
            전체 공명 ({currentResonanceIndex + 1}/{filteredResonances.length})
          </h2>
        )}

        {filteredResonances.length > 0 && currentResonance ? (
          <div className="flex-grow mb-4">
            {(() => {
              const answer = currentResonance;
              const question = questionsMap.get(answer.question_id);
              const book = question
                ? booksMap.get(question.book_id)
                : undefined;
              const author = profilesMap.get(answer.profile_id);
              return (
                <div
                  key={answer.id}
                  className="bg-white shadow-md rounded-lg p-6 h-full"
                >
                  {question && (
                    <div
                      className="mb-4 p-3 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleQuestionClick(question.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleQuestionClick(question.id)
                      }
                    >
                      <p className="text-sm font-semibold text-gray-700">
                        {book ? book.title : `Book ID: ${question.book_id}`}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {question.question_text}
                      </p>
                    </div>
                  )}
                  <div className="mb-6 prose max-w-none">
                    <p>{answer.answer_text}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-6">
                    <p
                      className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors hover:underline"
                      onClick={() => handleDateClick(answer)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleDateClick(answer)
                      }
                    >
                      {answer.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span
                        className="cursor-pointer hover:underline"
                        onClick={() => handleAuthorClick(author?.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleAuthorClick(author?.id)
                        }
                      >
                        {author?.name || "Unknown Author"}
                      </span>
                    </p>
                  </div>
                  <div className="relative w-full mt-4 py-3 px-4 bg-white text-gray-600 border border-gray-300 font-semibold rounded-lg shadow-md text-center text-sm">
                    {answer.date}에 공명함
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-center text-gray-500 mt-6">
              {selectedBookId
                ? `'${
                    selectedBook?.title || "선택된 책"
                  }'에 대한 공명이 없습니다.`
                : `${targetProfile.name}님의 공명한 답변이 없습니다.`}
              {resonatedBooks.length === 0 && <p>공명한 책도 아직 없습니다.</p>}
            </p>
          </div>
        )}

        {/* --- Pagination Controls --- */}
        {filteredResonances.length > 1 && (
          <div className="flex items-center justify-center gap-4 p-2 mt-auto flex-nowrap">
            <button
              onClick={handlePreviousResonance}
              className="px-3 py-1 bg-stone-200 border border-stone-300 rounded-md text-sm font-semibold text-gray-800 hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous Resonance"
              disabled={filteredResonances.length <= 1}
            >
              &lt;- 이전
            </button>

            <span className="px-3 py-1 text-sm text-stone-700">
              {currentResonanceIndex + 1} / {filteredResonances.length}
            </span>

            <button
              onClick={handleNextResonance}
              className="px-3 py-1 bg-stone-200 border border-stone-300 rounded-md text-sm font-semibold text-gray-800 hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next Resonance"
              disabled={filteredResonances.length <= 1}
            >
              다음 -&gt;
            </button>
          </div>
        )}
        {/* --- End Pagination Controls --- */}
      </div>
    </div>
  );
}
