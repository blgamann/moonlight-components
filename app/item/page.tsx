"use client";

import { Button } from "@/components/button";
import Item from "@/components/items";

// Define an interface for the profile data
interface Profile {
  id: string | number; // Assuming id can be string or number
  imageUrl: string;
  name: string;
  requestDate: string; // Assuming requestDate is a string, adjust if it's a Date object
}

// Define the props type for the component
// interface SoulLinkListProps {
//   data: Profile[];
// }

export default function SoulLinkList(/*{ data }: SoulLinkListProps*/) {
  // Create dummy data conforming to the Profile interface
  const dummyData: Profile[] = [
    {
      id: 1,
      imageUrl: "/profiles/profile1.png",
      name: "김철수",
      requestDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
    },
    {
      id: 2,
      imageUrl: "/profiles/profile2.png",
      name: "이영희",
      requestDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    },
    {
      id: 3,
      imageUrl: "/profiles/profile3.png",
      name: "박민준",
      requestDate: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    },
  ];

  // Use the dummy data instead of props
  const data = dummyData;

  return (
    // Wrap the elements in a single fragment
    <div className="flex flex-col max-w-[680px] mx-auto">
      <h1 className="text-3xl font-bold my-12 text-white">Item Components</h1>
      <ul className="space-y-2">
        {data.map((profile: Profile) => (
          <li key={profile.id}>
            <Item
              imageUrl={profile.imageUrl}
              name={profile.name}
              requestDate={new Date(profile.requestDate)}
              actions={<Button>소울링크 띄우기</Button>}
            />
          </li>
        ))}
      </ul>

      <h1 className="text-3xl font-bold my-12 text-white">Item Components</h1>
      <ul className="space-y-2">
        {data.map((profile: Profile) => (
          <li key={profile.id}>
            <Item
              imageUrl={profile.imageUrl}
              name={profile.name}
              requestDate={new Date(profile.requestDate)}
              actions={<Button>수락</Button>}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
