import Image from "next/image";
import React from "react";

const avatars = [
  "user.webp",
  "b2.webp",
  "b3.webp",
  "b4.webp",
  "b5.webp",
  "b6.webp",
  "b7.webp",
  "b8.webp",
  "g1.webp",
  "g2.webp",
  "g3.webp",
  "g4.webp",
  "g5.webp",
  "g6.webp",
  "g7.webp",
  "g8.webp",
];

interface AvatarSelectorProps {
  selectedAvatar: string;
  setSelectedAvatar: (avatar: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  selectedAvatar,
  setSelectedAvatar,
}) => {
  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  return (
    <div className="bg-white">
      <ul className="grid grid-cols-4 gap-4">
        {avatars.map((avatar) => (
          <li key={avatar}>
            <input
              type="radio"
              id={avatar}
              name="hosting"
              value={avatar}
              className="hidden peer"
              checked={selectedAvatar === avatar}
              onChange={() => handleAvatarSelect(avatar)}
              required
            />
            <label
              htmlFor={avatar}
              className={`flex flex-col items-center justify-center cursor-pointer w-20 h-20 rounded-2xl ${
                selectedAvatar === avatar
                  ? "border-primary border-4"
                  : "border-transparent"
              }`}
            >
              <div
                className={`w-16 h-w-16 border-2 rounded-full flex items-center justify-center`}
              >
                <Image
                  src={`/img/avatars/${avatar}`}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvatarSelector;
