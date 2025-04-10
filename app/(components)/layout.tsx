import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <Link href="/">
            <Button variant="ghost" className="hover:bg-gray-100">
              ← 뒤로가기
            </Button>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
