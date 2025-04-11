"use client";

import React, { useState, useEffect, useMemo } from "react";
import Masonry from "react-masonry-css";
import data from "../../../../data.json"; // Adjust import path relative to the new location
// Import the refactored AnswerPage component and its Answer type
import AnswerPage, { Answer as AnswerPropType } from "../page";

// Define the Answer type based on data.json (corrected fields)
type Answer = {
  id: string;
  profile_id: string; // Corrected from user_id
  question_id: string;
  answer_text: string;
  date: string; // Corrected from created_at
};

// Define the Question type for lookup
type Question = {
  id: string;
  book_id: string;
  question_text: string;
  question_context: string;
};

// Define the Resonance type
type Resonance = {
  id: string;
  profile_id: string;
  answer_id: string;
  date?: string; // Optional date
};

// Define local resonance state type
interface LocalResonance extends Resonance {}

// Define the props for the main component (optional, as bookId is fixed)
interface AnswerListPageProps {}

// Helper function to find profile name by ID (moved here)
const getAuthorName = (profileId: string): string => {
  const profile = data.profiles.find((p) => p.id === profileId);
  return profile ? profile.name : "Unknown Author";
};

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

export default function AnswerListPage(props: AnswerListPageProps) {
  const bookId = "book-seonghak"; // Corrected book ID for '성학십도'

  const allQuestions: Question[] = data.book_questions as Question[];
  const allAnswers: Answer[] = data.book_answers as Answer[];
  // Use useState for resonances to make them updateable
  const [localResonances, setLocalResonances] = useState<LocalResonance[]>(
    data.resonances as LocalResonance[]
  ); // Initialize with data

  const bookQuestions = allQuestions.filter((q) => q.book_id === bookId);
  const selectedQuestion: Question | undefined = bookQuestions[0];

  const selectedQuestionId = selectedQuestion?.id ?? "";

  const filteredAnswers: Answer[] = useMemo(() => {
    if (!selectedQuestionId) return [];
    return allAnswers.filter((a) => a.question_id === selectedQuestionId);
  }, [allAnswers, selectedQuestionId]);

  // Memoize both the set of resonated IDs and a map of ID to resonance date
  const { resonatedAnswerIds, resonatedDatesMap } = useMemo(() => {
    const filteredAnswerIds = new Set(filteredAnswers.map((a) => a.id));
    const ids = new Set<string>();
    const dates = new Map<string, string>();
    localResonances.forEach((r) => {
      if (filteredAnswerIds.has(r.answer_id)) {
        ids.add(r.answer_id);
        if (r.date) {
          dates.set(r.answer_id, r.date); // Store date if available
        }
      }
    });
    return { resonatedAnswerIds: ids, resonatedDatesMap: dates };
  }, [filteredAnswers, localResonances]); // Depend on localResonances state

  // Calculate and shuffle displayed answers ONCE using useMemo, based only on filteredAnswers
  const displayedAnswers = useMemo(() => {
    if (filteredAnswers.length === 0) {
      return [];
    }

    // Determine initial resonated/non-resonated based on the original data
    // This ensures the initial 20% selection logic is stable
    const initialResonatedIds = new Set(
      (data.resonances as Resonance[]).map((r) => r.answer_id)
    );

    const resonatedAnswers = filteredAnswers.filter((a) =>
      initialResonatedIds.has(a.id)
    );
    const nonResonatedAnswers = filteredAnswers.filter(
      (a) => !initialResonatedIds.has(a.id)
    );

    const totalAnswers = filteredAnswers.length;
    // Apply the selection logic based on counts derived from initial state
    const targetResonatedCount = Math.min(
      Math.round(totalAnswers * 0.2),
      resonatedAnswers.length // Count based on initial state
    );
    // Calculate non-resonated count based on the target resonated count
    const targetNonResonatedCount = Math.min(
      totalAnswers - targetResonatedCount,
      nonResonatedAnswers.length // Count based on initial state
    );

    let selectedResonated = resonatedAnswers.slice(0, targetResonatedCount);
    let selectedNonResonated = nonResonatedAnswers.slice(
      0,
      targetNonResonatedCount
    );

    // Combine and fill remaining slots if necessary, maintaining original selection logic structure
    let combinedSelected = [...selectedNonResonated, ...selectedResonated];
    const currentTotalSelected = combinedSelected.length; // Use combinedSelected.length directly
    const remainingNeeded = totalAnswers - currentTotalSelected;

    if (remainingNeeded > 0) {
      // Available answers beyond the initial selection
      const availableNonResonated = nonResonatedAnswers.slice(
        selectedNonResonated.length
      );
      const availableResonated = resonatedAnswers.slice(
        selectedResonated.length
      );

      // Prioritize adding remaining non-resonated
      const addNonRes = Math.min(remainingNeeded, availableNonResonated.length);
      if (addNonRes > 0) {
        combinedSelected.push(...availableNonResonated.slice(0, addNonRes));
      }

      // Add remaining resonated if still needed
      const stillNeeded = totalAnswers - combinedSelected.length; // Recalculate needed amount
      if (stillNeeded > 0) {
        const addRes = Math.min(stillNeeded, availableResonated.length);
        if (addRes > 0) {
          combinedSelected.push(...availableResonated.slice(0, addRes));
        }
      }
    }

    // Shuffle the final selected list just once
    return shuffleArray(combinedSelected);
  }, [filteredAnswers]); // This useMemo depends ONLY on filteredAnswers

  // Function to handle resonance event from child component
  const handleResonate = (answerId: string, date: string) => {
    setLocalResonances((prevResonances) => {
      // Avoid adding duplicate resonance for the same answer
      if (prevResonances.some((r) => r.answer_id === answerId)) {
        return prevResonances;
      }
      // Simulate adding a new resonance record (replace with actual API call/state management)
      const newResonance: LocalResonance = {
        // Generate a temporary unique ID (replace with actual ID generation)
        id: `res-${Date.now()}-${Math.random()}`,
        profile_id: "profile-currentUser", // Placeholder for current user ID
        answer_id: answerId,
        date: date,
      };
      return [...prevResonances, newResonance];
    });
  };

  // Create a map for quick question lookup by ID (Optional: might not be needed anymore if only showing one question's answers)
  // const questionMap = new Map<string, Question>();
  // allQuestions.forEach((q) => questionMap.set(q.id, q));

  // Breakpoint configuration for Masonry columns
  const breakpointColumnsObj = {
    default: 3, // Default number of columns
    1100: 2, // 2 columns for screens >= 1100px
    700: 1, // 1 column for screens >= 700px
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2 px-1 text-gray-800">
        {/* Display the selected question's text */}
        질문: "{selectedQuestion?.question_text}"
      </h1>
      {/* Display the question context below the question text */}
      <p className="text-md mb-4 px-1 text-gray-600">
        {selectedQuestion?.question_context}
      </p>
      {displayedAnswers.length > 0 ? ( // Use displayedAnswers state
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex w-auto -ml-4" // flex container, negative margin to offset column padding
          columnClassName="my-masonry-grid_column pl-4 bg-clip-padding" // padding for spacing between columns
        >
          {/* Map over the stable, shuffled 'displayedAnswers' */}
          {displayedAnswers.map((answer: Answer) => {
            // These values update based on localResonances state changes via useMemo
            const isResonated = resonatedAnswerIds.has(answer.id);
            const resonanceDate = resonatedDatesMap.get(answer.id);

            const answerProps: AnswerPropType = {
              id: answer.id,
              author: getAuthorName(answer.profile_id),
              date: answer.date,
              content: answer.answer_text,
              isResonated: isResonated,
              resonanceDate: resonanceDate, // Pass the date
            };
            return (
              // Add a wrapper div with bottom margin for vertical spacing
              <div key={answer.id} className="mb-14">
                {/* Pass props including onResonate callback */}
                <AnswerPage answer={answerProps} onResonate={handleResonate} />
              </div>
            );
          })}
        </Masonry>
      ) : (
        <p className="text-gray-500 p-4 text-center">
          이 질문에 대한 답변이 아직 없습니다.
        </p>
      )}
    </div>
  );
}
