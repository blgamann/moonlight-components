// components/button.tsx
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Moon } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
function Button({ children }) {
  return /* @__PURE__ */ jsx("button", { className: "bg-[#1A9FA5] hover:bg-[#28B6C1] text-white px-4 py-2 text-sm rounded-md transition-colors hover:cursor-pointer", children });
}
function ButtonDeep() {
  const scale = 1.2;
  const [active, setActive] = useState(false);
  const [holding, setHolding] = useState(false);
  const timeoutRef = useRef();
  const controls = useAnimation();
  const BASE_CONTAINER = 56;
  const BASE_WRAPPER = 48;
  const BASE_ICON = 24;
  const STROKE = 3;
  const containerSize = BASE_CONTAINER * scale;
  const wrapperSize = BASE_WRAPPER * scale;
  const iconSize = BASE_ICON * scale;
  const R = wrapperSize / 2;
  const C = 2 * Math.PI * R;
  const center = containerSize / 2;
  function handlePointerDown() {
    if (active) return;
    setHolding(true);
    timeoutRef.current = window.setTimeout(() => {
      setActive(true);
      setHolding(false);
    }, 2e3);
  }
  function handlePointerUp() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = void 0;
    }
    setHolding(false);
  }
  useEffect(() => {
    if (active) {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.6, ease: "easeOut" }
      });
    }
  }, [active, controls]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative flex items-center justify-center cursor-pointer",
      style: { width: containerSize, height: containerSize },
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
      children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            width: containerSize,
            height: containerSize,
            className: "absolute top-0 left-0",
            children: [
              /* @__PURE__ */ jsx(
                "circle",
                {
                  cx: center,
                  cy: center,
                  r: R,
                  stroke: "#24d3ee",
                  strokeWidth: STROKE,
                  fill: "transparent",
                  opacity: 0.3
                }
              ),
              !active && /* @__PURE__ */ jsx(
                motion.circle,
                {
                  cx: center,
                  cy: center,
                  r: R,
                  stroke: "#24d3ee",
                  strokeWidth: STROKE,
                  fill: "transparent",
                  strokeDasharray: C,
                  strokeDashoffset: C,
                  transform: `rotate(-90 ${center} ${center})`,
                  animate: { strokeDashoffset: holding ? 0 : C },
                  transition: { duration: 2, ease: "linear" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: `rounded-full flex items-center justify-center transition-colors duration-200
          ${active ? "bg-gradient-to-tr from-[#24d3ee] to-[#24d3ee] shadow-[0_0_10px_0_rgba(0,255,255,0.7)]" : "bg-transparent"}`,
            style: { width: wrapperSize, height: wrapperSize },
            animate: controls,
            children: /* @__PURE__ */ jsx(Moon, { size: iconSize, color: active ? "#fff" : "#24d3ee" })
          }
        )
      ]
    }
  );
}

// components/item.tsx
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Item({ imageUrl, name, requestDate, actions }) {
  const timeElapsedText = requestDate ? formatDistanceToNow(requestDate, { addSuffix: true, locale: ko }) : "";
  return /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between p-4 bg-white/5 rounded-md border border-white/15", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx2("div", { className: "w-12 h-12 relative flex-shrink-0", children: /* @__PURE__ */ jsx2(
        Image,
        {
          src: imageUrl,
          alt: name,
          fill: true,
          className: "rounded-full object-cover",
          unoptimized: true
        }
      ) }),
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsxs2("p", { className: "text-base text-white/95", children: [
          name,
          "\uB2D8\uACFC\uC758 \uC18C\uC6B8\uB9C1\uD06C"
        ] }),
        requestDate && /* @__PURE__ */ jsx2("p", { className: "text-sm text-white/65", children: timeElapsedText })
      ] })
    ] }),
    actions && /* @__PURE__ */ jsx2("div", { className: "flex items-center space-x-2", children: actions })
  ] });
}

// components/tabs.tsx
import { useState as useState2 } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";

