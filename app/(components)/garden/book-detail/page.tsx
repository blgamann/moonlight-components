"use client";

import { useState } from "react"; // Import useState
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import data from "../../../../data.json"; // Import data for fallback

// Define the Book type based on the expected props
type Book = {
  id: string;
  title: string;
  author: string;
  description?: string; // Make description optional
  imageUrl: string;
};

// Define a type for the possible props structure when used as a page
type PageProps = {
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Update component to accept optional Book props or PageProps
export default function BookDetailPage(props?: Book | PageProps) {
  // State for interactivity
  const [isInterested, setIsInterested] = useState(false);
  const [hasRead, setHasRead] = useState(false);

  // Check if props contain actual book data (e.g., by checking for 'id'), otherwise use fallback
  const book: Book = props && "id" in props ? (props as Book) : data.books[0];
  const { title, author, imageUrl, description } = book; // Destructure props from the determined book data

  // Derived counts based on state
  const interestedMembers = isInterested ? 1 : 0;
  const readers = hasRead ? 1 : 0;

  // Handler functions
  const toggleInterest = () => setIsInterested(!isInterested);
  const toggleRead = () => setHasRead(!hasRead);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="flex gap-6 md:gap-8">
          {/* 책 표지 이미지 */}
          <div className="w-[120px] md:w-[150px] flex-shrink-0">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src={imageUrl} // Use dynamic imageUrl
                alt={`${title} 책 표지`} // Use dynamic title for alt text
                fill
                sizes="(max-width: 768px) 120px, 150px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 정보 및 액션 섹션 (오른쪽) */}
          <div className="flex-1 flex flex-col justify-between">
            {/* 상단 정보 */}
            <div className="space-y-3">
              <h1 className="text-2xl font-medium">{`${author}의 『${title}』`}</h1>
              {/* Conditionally render description */}
              {description && (
                <p className="text-sm text-gray-600 mt-2">{description}</p>
              )}
              {/* 멤버 수와 소울링크 수 (Update to use state) */}
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span>관심 멤버</span>
                  {/* Display dynamic count */}
                  <span className="font-medium text-green-600">
                    {interestedMembers}명
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>독자</span>
                  {/* Display dynamic count */}
                  <span className="font-medium text-green-600">
                    {readers}명
                  </span>
                </div>
              </div>
            </div>

            {/* 하단 액션 버튼들 (Update for interactivity) */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button
                variant={isInterested ? "default" : "outline"}
                className={`flex-1 ${
                  isInterested
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-50 border-green-200 text-green-800 hover:bg-green-100"
                }`}
                onClick={toggleInterest}
              >
                {isInterested ? "관심 책 해제" : "관심 책 등록"}
              </Button>
              <Button
                variant={hasRead ? "default" : "outline"}
                className={`flex-1 ${
                  hasRead
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-50 border-green-200 text-green-800 hover:bg-green-100"
                }`}
                onClick={toggleRead}
              >
                {hasRead ? "읽은 책 취소" : "읽은 책 등록"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-green-50 border-green-200 text-green-800 hover:bg-green-100"
                onClick={() => alert("책 구매 페이지로 이동합니다.")}
              >
                책 구매
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
