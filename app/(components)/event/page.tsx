import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import data from "../../../data.json"; // Import data for fallback

// Define the Event type
type Event = {
  id: string;
  title: string;
  date: string; // Keep as string for now, can be Date object later
  location: string;
  description: string;
  imageUrl: string;
};

// Define a type for the possible props structure when used as a page
type PageProps = {
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Update component to accept optional Event props or PageProps
export default function EventPage(props?: Event | PageProps) {
  // Check if props contain actual event data (e.g., by checking for 'id'), otherwise use fallback
  const event: Event =
    props && "id" in props ? (props as Event) : data.events[0];
  const { title, date, location, imageUrl } = event; // Destructure needed props

  // Simple date formatting (can be improved)
  const formattedDate = new Date(date).toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="p-4">
      <div className="bg-white text-gray-900 p-6 rounded-lg max-w-2xl mx-auto flex justify-between items-start shadow-lg">
        <div className="flex-1 mr-6">
          <div className="text-gray-500 text-sm mb-2">{formattedDate}</div>{" "}
          {/* Use formatted date */}
          <h2 className="text-2xl font-bold mb-3">{title}</h2>{" "}
          {/* Use dynamic title */}
          <div className="flex items-center text-gray-600 text-sm mb-3">
            {/* Keep static organizer for now */}
            <span className="bg-gray-200 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center mr-2">
              S
            </span>
            <span>창비 출판사 주최</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm mb-6">
            <FiMapPin className="mr-2" />
            <span>{location}</span> {/* Use dynamic location */}
          </div>
          <div className="flex items-center">
            {/* Keep static button for now */}
            <button className="bg-red-600 text-white px-4 py-1 rounded-md text-sm mr-3">
              매진
            </button>
          </div>
        </div>
        <div className="w-48 h-48 relative flex-shrink-0">
          <Image
            src={imageUrl} // Use dynamic imageUrl
            alt={`${title} Event Image`} // Use dynamic title for alt text
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
