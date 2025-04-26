// components/SoulLinkItem.tsx
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";

export interface ItemProps {
  imageUrl: string;
  name: string;
  requestDate?: Date;
  actions?: React.ReactNode;
}

export default function Item({
  imageUrl,
  name,
  requestDate,
  actions,
}: ItemProps) {
  const timeElapsedText = requestDate
    ? formatDistanceToNow(requestDate, { addSuffix: true, locale: ko })
    : "";

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-md border border-white/15">
      {/* 프로필 + 텍스트 */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 relative flex-shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-full object-cover"
            unoptimized
          />
        </div>
        <div>
          <p className="text-base text-white/95">{name}님과의 소울링크</p>
          {requestDate && (
            <p className="text-sm text-white/65">{timeElapsedText}</p>
          )}
        </div>
      </div>

      {/* 액션 버튼 등 */}
      {actions && <div className="flex items-center space-x-2">{actions}</div>}
    </div>
  );
}
