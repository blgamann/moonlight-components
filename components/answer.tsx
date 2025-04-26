import React from "react";
import { BookMdQuestion } from "./book";

interface AnswerSimpleProps {
  answer: {
    title: string;
    answer_text: string;
  };
  formattedDate: string;
}

const AnswerSimple: React.FC<AnswerSimpleProps> = ({
  answer,
  formattedDate,
}) => {
  return (
    <>
      <h2 className="text-4xl font-semibold text-white/95 mb-8">
        {answer.title}
      </h2>
      <p className="text-xl text-white/95 mb-4 leading-relaxed whitespace-pre-line">
        {answer.answer_text}
      </p>

      <div className="flex justify-between items-center ml-[-4px]">
        {/* Left: Favorite Button with Tooltip */}
        <div className="relative"></div>

        {/* Right: Date */}
        <p className="text-base text-white/60">{formattedDate}</p>
      </div>
    </>
  );
};

interface AnswerProps {
  answer: {
    title: string;
    answer_text: string;
  };
  book: {
    imageUrl: string;
    title: string;
    altText?: string;
  };
  questionText: string;
  formattedDate: string;
}

const Answer: React.FC<AnswerProps> = ({
  answer,
  book,
  questionText,
  formattedDate,
}) => {
  return (
    <>
      <h2 className="text-4xl font-semibold text-white/95 mb-6">
        {answer.title}
      </h2>

      <BookMdQuestion
        imageUrl={book.imageUrl}
        title={book.title}
        question={questionText}
        altText={book.altText}
      />

      <p className="text-xl text-white/95 mt-6 mb-4 leading-relaxed whitespace-pre-line">
        {answer.answer_text}
      </p>

      <div className="flex justify-between items-center ml-[-4px]">
        <div className="relative"></div>

        <p className="text-base text-white/60">{formattedDate}</p>
      </div>
    </>
  );
};

export default AnswerSimple;

export { Answer };
