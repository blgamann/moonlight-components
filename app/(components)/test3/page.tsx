"use client";

import React, { useState } from "react";
import data from "../../../data.json"; // Corrected import path

// Define the Question type based on data.json
type Question = {
  id: string;
  book_id: string;
  question_text: string;
  question_context: string;
};

// Define the props for the main component
interface QuestionListPageProps {
  params?: { [key: string]: string | string[] | undefined };
}

// Modal Component for displaying question details
interface QuestionDetailModalProps {
  question: Question;
  onClose: () => void;
}

const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  question,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close modal"
        >
          &times; {/* Unicode multiplication sign for 'X' */}
        </button>

        {/* Question and Context */}
        <div className="mb-6">
          <p className="text-gray-800 text-xl font-semibold mb-3">
            {question.question_text}
          </p>
          <p className="text-gray-600 text-sm">{question.question_context}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out">
            답변하기
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-150 ease-in-out">
            답변보기
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-150 ease-in-out">
            공유하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default function QuestionListPage(props: QuestionListPageProps) {
  const bookId =
    (props.params?.bookId as string | undefined) ?? "book-vegetarian";

  const allQuestions: Question[] = data.book_questions;
  const filteredQuestions: Question[] = bookId
    ? allQuestions.filter((q) => q.book_id === bookId)
    : [];

  // State to hold the question currently shown in the modal
  const [modalQuestion, setModalQuestion] = useState<Question | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Question List */}
      <div className="w-full border border-gray-200 rounded-lg shadow-sm p-2 mb-6">
        {bookId ? (
          filteredQuestions.length > 0 ? (
            <ul className="space-y-3">
              {filteredQuestions.map((q: Question) => (
                <li key={q.id}>
                  <button
                    onClick={() => setModalQuestion(q)} // Set the question to open in modal
                    className="block w-full text-left p-4 border rounded-md transition duration-150 ease-in-out cursor-pointer border-gray-200 hover:bg-gray-100"
                  >
                    <p className="text-gray-800 font-medium">
                      {q.question_text}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 p-4">해당 책에 대한 질문이 없습니다.</p>
          )
        ) : (
          <p className="text-gray-500 p-4">
            표시할 책을 선택해주세요. (URL에 bookId가 필요합니다)
          </p>
        )}
      </div>

      {/* Conditionally render the modal */}
      {modalQuestion && (
        <QuestionDetailModal
          question={modalQuestion}
          onClose={() => setModalQuestion(null)} // Close modal by clearing the state
        />
      )}
    </div>
  );
}
