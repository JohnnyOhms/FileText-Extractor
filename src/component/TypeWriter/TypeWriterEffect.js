import React, { useState, useEffect } from "react";

export const TypewriterEffect = () => {
  const arrayWords = [
    "text from Image files",
    "text from PDF files",
    "text from DOCX files",
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [charaIndex, setCharaIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const typeDelay = 150;
  const eraseDelay = 100;
  const newWordDelay = 1500;

  useEffect(() => {
    if (isTyping) {
      if (charaIndex < arrayWords[wordIndex].length) {
        setTimeout(typewrite, typeDelay);
      } else {
        setIsTyping(false);
        setTimeout(eraseWord, newWordDelay);
      }
    } else {
      if (charaIndex > 0) {
        setTimeout(eraseWord, eraseDelay);
      } else {
        setIsTyping(true);
        setWordIndex(
          (prevWordIndex) => (prevWordIndex + 1) % arrayWords.length
        );
        setTimeout(typewrite, typeDelay);
      }
    }
  }, [charaIndex, isTyping]);

  const typewrite = () => {
    setCharaIndex((prevCharaIndex) => prevCharaIndex + 1);
  };

  const eraseWord = () => {
    setCharaIndex((prevCharaIndex) => prevCharaIndex - 1);
  };

  return (
    <div>
      <span className="type-effect">
        {arrayWords[wordIndex].substring(0, charaIndex)}
      </span>
      <span className={`cursor ${isTyping ? "" : "stop-blink"}`}></span>
    </div>
  );
};
