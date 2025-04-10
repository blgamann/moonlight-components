"use client";

import Answer from "@/app/(components)/answer/page";
import Book from "@/app/(components)/garden/book/page";
import QuestionSimple from "@/app/(components)/question/simple/page";
import { useState, useEffect } from "react";
import data from "@/data.json"; // Assuming data.json is at the root aliased by @

// Define interfaces for better type safety
interface BookType {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
}

interface QuestionType {
  id: string;
  book_id: string;
  question_text: string;
  question_context: string;
}

interface AnswerType {
  id: string;
  question_id: string;
  answer_text: string;
  date: string;
  profile_id: string; // We might need profile data later too
}

interface CombinedSet {
  book: BookType;
  question: QuestionType;
  answer: AnswerType;
}

export default function MatchingPage() {
  const [combinedSets, setCombinedSets] = useState<CombinedSet[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // RE-INTRODUCED: State and related types/functions for transforming single answer
  // Define the Answer type expected by the AnswerPage component
  // This might be better defined in a shared types file
  type AnswerComponentType = {
    id: string; // Changed from number to string to match Answer component expectation
    author: string;
    date: string;
    content: React.ReactNode;
  };
  const [currentAnswerForChild, setCurrentAnswerForChild] = useState<
    AnswerComponentType[] | null
  >(null);

  useEffect(() => {
    const booksMap = new Map(data.books.map((book) => [book.id, book]));
    const questionsMap = new Map(data.book_questions.map((q) => [q.id, q]));
    // RE-INTRODUCED: profilesMap needed for answer transformation
    const profilesMap = new Map(data.profiles.map((p) => [p.id, p.name])); // Map profiles for easy lookup
    // Create a map for answers based on question_id for efficient lookup
    const answersMap = new Map(
      data.book_answers.map((answer) => [answer.question_id, answer])
    );

    const sets: CombinedSet[] = [];
    // Iterate through questions in their original order from data.json
    data.book_questions.forEach((question) => {
      const book = booksMap.get(question.book_id);
      const answer = answersMap.get(question.id); // Find the answer for this question

      // Only add the set if we have the book AND an answer for the question
      if (book && answer) {
        sets.push({ book, question, answer });
      }
    });

    setCombinedSets(sets);
    // RE-INTRODUCED: Logic to set initial answer for child
    // Set initial answer for the child component after sets are loaded
    if (sets.length > 0) {
      updateCurrentAnswerForChild(sets[0].answer, profilesMap);
    }
  }, []);

  // RE-INTRODUCED: Effect and helper function to update/transform single answer
  // Update the formatted answer whenever the index changes
  useEffect(() => {
    if (combinedSets.length > 0) {
      // Ensure profilesMap is available or recreate it if needed
      const profilesMap = new Map(data.profiles.map((p) => [p.id, p.name]));
      updateCurrentAnswerForChild(
        combinedSets[currentIndex].answer,
        profilesMap
      );
    }
    // Reset if no sets or index is out of bounds (optional, defensive)
    else {
      setCurrentAnswerForChild(null);
    }
  }, [currentIndex, combinedSets]); // Add combinedSets to dependencies

  // Helper function to transform AnswerType to AnswerComponentType
  const updateCurrentAnswerForChild = (
    answerData: AnswerType,
    profilesMap: Map<string, string>
  ) => {
    const authorName = profilesMap.get(answerData.profile_id) || "익명";
    const transformedAnswer: AnswerComponentType = {
      // Using a simple index or potentially the answer's own ID if stable and numeric
      // Using Date.now() as placeholder - review AnswerPage's ID expectation
      id: answerData.id, // Use the actual answer ID (string)
      author: authorName,
      date: answerData.date,
      content: (
        <p className="mt-2 text-gray-700 leading-relaxed">
          {answerData.answer_text}
        </p>
      ),
    };
    setCurrentAnswerForChild([transformedAnswer]); // Pass as an array
  };

  const handleNext = () => {
    if (combinedSets.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % combinedSets.length);
    }
  };

  // Function to handle going to the previous set
  const handlePrevious = () => {
    if (combinedSets.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? combinedSets.length - 1 : prevIndex - 1
      );
    }
  };

  const currentSet = combinedSets[currentIndex];

  return (
    <div className="flex flex-col h-screen mx-auto max-w-2xl px-4 py-8">
      {/* Check if both the current set and the transformed answer exist before rendering */}
      {currentSet && currentAnswerForChild ? (
        <>
          <div className="mx-4 mb-6">
            {/* Pass book object directly */}
            <Book {...currentSet.book} />
          </div>
          <div className="mb-6">
            {/* Pass questionId */}
            <QuestionSimple questionId={currentSet.question.id} />
          </div>
          <div className="mb-8">
            {/* Pass the transformed answer array */}
            <Answer answers={currentAnswerForChild} />
          </div>
          {/* Navigation Controls Container - Moved from Answer component */}
          {/* Moved Navigation Controls Up and removed mt-auto */}
          <div className="flex items-center justify-center gap-4 p-2 mt-8">
            {/* Previous Button - Styles from Answer component */}
            <button
              onClick={handlePrevious}
              // Apply styles from Answer component
              className="px-3 py-1 bg-stone-200 border border-stone-300 rounded-md text-sm font-semibold text-gray-800 hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous Set"
              // Disable button if only one set exists
              disabled={combinedSets.length <= 1}
            >
              &lt;- 이전
            </button>

            {/* Index Display - Styles from Answer component */}
            <span className="px-3 py-1 text-sm text-stone-700">
              {/* Display 0 if no sets, otherwise current index + 1 */}
              {combinedSets.length === 0 ? 0 : currentIndex + 1} /{" "}
              {combinedSets.length}
            </span>

            {/* Next Button - Styles from Answer component */}
            <button
              onClick={handleNext}
              // Apply styles from Answer component
              className="px-3 py-1 bg-stone-200 border border-stone-300 rounded-md text-sm font-semibold text-gray-800 hover:bg-stone-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next Set"
              // Disable button if only one set exists
              disabled={combinedSets.length <= 1}
            >
              다음 -&gt;
            </button>
          </div>
        </>
      ) : (
        <p>Loading data...</p> // Show loading or placeholder
      )}
    </div>
  );
}
