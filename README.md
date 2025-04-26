# @sgnoo/moonlight-components

Moonlight Components 라이브러리입니다. 다양한 UI 컴포넌트를 제공합니다.

## 설치

```bash
npm install @sgnoo/moonlight-components react react-dom
# 또는
yarn add @sgnoo/moonlight-components react react-dom
```

**Peer Dependencies:**

이 라이브러리는 다음 패키지들을 `peerDependencies`로 가집니다. 프로젝트에 직접 설치해야 합니다:

- `react`
- `react-dom`
- `@radix-ui/react-slot`
- `class-variance-authority`
- `clsx`
- `date-fns`
- `framer-motion`
- `lucide-react`
- `tailwind-merge`

필요에 따라 프로젝트에 설치해주세요:

```bash
npm install @radix-ui/react-slot class-variance-authority clsx date-fns framer-motion lucide-react tailwind-merge
# 또는
yarn add @radix-ui/react-slot class-variance-authority clsx date-fns framer-motion lucide-react tailwind-merge
```

## 사용법

```jsx
import { Button, Item } from "@sgnoo/moonlight-components";

function MyComponent() {
  return (
    <div>
      <Button>클릭하세요</Button>
      <Item
        imageUrl="/path/to/image.png"
        name="컴포넌트 이름"
        requestDate={new Date()}
      />
      {/* 다른 컴포넌트 사용 */}
    </div>
  );
}
```

## Tailwind CSS 설정

이 라이브러리는 Tailwind CSS 유틸리티 클래스를 사용합니다. 라이브러리의 스타일이 올바르게 적용되려면, 사용하는 프로젝트의 `tailwind.config.js` (또는 `.ts`) 파일의 `content` 배열에 라이브러리 경로를 추가해야 합니다:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    // 프로젝트의 다른 파일 경로들...
    "./node_modules/@sgnoo/moonlight-components/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // tailwindcss-animate 플러그인을 사용 중이라면 여기에 추가
    require("tailwindcss-animate"),
  ],
};
```
