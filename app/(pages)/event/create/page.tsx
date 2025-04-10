import React from "react";

// Placeholder icons - adjusted for white background
const LocationIcon = () => <span className="text-gray-500">📍</span>;
const DescriptionIcon = () => <span className="text-gray-500">📄</span>;
const TicketIcon = () => <span className="text-gray-500">🎟️</span>;
const UsersIcon = () => <span className="text-gray-500">👥</span>;
const CapacityIcon = () => <span className="text-gray-500">📊</span>;
const EditIcon = () => (
  <span className="ml-1 text-xs text-gray-500 hover:text-gray-700">✏️</span>
);
// const ChevronDownIcon = () => (
//   <span className="ml-1 text-xs text-gray-500">▼</span>
// );
// const GlobeIcon = () => <span className="text-gray-500">🌐</span>;

// Input Row Component - adjusted for white background
const InputRow = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex items-center border border-gray-200 bg-gray-50 rounded-lg p-3 mb-3">
    <span className="mr-3">{icon}</span>
    <div className="flex-grow">{children}</div>
  </div>
);

// Form Section Component - adjusted for white background
const FormSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
      {title}
    </h3>
    {children}
  </div>
);

// Toggle Switch (Placeholder) - adjusted for white background
const ToggleSwitch = () => (
  <div className="w-10 h-5 bg-gray-300 rounded-full flex items-center p-0.5 cursor-pointer">
    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>{" "}
    {/* Off state */}
    {/* <div className="w-4 h-4 bg-blue-500 rounded-full shadow-md transform translate-x-full"></div> On state */}
  </div>
);

export default function EventCreatePageRevertedLayout() {
  return (
    <div className="bg-white min-h-screen p-8 text-gray-800 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        {/* Left Column: Image Preview */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="w-full aspect-square bg-gradient-to-br from-purple-400 via-red-400 to-yellow-300 rounded-lg mb-4 flex items-center justify-center text-white text-3xl font-bold p-4 text-center shadow-md">
            JOIN ME AT THE PARTY
          </div>
        </div>

        {/* Right Column: Form Details */}
        <div className="w-full lg:w-2/3">
          {/* Event Name Input */}
          <input
            type="text"
            placeholder="이벤트 이름"
            className="w-full bg-transparent text-4xl font-bold placeholder-gray-400 focus:outline-none mb-8 border-b border-gray-200 pb-2"
          />

          {/* Date & Time Section */}
          <FormSection title="날짜 및 시간">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Date/Time Input Box */}
              <div className="flex-grow border border-gray-200 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <span className="text-blue-500 text-xs mr-2">●</span>
                  <span className="text-xs mr-auto text-gray-600">시작</span>
                  <input
                    type="text"
                    defaultValue="4월 10일 (목)"
                    className="bg-transparent text-sm text-right focus:outline-none w-24 text-gray-700"
                  />
                  <input
                    type="text"
                    defaultValue="14:00"
                    className="bg-transparent text-sm w-12 text-right focus:outline-none ml-2 text-gray-700"
                  />
                </div>
                <div className="border-t border-dashed border-gray-300 my-2 ml-5"></div>
                <div className="flex items-center">
                  <span className="text-gray-400 text-xs mr-2">○</span>
                  <span className="text-xs mr-auto text-gray-600">종료</span>
                  <input
                    type="text"
                    defaultValue="4월 10일 (목)"
                    className="bg-transparent text-sm text-right focus:outline-none w-24 text-gray-700"
                  />
                  <input
                    type="text"
                    defaultValue="15:00"
                    className="bg-transparent text-sm w-12 text-right focus:outline-none ml-2 text-gray-700"
                  />
                </div>
              </div>
              {/* Timezone Box */}
              <div className="border border-gray-200 bg-gray-50 rounded-lg p-3 flex flex-col items-center justify-center w-full sm:w-auto">
                <span className="text-xs mt-1 text-gray-600">GMT+09:00</span>
                <span className="text-xs text-gray-600">서울</span>
              </div>
            </div>
          </FormSection>

          {/* Location Section */}
          <FormSection title="위치">
            <InputRow icon={<LocationIcon />}>
              <input
                type="text"
                placeholder="오프라인 위치 또는 가상 링크"
                className="bg-transparent placeholder-gray-400 focus:outline-none w-full text-gray-700"
              />
            </InputRow>
          </FormSection>

          {/* Description Section */}
          <FormSection title="설명">
            <InputRow icon={<DescriptionIcon />}>
              <input
                type="text" // Changed back to input for single line based on image
                placeholder="설명 추가"
                className="bg-transparent placeholder-gray-400 focus:outline-none w-full text-gray-700"
              />
            </InputRow>
          </FormSection>

          {/* Event Options Section */}
          <FormSection title="이벤트 옵션">
            <div className="space-y-3">
              {/* Tickets Option */}
              <div className="flex justify-between items-center border border-gray-200 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <TicketIcon />
                  <span className="ml-3 text-gray-700">티켓</span>
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
                  무료 <EditIcon />
                </button>
              </div>
              {/* Approval Needed Option */}
              <div className="flex justify-between items-center border border-gray-200 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <UsersIcon />
                  <span className="ml-3 text-gray-700">승인 필요</span>
                </div>
                <ToggleSwitch />
              </div>
              {/* Capacity Option */}
              <div className="flex justify-between items-center border border-gray-200 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center">
                  <CapacityIcon />
                  <span className="ml-3 text-gray-700">수용 인원</span>
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
                  무제한 <EditIcon />
                </button>
              </div>
            </div>
          </FormSection>

          {/* Submit Button */}
          <button className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg mt-8 hover:bg-gray-900 transition-colors">
            이벤트 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
