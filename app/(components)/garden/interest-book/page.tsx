"use client";

import React from "react";
import Image from "next/image";
import data from "../../../../data.json"; // Correct relative path to data.json

// Update the Book interface to match data.json structure
interface Book {
  id: string; // id is a string in data.json
  title: string;
  author: string;
  imageUrl: string; // Use imageUrl
}

// Remove the sampleBooks array

interface InterestBookProps {
  // Props are not needed as we are using imported data
}

const InterestBookComponent: React.FC<InterestBookProps> = (props) => {
  const books: Book[] = data.books; // Use books array from imported data

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">관심 책</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Map over the books from data.json */}
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-2 flex flex-col items-center text-center"
          >
            <div className="relative w-32 h-48 mb-2">
              <Image
                src={book.imageUrl} // Use imageUrl from data.json
                alt={`${book.title} cover`}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h3 className="font-semibold text-sm">{book.title}</h3>
            <p className="text-xs text-gray-600">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestBookComponent;
