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

// No separate QuestionContextDisplay component needed for accordion style

// Define the props for the main component
interface QuestionListPageProps {
  params?: { [key: string]: string | string[] | undefined };
}

export default function QuestionListPage(props: QuestionListPageProps) {
  const bookId =
    (props.params?.bookId as string | undefined) ?? "book-vegetarian";

  const allQuestions: Question[] = data.book_questions;
  const filteredQuestions: Question[] = bookId
    ? allQuestions.filter((q) => q.book_id === bookId)
    : [];

  // State to track which question is expanded
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null
  );

  const handleQuestionClick = (questionId: string) => {
    setExpandedQuestionId((prevId) =>
      prevId === questionId ? null : questionId
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Question List (Accordion Style) */}
      <div className="w-full border border-gray-200 rounded-lg shadow-sm">
        {bookId ? (
          filteredQuestions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredQuestions.map((q: Question) => (
                <li key={q.id}>
                  {/* Question Header Button */}
                  <button
                    onClick={() => handleQuestionClick(q.id)}
                    className="block w-full text-left p-4 hover:bg-gray-50 focus:outline-none"
                  >
                    <p className="text-gray-800 font-medium">
                      {q.question_text}
                    </p>
                  </button>

                  {/* Expanded Content (Context and Actions) */}
                  {expandedQuestionId === q.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600 text-sm mb-4">
                        {q.question_context}
                      </p>
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
                  )}
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
    </div>
  );
}
