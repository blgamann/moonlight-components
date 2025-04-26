"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// components/index.ts
var index_exports = {};
__export(index_exports, {
  Answer: () => Answer,
  BookLg: () => BookLg,
  BookLgBordered: () => BookLgBordered,
  BookMdAnswer: () => BookMdAnswer,
  BookMdMeta: () => BookMdMeta,
  BookMdQuestion: () => BookMdQuestion,
  BookSm: () => BookSm,
  BookXl: () => BookXl,
  Button: () => Button,
  ButtonDeep: () => ButtonDeep,
  IndexBack: () => IndexBack,
  IndexBottom: () => IndexBottom,
  IndexBottomButton: () => IndexBottomButton,
  IndexForward: () => IndexForward,
  IndexTop: () => IndexTop,
  IndexTopBack: () => IndexTopBack,
  Item: () => Item,
  ProfileLg: () => ProfileLg,
  ProfileMd: () => ProfileMd,
  ProfileMdBordered: () => ProfileMdBordered,
  ProfileSm: () => ProfileSm,
  ProfileSmAnswer: () => ProfileSmAnswer,
  ProfileSmIndex: () => ProfileSmIndex
});
module.exports = __toCommonJS(index_exports);

// components/button.tsx
var import_react = require("react");
var import_framer_motion = require("framer-motion");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
function Button({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "bg-[#1A9FA5] hover:bg-[#28B6C1] text-white px-4 py-2 text-sm rounded-md transition-colors hover:cursor-pointer", children });
}
function ButtonDeep() {
  const scale = 1.2;
  const [active, setActive] = (0, import_react.useState)(false);
  const [holding, setHolding] = (0, import_react.useState)(false);
  const timeoutRef = (0, import_react.useRef)();
  const controls = (0, import_framer_motion.useAnimation)();
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
  (0, import_react.useEffect)(() => {
    if (active) {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.6, ease: "easeOut" }
      });
    }
  }, [active, controls]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "relative flex items-center justify-center cursor-pointer",
      style: { width: containerSize, height: containerSize },
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "svg",
          {
            width: containerSize,
            height: containerSize,
            className: "absolute top-0 left-0",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
              !active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_framer_motion.motion.circle,
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_framer_motion.motion.div,
          {
            className: `rounded-full flex items-center justify-center transition-colors duration-200
          ${active ? "bg-gradient-to-tr from-[#24d3ee] to-[#24d3ee] shadow-[0_0_10px_0_rgba(0,255,255,0.7)]" : "bg-transparent"}`,
            style: { width: wrapperSize, height: wrapperSize },
            animate: controls,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Moon, { size: iconSize, color: active ? "#fff" : "#24d3ee" })
          }
        )
      ]
    }
  );
}

// components/item.tsx
var import_image = __toESM(require("next/image"));
var import_date_fns = require("date-fns");
var import_locale = require("date-fns/locale");
var import_jsx_runtime2 = require("react/jsx-runtime");
function Item({ imageUrl, name, requestDate, actions }) {
  const timeElapsedText = requestDate ? (0, import_date_fns.formatDistanceToNow)(requestDate, { addSuffix: true, locale: import_locale.ko }) : "";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between p-4 bg-white/5 rounded-md border border-white/15", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-12 h-12 relative flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_image.default,
        {
          src: imageUrl,
          alt: name,
          fill: true,
          className: "rounded-full object-cover",
          unoptimized: true
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-base text-white/95", children: [
          name,
          "\uB2D8\uACFC\uC758 \uC18C\uC6B8\uB9C1\uD06C"
        ] }),
        requestDate && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-white/65", children: timeElapsedText })
      ] })
    ] }),
    actions && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex items-center space-x-2", children: actions })
  ] });
}

// components/tabs.tsx
var import_react2 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");

// components/index-bar.tsx
var import_lucide_react2 = require("lucide-react");

