import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import data from "../../../../data.json"; // Import data for fallback

// Define the Book type based on the expected props
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
export default function BookDetailPage(props?: Book | PageProps) {
  // Check if props contain actual book data (e.g., by checking for 'id'), otherwise use fallback
  const book: Book = props && "id" in props ? (props as Book) : data.books[0];
  const { title, author, imageUrl, description } = book; // Destructure props from the determined book data

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
              <p className="text-sm text-gray-600 mt-2">{description}</p>{" "}
              {/* Display description */}
              {/* 멤버 수와 소울링크 수 (Keep static for now) */}
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span>멤버</span>
                  <span className="font-medium text-green-600">N명</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>소울링크</span>
                  <span className="font-medium text-green-600">N명</span>
                </div>
              </div>
            </div>

            {/* 하단 액션 버튼들 (Keep static for now) */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button
                variant="outline"
                className="flex-1 bg-green-50 border-green-200"
              >
                관심 가든 등록
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-green-50 border-green-200"
              >
                읽은 책 등록
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-green-50 border-green-200"
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
