import Image from "next/image";
// Remove fs and path imports
// import fs from 'fs';
// import path from 'path';
import data from "../../../data.json"; // Corrected import path

// Define the Profile type (keep this if not defined elsewhere globally)
interface Profile {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
}

// Define the Answer type based on data.json
interface Answer {
  id: string;
  question_id: string;
  answer_text: string;
  date: string;
  profile_id: string;
}

// Define the structure of data.json
interface AppData {
  books: any[]; // Define more specific types if needed
  book_questions: any[];
  book_answers: Answer[];
  events: any[];
  profiles: Profile[];
}

export default function ProfilePage({
  profile: initialProfile,
}: {
  profile?: Profile;
}) {
  let profileData: Profile | undefined = initialProfile;
  let answeredQuestionsCount = 0; // Default count
  const allAnswers: Answer[] = data.book_answers || []; // Get answers directly from imported data

  // If no profile prop is passed, use the first profile from data.json
  if (!profileData && data.profiles && data.profiles.length > 0) {
    profileData = data.profiles[0]; // Default to the first profile (김민준)
  }

  // Calculate answered questions count for the determined profile
  if (profileData) {
    answeredQuestionsCount = allAnswers.filter(
      (answer) => answer.profile_id === profileData?.id
    ).length;
  }

  // If no profile data could be determined (prop missing and file read failed/empty)
  if (!profileData) {
    // Render a fallback or loading state
    return <div>Could not load profile information.</div>;
  }

  return (
    <div className="flex items-center p-8">
      <Image
        src={profileData.imageUrl}
        alt={`${profileData.name}'s Profile Picture`}
        width={150}
        height={150}
        className="rounded-full flex-shrink-0"
      />
      <div className="ml-6">
        <h1 className="text-2xl font-bold mb-2">{profileData.name}</h1>
        <p className="text-gray-600">{profileData.bio}</p>
        <div className="mt-4 space-y-1 text-gray-600">
          <p>함께 답변한 질문들: {answeredQuestionsCount}</p>
          <p>함께 아는 친구들: {answeredQuestionsCount}</p>
        </div>
      </div>
    </div>
  );
}
