import React from "react";
import data from "@/data.json"; // Assuming data.json is accessible via '@/data.json' path alias
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
}

export default function ReadBookPage() {
  const books: Book[] = data.books;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">읽은 책 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 shadow-md flex flex-col"
          >
            <div className="relative w-full h-48 mb-2">
              <Image
                src={book.imageUrl}
                alt={book.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