// components/index-bar.tsx
import { MoveLeft, MoveRight } from "lucide-react";

// components/book.tsx
import Image2 from "next/image";
import Link from "next/link";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function BookSm({ title, imageUrl, altText }) {
  return /* @__PURE__ */ jsx4("div", { className: "", children: /* @__PURE__ */ jsx4(
    Image2,
    {
      src: imageUrl,
      alt: altText ?? `${title} book cover`,
      width: 24,
      height: 50,
      className: "object-cover shadow-md"
    }
  ) });
}
function BookMdQuestion({
  imageUrl,
  title,
  question,
  altText
}) {
  const bookSlug = title.toLowerCase().replace(/\s+/g, "-");
  return /* @__PURE__ */ jsxs4("div", { className: "flex items-center space-x-4 border-b border-t border-white/15 py-8", children: [
    /* @__PURE__ */ jsx4("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx4(
      Image2,
      {
        src: imageUrl,
        alt: altText ?? `${title} cover`,
        width: 55,
        height: 90,
        className: "object-cover"
      }
    ) }),
    /* @__PURE__ */ jsxs4("div", { className: "flex flex-col flex-grow min-w-0", children: [
      /* @__PURE__ */ jsx4(Link, { href: `/book/${bookSlug}`, legacyBehavior: true, children: /* @__PURE__ */ jsx4("a", { className: "text-base text-white/60 hover:underline mb-1", children: title }) }),
      /* @__PURE__ */ jsx4("p", { className: "text-lg mt-1 text-white/95 line-clamp-2", children: question })
    ] })
  ] });
}
function BookMdAnswer({
  imageUrl,
  answerTitle,
  answerText,
  altText
}) {
  return /* @__PURE__ */ jsxs4("div", { className: "flex space-x-4 items-center", children: [
    /* @__PURE__ */ jsx4("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx4(
      Image2,
      {
        src: imageUrl,
        alt: altText ?? `${answerTitle} cover`,
        width: 55,
        height: 90,
        className: "object-cover"
      }
    ) }),
    /* @__PURE__ */ jsxs4("div", { className: "flex flex-col flex-1 overflow-hidden mt-1", children: [
      /* @__PURE__ */ jsx4(Link, { href: "/profile/answer/detail", children: /* @__PURE__ */ jsx4("span", { className: "text-xl font-semibold text-white/95 cursor-pointer hover:underline", children: answerTitle }) }),
      /* @__PURE__ */ jsx4("p", { className: "text-base text-white/60 mt-1.5 line-clamp-2", children: answerText })
    ] })
  ] });
}
function BookMdMeta({
  imageUrl,
  title,
  author,
  publisher,
  publicationDate,
  // Expects YYYYMMDD format for formatting logic
  altText
}) {
  const formatDate = (dateStr) => {
    if (dateStr && dateStr.length === 8) {
      return `${dateStr.substring(0, 4)}. ${dateStr.substring(
        4,
        6
      )}. ${dateStr.substring(6, 8)}.`;
    }
    return dateStr;
  };
  const formattedDate = formatDate(publicationDate);
  return /* @__PURE__ */ jsxs4("div", { className: "flex items-center space-x-4", children: [
    /* @__PURE__ */ jsx4("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx4(
      Image2,
      {
        src: imageUrl,
        alt: altText ?? `Cover of ${title}`,
        width: 55,
        height: 90,
        className: "object-cover",
        unoptimized: true
      }
    ) }),
    /* @__PURE__ */ jsxs4("div", { className: "flex-grow flex flex-col justify-center", children: [
      /* @__PURE__ */ jsx4(Link, { href: `/book`, passHref: true, legacyBehavior: true, children: /* @__PURE__ */ jsx4("a", { className: "text-lg font-semibold text-white/95 hover:underline mb-1", children: title }) }),
      /* @__PURE__ */ jsxs4("p", { className: "text-sm mt-1", children: [
        /* @__PURE__ */ jsx4("span", { className: "text-white/40", children: "\uC800\uC790" }),
        " ",
        /* @__PURE__ */ jsx4("span", { className: "text-white/60", children: author })
      ] }),
      /* @__PURE__ */ jsxs4("p", { className: "text-sm mt-1", children: [
        /* @__PURE__ */ jsx4("span", { className: "text-white/40", children: "\uCD9C\uD310" }),
        " ",
        /* @__PURE__ */ jsxs4("span", { className: "text-white/60", children: [
          publisher,
          " \xB7 ",
          formattedDate
        ] })
      ] })
    ] })
  ] });
}
function BookLg({ imageUrl, title, altText }) {
  return /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center space-y-2", children: [
    /* @__PURE__ */ jsx4(
      Image2,
      {
        src: imageUrl,
        alt: altText ?? `${title} book cover`,
        width: 100,
        height: 150,
        className: "object-cover shadow-md"
      }
    ),
    /* @__PURE__ */ jsx4("span", { className: "text-base text-white/95 text-center cursor-pointer hover:underline line-clamp-2", children: title })
  ] });
}
function BookLgBordered({ imageUrl, title, altText }) {
  return /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center space-y-2", children: [
    /* @__PURE__ */ jsx4("div", { className: "p-1 bg-cyan-400 shadow-[0_0_10px_0_rgba(0,255,255,0.7)]", children: /* @__PURE__ */ jsx4(
      Image2,
      {
        src: imageUrl,
        alt: altText ?? `${title} book cover`,
        width: 100,
        height: 150,
        className: "object-cover"
      }
    ) }),
    /* @__PURE__ */ jsx4("span", { className: "text-base text-white/95 text-center cursor-pointer hover:underline line-clamp-2", children: title })
  ] });
}
function BookXl({ imageUrl, title, altText }) {
  return /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center space-y-4", children: [
    /* @__PURE__ */ jsx4(
      Image2,
      {
        src: imageUrl,
        alt: altText ?? `${title} book cover`,
        width: 150,
        height: 240,
        className: "object-cover shadow-md"
      }
    ),
    /* @__PURE__ */ jsx4("span", { className: "text-xl font-['Nanum_Gothic'] text-white/95", children: title })
  ] });
}

