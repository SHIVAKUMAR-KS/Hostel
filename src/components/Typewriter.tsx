import { useEffect, useState } from "react";

const phrases = [
  { normal: "Hostel", bold: "Living" },
  { normal: "Comfort", bold: "Guaranteed" },
  { normal: "Book Now,", bold: "Stay Smart" },
];

const Typewriter = () => {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = `${phrases[phraseIndex].normal} ${phrases[phraseIndex].bold}`;
    const delay = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setTypedText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  const normalPart = phrases[phraseIndex].normal;
  const boldPart = phrases[phraseIndex].bold;

  let renderedNormal = "";
  let renderedBold = "";

  if (typedText.length <= normalPart.length) {
    renderedNormal = typedText;
  } else {
    renderedNormal = normalPart;
    renderedBold = typedText.slice(normalPart.length + 1); // +1 for space
  }

  return (
    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins mb-4 sm:mb-6 animate-fade-in text-center bg-gradient-to-r from-[#A000D8] via-[#FF1493] to-[#FF0000] bg-clip-text text-transparent
">
      Experience Premium
      <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2">
        <span className="bg-gradient-to-r from-[#A000D8]  bg-clip-text text-transparent
">{renderedNormal} </span>
        <span className="font-extrabold text-accent">{renderedBold}</span>
        <span className="animate-blink text-white">|</span>
      </span>
    </h1>
  );
};

export default Typewriter;