// components/book.tsx
var import_image2 = __toESM(require("next/image"));
var import_link = __toESM(require("next/link"));
var import_jsx_runtime4 = require("react/jsx-runtime");
function BookSm({ title, imageUrl, altText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_image2.default,
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center space-x-4 border-b border-t border-white/15 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_image2.default,
      {
        src: imageUrl,
        alt: altText ?? `${title} cover`,
        width: 55,
        height: 90,
        className: "object-cover"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col flex-grow min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_link.default, { href: `/book/${bookSlug}`, legacyBehavior: true, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { className: "text-base text-white/60 hover:underline mb-1", children: title }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-lg mt-1 text-white/95 line-clamp-2", children: question })
    ] })
  ] });
}
function BookMdAnswer({
  imageUrl,
  answerTitle,
  answerText,
  altText
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex space-x-4 items-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_image2.default,
      {
        src: imageUrl,
        alt: altText ?? `${answerTitle} cover`,
        width: 55,
        height: 90,
        className: "object-cover"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col flex-1 overflow-hidden mt-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_link.default, { href: "/profile/answer/detail", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-xl font-semibold text-white/95 cursor-pointer hover:underline", children: answerTitle }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-base text-white/60 mt-1.5 line-clamp-2", children: answerText })
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center space-x-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_image2.default,
      {
        src: imageUrl,
        alt: altText ?? `Cover of ${title}`,
        width: 55,
        height: 90,
        className: "object-cover",
        unoptimized: true
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex-grow flex flex-col justify-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_link.default, { href: `/book`, passHref: true, legacyBehavior: true, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { className: "text-lg font-semibold text-white/95 hover:underline mb-1", children: title }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-sm mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-white/40", children: "\uC800\uC790" }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-white/60", children: author })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-sm mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-white/40", children: "\uCD9C\uD310" }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-white/60", children: [
          publisher,
          " \xB7 ",
          formattedDate
        ] })
      ] })
    ] })
  ] });
}
function BookLg({ imageUrl, title, altText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col items-center space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_image2.default,
      {
        src: imageUrl,
        alt: altText ?? `${title} book cover`,
        width: 100,
        height: 150,
        className: "object-cover shadow-md"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-base text-white/95 text-center cursor-pointer hover:underline line-clamp-2", children: title })
  ] });
}
function BookLgBordered({ imageUrl, title, altText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col items-center space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "p-1 bg-cyan-400 shadow-[0_0_10px_0_rgba(0,255,255,0.7)]", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_image2.default,
      {
        src: imageUrl,
        alt: altText ?? `${title} book cover`,
        width: 100,
        height: 150,
        className: "object-cover"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-base text-white/95 text-center cursor-pointer hover:underline line-clamp-2", children: title })
  ] });
}
function BookXl({ imageUrl, title, altText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col items-center space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_image2.default,
      {
        src: imageUrl,
        alt: altText ?? `${title} book cover`,
        width: 150,
        height: 240,
        className: "object-cover shadow-md"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-xl font-['Nanum_Gothic'] text-white/95", children: title })
  ] });
}

// components/profile.tsx
var import_image3 = __toESM(require("next/image"));
var import_link2 = __toESM(require("next/link"));
var import_jsx_runtime5 = require("react/jsx-runtime");
function ProfileSm({ imageUrl, name, altText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "relative w-6 h-6", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_image3.default,
      {
        src: imageUrl,
        alt: altText ?? `${name}'s profile picture`,
        fill: true,
        className: "rounded-full object-cover"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm text-white/95 cursor-pointer hover:underline", children: name })
  ] });
}
function ProfileSmIndex({ imageUrl, name, altText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "relative w-6 h-6", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_image3.default,
      {
        src: imageUrl,
        alt: altText ?? `${name}'s profile picture`,
        fill: true,
        className: "rounded-full object-cover"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm text-white/60", children: name })
  ] });
}
function ProfileSmAnswer({
  imageUrl,
  name,
  altText,
  answerTitle,
  answerText
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ProfileSm, { imageUrl, name, altText }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col flex-1 overflow-hidden mt-5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_link2.default, { href: "/profile/answer/detail", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xl font-semibold text-white/95 cursor-pointer hover:underline", children: answerTitle }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-base text-white/60 mt-1.5 line-clamp-2", children: answerText })
    ] })
  ] });
}
function ProfileMd({ imageUrl, name, altText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "relative w-16 h-16", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_image3.default,
      {
        src: imageUrl,
        alt: altText ?? `${name}'s profile picture`,
        fill: true,
        className: "rounded-full object-cover"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-lg text-white/95 mt-2 text-center cursor-pointer hover:underline", children: name })
  ] });
}
function ProfileMdBordered({
  imageUrl,
  name,
  altText
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "relative w-18 h-18 p-1 rounded-full bg-cyan-400 shadow-[0_0_10px_0_rgba(0,255,255,0.7)]", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "relative w-16 h-16", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_image3.default,
      {
        src: imageUrl,
        alt: altText ?? `${name}'s profile picture`,
        fill: true,
        className: "rounded-full object-cover"
      }
    ) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-lg text-white/95 mt-2 text-center cursor-pointer hover:underline", children: name })
  ] });
}
function ProfileLg({ imageUrl, name, bio, altText }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "relative w-32 h-32 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_image3.default,
      {
        src: imageUrl,
        alt: altText ?? `${name}'s profile picture`,
        fill: true,
        className: "rounded-full object-cover"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-2xl text-white/95 cursor-pointer font-semibold hover:underline mb-4", children: name }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xl text-white/60 font-['NanumMyeongjo'] w-[400px]", children: bio })
  ] });
}

