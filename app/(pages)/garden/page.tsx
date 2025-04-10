import QuestionList from "@/app/(components)/question/list/page";
import EventCard from "@/app/(components)/event/page";
import data from "../../../data.json";
import BookDetail from "@/app/(components)/garden/book-detail/page"; // Import BookDetail

// Define types based on data.json structure
type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
};

// Update Question type to match data.json structure
type Question = {
  id: string;
  book_id: string; // Added book_id
  question_text: string; // Renamed from text
  question_context: string; // Added question_context
  // Removed user and timestamp as they are not in book_questions
};

type Event = {
  id: string;
  book_id: string; // Added book_id based on data.json structure for events
  title: string;
  date: string;
  time: string; // Added time based on data.json
  location: string;
  organizer: string; // Added organizer based on data.json
  description: string;
  imageUrl: string;
};

// ID for the specific book to display
const TARGET_BOOK_ID = "book-seonghak";

export default function GardenPage() {
  // Destructure correct fields from data.json
  const {
    books,
    book_questions, // Use book_questions instead of questions
    events,
  }: { books: Book[]; book_questions: Question[]; events: Event[] } = data;

  // Find the target book
  const targetBook = books.find((book) => book.id === TARGET_BOOK_ID);

  // Filter questions for the target book
  const targetQuestions = book_questions.filter(
    (question) => question.book_id === TARGET_BOOK_ID
  );

  // Filter events for the target book
  const targetEvents = events.filter(
    (event) => event.book_id === TARGET_BOOK_ID
  );

  // Handle case where the book is not found
  if (!targetBook) {
    return <div className="container mx-auto p-8">책을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-8 flex flex-col space-y-4">
      {/* Render BookDetail for the target book */}
      <BookDetail {...targetBook} />

      {/* Pass the filtered questions data */}
      <QuestionList questions={targetQuestions} />

      {/* Map over filtered events data and render EventCard for each */}
      {targetEvents.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-2">관련 이벤트</h2>
          {targetEvents.map((event: Event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      )}
    </div>
  );
}