// components/profile.tsx
import Image3 from "next/image";
import Link2 from "next/link";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function ProfileSm({ imageUrl, name, altText }) {
  return /* @__PURE__ */ jsxs5("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ jsx5("div", { className: "relative w-6 h-6", children: /* @__PURE__ */ jsx5(
      Image3,
      {
        src: imageUrl,
        alt: altText ?? `${name}'s profile picture`,
        fill: true,
        className: "rounded-full object-cover"
      }
    ) }),
    /* @__PURE__ */ jsx5("span", { className: "text-sm text-white/95 cursor-pointer hover:underline", children: name })
  ] });
}
function ProfileSmIndex({ imageUrl, name, altText }) {
  return /* @__PURE__ */ jsxs5("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ jsx5("div", { className: "relative w-6 h-6", children: /* @__PURE__ */ jsx5(
      Image3,
      {
        src: imageUrl,
        alt: altText ?? `${name}'s profile picture`,
        fill: true,
        className: "rounded-full object-cover"
      }
    ) }),
    /* @__PURE__ */ jsx5("span", { className: "text-sm text-white/60", children: name })
  ] });
}
function ProfileSmAnswer({
  imageUrl,
  name,
  altText,
  answerTitle,
  answerText
}) {
  return /* @__PURE__ */ jsxs5("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx5(ProfileSm, { imageUrl, name, altText }),
    /* @__PURE__ */ jsxs5("div", { className: "flex flex-col flex-1 overflow-hidden mt-5", children: [
      /* @__PURE__ */ jsx5(Link2, { href: "/profile/answer/detail", children: /* @__PURE__ */ jsx5("span", { className: "text-xl font-semibold text-white/95 cursor-pointer hover:underline", children: answerTitle }) }),
      /* @__PURE__ */ jsx5("p", { className: "text-base text-white/60 mt-1.5 line-clamp-2", children: answerText })
    ] })
  ] });
}
function ProfileMd({ imageUrl, name, altText }) {
  return /* @__PURE__ */ jsxs5("div", { className: "flex flex-col items-center space-y-3", children: [
    /* @__PURE__ */ jsx5("div", { className: "relative w-16 h-16", children: /* @__PURE__ */ jsx5(
      Image3,
      {
        src: imageUrl,
        alt: altText ?? `${name}'s profile picture`,
        fill: true,
        className: "rounded-full object-cover"
      }
    ) }),
    /* @__PURE__ */ jsx5("span", { className: "text-lg text-white/95 mt-2 text-center cursor-pointer hover:underline", children: name })
  ] });
}
function ProfileMdBordered({
  imageUrl,
  name,
  altText
}) {
  return /* @__PURE__ */ jsxs5("div", { className: "flex flex-col items-center space-y-3", children: [
    /* @__PURE__ */ jsx5("div", { className: "relative w-18 h-18 p-1 rounded-full bg-cyan-400 shadow-[0_0_10px_0_rgba(0,255,255,0.7)]", children: /* @__PURE__ */ jsx5("div", { className: "relative w-16 h-16", children: /* @__PURE__ */ jsx5(
      Image3,
      {
        src: imageUrl,
        alt: altText ?? `${name}'s profile picture`,
        fill: true,
        className: "rounded-full object-cover"
      }
    ) }) }),
    /* @__PURE__ */ jsx5("span", { className: "text-lg text-white/95 mt-2 text-center cursor-pointer hover:underline", children: name })
  ] });
}
function ProfileLg({ imageUrl, name, bio, altText }) {
  return /* @__PURE__ */ jsxs5("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx5("div", { className: "relative w-32 h-32 mb-4", children: /* @__PURE__ */ jsx5(
      Image3,
      {
        src: imageUrl,
        alt: altText ?? `${name}'s profile picture`,
        fill: true,
        className: "rounded-full object-cover"
      }
    ) }),
    /* @__PURE__ */ jsx5("span", { className: "text-2xl text-white/95 cursor-pointer font-semibold hover:underline mb-4", children: name }),
    /* @__PURE__ */ jsx5("p", { className: "text-xl text-white/60 font-['NanumMyeongjo'] w-[400px]", children: bio })
  ] });
}