// components/index-bar.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function IndexBack({ back }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.MoveLeft, { className: "text-white/60" }),
    back && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-white/60 text-base cursor-pointer hover:underline", children: back })
  ] });
}
function IndexForward({ forward }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2", children: [
    forward && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-white/60 text-base cursor-pointer hover:underline", children: forward }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.MoveRight, { className: "text-white/60" })
  ] });
}
function IndexTop({ profile }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex justify-between items-center border-b border-white/15 px-6 py-4 h-18", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "text-white/60 text-base", children: "2024\uB144 04\uC6D4 26\uC77C" }),
    profile && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ProfileSmIndex, { ...profile })
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative flex items-center border-b border-white/15 px-6 py-4 h-18", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IndexBack, { back }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: "\n          absolute\n          left-1/2 top-1/2\n          -translate-x-1/2 -translate-y-1/2\n          min-w-[180px]\n          max-w-[60%]",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "div",
            {
              className: "\n          text-center\n          whitespace-nowrap\n          overflow-hidden\n          text-ellipsis\n          text-white/95\n          text-lg font-['NanumMyeongjo']\n        ",
              children: title
            }
          ),
          totalPages && currentPage && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-center text-white/40 text-sm tracking-widest mt-[-2px]", children: [
            currentPage,
            "/",
            totalPages
          ] })
        ]
      }
    ),
    (book || profile) && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "absolute right-6 top-1/2 -translate-y-1/2 flex items-center h-full overflow-hidden", children: [
      book && // 높이를 컨테이너에 맞추기 위해 h-full 추가
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "h-full flex flex-col items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(BookSm, { ...book }) }),
      profile && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ProfileSmIndex, { ...profile })
    ] })
  ] });
}
function IndexBottom({
  back,
  forward
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex justify-between items-center border-t border-white/15 px-6 py-4 h-18", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IndexBack, { back }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IndexForward, { forward })
  ] });
}
function IndexBottomButton({
  back,
  forward
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex justify-between items-center border-t border-white/15 px-6 py-4 h-20", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IndexBack, { back }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ButtonDeep, {}),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(IndexForward, { forward })
  ] });
}

// components/soulline.tsx
var import_react3 = __toESM(require("react"));
var import_image4 = __toESM(require("next/image"));
var import_link3 = __toESM(require("next/link"));
var import_jsx_runtime7 = require("react/jsx-runtime");

// components/answer.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var Answer = ({
  answer,
  book,
  questionText,
  formattedDate
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { className: "text-4xl font-semibold text-white/95 mb-6", children: answer.title }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      BookMdQuestion,
      {
        imageUrl: book.imageUrl,
        title: book.title,
        question: questionText,
        altText: book.altText
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-xl text-white/95 mt-6 mb-4 leading-relaxed whitespace-pre-line", children: answer.answer_text }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex justify-between items-center ml-[-4px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "relative" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-base text-white/60", children: formattedDate })
    ] })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.js.map