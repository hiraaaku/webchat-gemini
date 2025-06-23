import Image from "next/image";
import React, { useRef, useEffect } from "react";

type Props = {
  src: string;
  fallbackSrc: string;
  alt: string;
};

const PATH = "http://34.128.98.251:5000/";

export default function ImageMessage({ src, fallbackSrc, alt }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);

  const absoluteSrc = src.includes(PATH) ? src : `${PATH}${src}`;

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onerror = () => {
        if (imageRef.current) {
          imageRef.current.src = fallbackSrc;
        }
      };
    }
  }, [fallbackSrc]);

  return (
    <Image
      src={absoluteSrc}
      alt={alt}
      width={300}
      height={250}
      className="object-cover"
      ref={imageRef}
    />
  );
}
