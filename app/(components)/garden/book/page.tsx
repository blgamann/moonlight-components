"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import data from "../../../../data.json"; // Import data for fallback

// Define the Book type (can be shared or imported later)
type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
};

// Define a type for the possible props structure when used as a page
type PageProps = {
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Update component to accept optional Book props or PageProps
export default function BookPage(props?: Book | PageProps) {
  // Check if props contain actual book data (e.g., by checking for 'id'), otherwise use fallback
  const book: Book = props && "id" in props ? (props as Book) : data.books[0]; // Type assertion added
  const { id, title, author, imageUrl } = book; // Destructure needed props from the determined book data

  return (
    // Update Link href to be dynamic based on book id
    <div
      className="block group cursor-pointer"
      onClick={() => alert("가든 상세 페이지로 이동합니다.")}
    >
      <Card className="w-full max-w-4xl mx-auto transition-colors group-hover:bg-gray-50">
        <CardContent className="p-4 pr-6">
          <div className="flex gap-4 items-center">
            {/* 책 표지 이미지 */}
            <div className="w-[60px] flex-shrink-0">
              <div className="relative aspect-[3/4] rounded overflow-hidden">
                <Image
                  src={imageUrl} // Use dynamic imageUrl
                  alt={`${title} 책 표지`} // Use dynamic title for alt text
                  fill
                  sizes="60px"
                  className="object-contain"
                  priority // Consider removing priority if many books are listed
                />
              </div>
            </div>

            {/* 책 정보 */}
            <div className="flex-1">
              {/* Combine author and title */}
              <h2 className="text-lg font-medium">{`${author}의 『${title}』`}</h2>
              {/* Optionally add author: <p className="text-sm text-gray-500">{author}</p> */}
            </div>

            {/* 호버 시 나타나는 화살표 */}
            <div className="ml-auto text-gray-400 text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 ease-in-out">
              →
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
