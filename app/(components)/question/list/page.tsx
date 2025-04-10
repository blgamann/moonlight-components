"use client"; // Add this directive for using state

import React, { useState } from "react";
import data from "../../../../data.json"; // Corrected import path for fallback

// Define the Question type based on data.json
type Question = {
  id: string;
  book_id: string; // Added to match data.json
  question_text: string; // Renamed from 'text' to match data.json
  question_context: string; // Added to match data.json
  // Remove user and timestamp as they are not in book_questions
  // user: string;
  // timestamp: string;
  // context: string; // Context is handled separately
};

// Define the QuestionContextDisplayProps based on how it's used below
interface QuestionContextDisplayProps {
  questionText: string; // Kept as is, will pass question_text to it
  context: string;
}

const QuestionContextDisplay: React.FC<QuestionContextDisplayProps> = ({
  questionText,
  context,
}) => {
  return (
    <div className="w-full p-4">
      <div className="border border-gray-300 p-6 rounded-lg shadow-sm h-full flex flex-col">
        {/* Question and Context */}
        <div className="flex-grow">
          <p className="text-gray-800 text-lg font-semibold mb-3">
            {questionText}
          </p>
          <p className="text-gray-600 text-sm">{context}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
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

// Define the props for the main component, including potential page props
interface QuestionListPageProps {
  questions?: Question[]; // Make questions prop optional
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// The main page component, now accepts potentially combined props
export default function QuestionListPage(props: QuestionListPageProps) {
  // Extract bookId from params, using "book-vegetarian" as default
  const bookId =
    (props.params?.bookId as string | undefined) ?? "book-vegetarian";

  // Filter questions based on bookId
  const allQuestions: Question[] = data.book_questions;
  const filteredQuestions: Question[] = bookId
    ? allQuestions.filter((q) => q.book_id === bookId)
    : []; // Show no questions if no bookId is present

  // Check if props contain the 'questions' array (e.g., passed from getServerSideProps), otherwise use filtered data
  const questionsToDisplay: Question[] =
    props && props.questions ? props.questions : filteredQuestions;

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null
  );

  // Find the selected question from the displayed list
  const selectedQuestion = questionsToDisplay.find(
    (q: Question) => q.id === selectedQuestionId
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Question List */}
      <div className="w-full border border-gray-200 rounded-lg shadow-sm p-2 mb-6 max-h-96 overflow-y-auto">
        {bookId ? (
          questionsToDisplay.length > 0 ? (
            <ul className="space-y-3">
              {questionsToDisplay.map((q: Question) => (
                <li key={q.id}>
                  <button
                    onClick={() => setSelectedQuestionId(q.id)}
                    className={`block w-full text-left p-4 border rounded-md transition duration-150 ease-in-out cursor-pointer ${
                      selectedQuestionId === q.id
                        ? "bg-blue-50 border-blue-500"
                        : "border-gray-200 hover:bg-blue-50"
                    }`}
                  >
                    {/* Use 'question_text' field from Question type */}
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

      {/* Selected Question Details */}
      <div className="w-full">
        {selectedQuestion ? (
          <QuestionContextDisplay
            questionText={selectedQuestion.question_text} // Pass 'question_text' as questionText
            // Use placeholder context for now
            context={selectedQuestion.question_context} // Use actual context
          />
        ) : (
          <div className="flex items-center justify-center h-48 border border-gray-200 rounded-lg shadow-sm p-6">
            <p className="text-gray-500">질문을 선택해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