// components/index-bar.tsx
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function IndexBack({ back }) {
  return /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx6(MoveLeft, { className: "text-white/60" }),
    back && /* @__PURE__ */ jsx6("span", { className: "text-white/60 text-base cursor-pointer hover:underline", children: back })
  ] });
}
function IndexForward({ forward }) {
  return /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2", children: [
    forward && /* @__PURE__ */ jsx6("span", { className: "text-white/60 text-base cursor-pointer hover:underline", children: forward }),
    /* @__PURE__ */ jsx6(MoveRight, { className: "text-white/60" })
  ] });
}
function IndexTop({ profile }) {
  return /* @__PURE__ */ jsxs6("div", { className: "flex justify-between items-center border-b border-white/15 px-6 py-4 h-18", children: [
    /* @__PURE__ */ jsx6("div", { className: "text-white/60 text-base", children: "2024\uB144 04\uC6D4 26\uC77C" }),
    profile && /* @__PURE__ */ jsx6(ProfileSmIndex, { ...profile })
  ] });
}
function IndexTopBack({
  back,
  title,
  book,
  profile,
  totalPages,
  currentPage
}) {
  if (book && profile) {
    throw new Error("book\uACFC profile\uC740 \uB3D9\uC2DC\uC5D0 \uC874\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
  }
  return /* @__PURE__ */ jsxs6("div", { className: "relative flex items-center border-b border-white/15 px-6 py-4 h-18", children: [
    /* @__PURE__ */ jsx6(IndexBack, { back }),
    /* @__PURE__ */ jsxs6(
      "div",
      {
        className: "\n          absolute\n          left-1/2 top-1/2\n          -translate-x-1/2 -translate-y-1/2\n          min-w-[180px]\n          max-w-[60%]",
        children: [
          /* @__PURE__ */ jsx6(
            "div",
            {
              className: "\n          text-center\n          whitespace-nowrap\n          overflow-hidden\n          text-ellipsis\n          text-white/95\n          text-lg font-['NanumMyeongjo']\n        ",
              children: title
            }
          ),
          totalPages && currentPage && /* @__PURE__ */ jsxs6("div", { className: "text-center text-white/40 text-sm tracking-widest mt-[-2px]", children: [
            currentPage,
            "/",
            totalPages
          ] })
        ]
      }
    ),
    (book || profile) && /* @__PURE__ */ jsxs6("div", { className: "absolute right-6 top-1/2 -translate-y-1/2 flex items-center h-full overflow-hidden", children: [
      book && // 높이를 컨테이너에 맞추기 위해 h-full 추가
      /* @__PURE__ */ jsx6("div", { className: "h-full flex flex-col items-center justify-center", children: /* @__PURE__ */ jsx6(BookSm, { ...book }) }),
      profile && /* @__PURE__ */ jsx6(ProfileSmIndex, { ...profile })
    ] })
  ] });
}
function IndexBottom({
  back,
  forward
}) {
  return /* @__PURE__ */ jsxs6("div", { className: "flex justify-between items-center border-t border-white/15 px-6 py-4 h-18", children: [
    /* @__PURE__ */ jsx6(IndexBack, { back }),
    /* @__PURE__ */ jsx6(IndexForward, { forward })
  ] });
}
function IndexBottomButton({
  back,
  forward
}) {
  return /* @__PURE__ */ jsxs6("div", { className: "flex justify-between items-center border-t border-white/15 px-6 py-4 h-20", children: [
    /* @__PURE__ */ jsx6(IndexBack, { back }),
    /* @__PURE__ */ jsx6(ButtonDeep, {}),
    /* @__PURE__ */ jsx6(IndexForward, { forward })
  ] });
}

// components/soulline.tsx
import React from "react";
import Image4 from "next/image";
import Link3 from "next/link";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";

// components/answer.tsx
import { Fragment, jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
var Answer = ({
  answer,
  book,
  questionText,
  formattedDate
}) => {
  return /* @__PURE__ */ jsxs8(Fragment, { children: [
    /* @__PURE__ */ jsx8("h2", { className: "text-4xl font-semibold text-white/95 mb-6", children: answer.title }),
    /* @__PURE__ */ jsx8(
      BookMdQuestion,
      {
        imageUrl: book.imageUrl,
        title: book.title,
        question: questionText,
        altText: book.altText
      }
    ),
    /* @__PURE__ */ jsx8("p", { className: "text-xl text-white/95 mt-6 mb-4 leading-relaxed whitespace-pre-line", children: answer.answer_text }),
    /* @__PURE__ */ jsxs8("div", { className: "flex justify-between items-center ml-[-4px]", children: [
      /* @__PURE__ */ jsx8("div", { className: "relative" }),
      /* @__PURE__ */ jsx8("p", { className: "text-base text-white/60", children: formattedDate })
    ] })
  ] });
};
export {
  Answer,
  BookLg,
  BookLgBordered,
  BookMdAnswer,
  BookMdMeta,
  BookMdQuestion,
  BookSm,
  BookXl,
  Button,
  ButtonDeep,
  IndexBack,
  IndexBottom,
  IndexBottomButton,
  IndexForward,
  IndexTop,
  IndexTopBack,
  Item,
  ProfileLg,
  ProfileMd,
  ProfileMdBordered,
  ProfileSm,
  ProfileSmAnswer,
  ProfileSmIndex
};
//# sourceMappingURL=index.mjs.map