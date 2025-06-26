import { TrashIcon } from "@heroicons/react/solid";
import React from "react";
import Image from "next/image";

interface Props {
  src: string;
  index: number;
  onDelete: (index: number) => void;
}

const PictureCard = ({ src, onDelete, index }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <Image  height={200 } width={200} src={src} className="w-36 h-36 object-contain" alt="Uploaded" />
      <button
        className="mb-2"
        onClick={() => onDelete(index)}
      >
        <TrashIcon className="text-red-400 w-4" />
      </button>
    </div>
  );
};

export default PictureCard;
