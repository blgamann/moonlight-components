"use client";

import React, { useState } from "react";
import Masonry from "react-masonry-css";
import data from "../../../data.json"; // Corrected import path

// Define the Question type based on data.json
type Question = {
  id: string;
  book_id: string;
  question_text: string;
  question_context: string; // Keep context for potential height variation
  answer_count?: number; // Add answer count field (optional for now)
};

// Define the props for the main component
interface QuestionListPageProps {
  params?: { [key: string]: string | string[] | undefined };
  bookId?: string; // Add optional bookId prop
}

export default function QuestionListPage(props: QuestionListPageProps) {
  // Prioritize direct bookId prop, then params, then default
  const bookId =
    props.bookId ??
    (props.params?.bookId as string | undefined) ??
    "book-vegetarian";

  const allQuestions: Question[] = data.book_questions;
  const filteredQuestions: Question[] = bookId
    ? allQuestions.filter((q) => q.book_id === bookId)
    : [];

  // Breakpoint configuration for Masonry columns
  const breakpointColumnsObj = {
    default: 3, // Default number of columns
    1100: 2, // 2 columns for screens >= 1100px
    700: 1, // 1 column for screens >= 700px
  };

  // Optional: State for modal if we want to show details on click
  // const [modalQuestion, setModalQuestion] = useState<Question | null>(null);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {bookId ? (
        filteredQuestions.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid flex w-auto -ml-4" // flex container, negative margin to offset column padding
            columnClassName="my-masonry-grid_column pl-4 bg-clip-padding" // padding for spacing between columns
          >
            {/* Array of JSX items */}
            {filteredQuestions.map((q: Question) => (
              <div
                key={q.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col"
              >
                {/* Question Text */}
                <p className="text-gray-800 font-medium mb-2">
                  {q.question_text}
                </p>
                {/* Question Context */}
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {q.question_context}
                </p>
                {/* Bottom container for count and buttons */}
                <div className="mt-auto flex justify-between items-center">
                  {/* Answer Count */}
                  <p className="text-gray-500 text-xs">
                    총 답변: {q.answer_count || 0}개
                  </p>
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out">
                      답변하기
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-150 ease-in-out">
                      답변보기
                    </button>
                    <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition duration-150 ease-in-out">
                      공유하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        ) : (
          <p className="text-gray-500 p-4 text-center">
            해당 책에 대한 질문이 없습니다.
          </p>
        )
      ) : (
        <p className="text-gray-500 p-4 text-center">
          표시할 책을 선택해주세요. (URL에 bookId가 필요합니다)
        </p>
      )}

      {/* Optional: Modal rendering (if using onClick) */}
      {/* {modalQuestion && (
        <QuestionDetailModal
          question={modalQuestion}
          onClose={() => setModalQuestion(null)}
        />
      )} */}
    </div>
  );
}

// Note: You might need to define the QuestionDetailModal component again
// if you choose to implement the modal functionality by uncommenting the lines above.
// You can copy it from app/test3/page.tsx
