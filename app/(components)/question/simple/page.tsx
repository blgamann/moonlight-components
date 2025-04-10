import React from "react";
import data from "@/data.json"; // Import the data

// Define the component directly in the page file
interface QuestionContextDisplayProps {
  question: string;
  context: string;
}

const QuestionContextDisplay: React.FC<QuestionContextDisplayProps> = ({
  question,
  context,
}) => {
  return (
    // Constrain width, center, and add padding
    <div className="max-w-2xl mx-auto p-4">
      {/* Single container with updated styling */}
      <div className="border border-gray-300 p-6 rounded-lg shadow-sm">
        {/* Question Text - left-aligned */}
        <p className="text-gray-800 text-lg font-semibold mb-3">{question}</p>
        {/* Context Text - left-aligned */}
        <p className="text-gray-600 text-sm">{context}</p>
      </div>
    </div>
  );
};

// Define props interface for the page component
interface QuestionSimplePageProps {
  questionId?: string;
}

// The page component, now accepting props
export default function QuestionSimplePage({
  questionId,
}: QuestionSimplePageProps) {
  // Use provided questionId or default to 'q-veg-1'
  const targetQuestionId = questionId || "q-veg-1";

  // Find the question data based on targetQuestionId
  const questionData = data.book_questions.find(
    (q) => q.id === targetQuestionId
  );
  // Find the corresponding answer/context based on targetQuestionId
  /*
  const answerData = data.book_answers.find(
    (a) => a.question_id === targetQuestionId
  );
  */

  const sampleQuestion = questionData
    ? questionData.question_text
    : "질문을 찾을 수 없습니다."; // Fallback question text
  // Use question_context from questionData for the context
  const sampleContext = questionData
    ? questionData.question_context
    : "컨텍스트를 찾을 수 없습니다."; // Fallback context text

  return (
    <QuestionContextDisplay question={sampleQuestion} context={sampleContext} />
  );
}
