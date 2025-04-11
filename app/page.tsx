import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center p-8">
      <div className="flex w-full max-w-4xl space-x-8">
        {/* Left Column: Components List */}
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-4 text">Components List</h1>
          <ul className="list-none">
            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Book</h2>
              <ul className="list-disc pl-6">
                <li>
                  <Link
                    href="/garden/book"
                    className="text-blue-600 hover:underline"
                  >
                    Book Simple Component
                  </Link>
                </li>
                <li>
                  <Link
                    href="/garden/book-detail"
                    className="text-blue-600 hover:underline"
                  >
                    Book Detail Component
                  </Link>
                </li>
                <li>
                  <Link
                    href="/garden/bookshelf"
                    className="text-blue-600 hover:underline"
                  >
                    Bookshelf
                  </Link>
                </li>
                <li>
                  <Link
                    href="/garden/interest-book"
                    className="text-blue-600 hover:underline"
                  >
                    Interested Book
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Question</h2>
              <ul className="list-disc pl-6">
                <li>
                  <Link
                    href="/question/simple"
                    className="text-blue-600 hover:underline"
                  >
                    Question Simple
                  </Link>
                </li>
                <li>
                  <Link
                    href="/question/list"
                    className="text-blue-600 hover:underline"
                  >
                    Question List for Garden
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Answer</h2>
              <ul className="list-disc pl-6">
                <li>
                  <Link
                    href="/answer"
                    className="text-blue-600 hover:underline"
                  >
                    Answer Component (Single)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/answer/list"
                    className="text-blue-600 hover:underline"
                  >
                    Answer List Page (User Specific)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resonance"
                    className="text-blue-600 hover:underline"
                  >
                    Resonances
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resonance/list"
                    className="text-blue-600 hover:underline"
                  >
                    Resonance List Page
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Event</h2>
              <ul className="list-disc pl-6">
                <li>
                  <Link href="/event" className="text-blue-600 hover:underline">
                    Event Card Component
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Profile</h2>
              <ul className="list-disc pl-6">
                <li>
                  <Link
                    href="/profile"
                    className="text-blue-600 hover:underline"
                  >
                    Profile Component
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Right Column: Pages List */}
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-4">Pages List</h1>
          <ul className="list-none">
            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Matching</h2>
              <ul className="list-disc pl-6">
                <li>
                  <Link
                    href="/matching"
                    className="text-blue-600 hover:underline"
                  >
                    Matching Page
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Garden</h2>
              <ul className="list-disc pl-6">
                <li>
                  <Link
                    href="/garden"
                    className="text-blue-600 hover:underline"
                  >
                    Garden Page
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Event</h2>
              <ul className="list-disc pl-6">
                <li>
                  <Link
                    href="/event/create"
                    className="text-blue-600 hover:underline"
                  >
                    Event Create Page
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Profile</h2>
              <ul className="list-disc pl-6">
                <li>
                  <Link
                    href="/profile-detail"
                    className="text-blue-600 hover:underline"
                  >
                    Profile Detail Page
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
