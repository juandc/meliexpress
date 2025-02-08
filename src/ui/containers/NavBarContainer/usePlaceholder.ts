import { useEffect, useState } from "react";

type Props = {
  placeholders: string[];
  shouldMove: boolean;
  speed?: number;
  finalSentenceWait?: number;
};

export const usePlaceholder = ({
  placeholders,
  shouldMove = true,
  speed = 100,
  finalSentenceWait = speed * 30,
}: Props) => {
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);

  const updateIndexes = () => {
    const currentSentence = placeholders[sentenceIndex];
    if (charIndex < currentSentence.length) {
      setCharIndex(charIndex + 1);
    } else {
      setTimeout(() => {
        setSentenceIndex((prevSentenceIndex) => (prevSentenceIndex + 1) % placeholders.length);
        setCharIndex(0);
      }, finalSentenceWait);
    }
  };

  useEffect(() => {
    if (shouldMove) {
      const timeout = setTimeout(() => {
        updateIndexes();
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, sentenceIndex, shouldMove]);
  // useEffect(() => {
  //   if (shouldMove) {
  //     const timeout = setTimeout(() => {
  //       setCharIndex((prevCharIndex) => {
  //         const currentSentence = placeholders[sentenceIndex];
  //         if (prevCharIndex < currentSentence.length) {
  //           return prevCharIndex + 1;
  //         } else {
  //           setTimeout(() => {
  //             setSentenceIndex((prevSentenceIndex) => (prevSentenceIndex + 1) % placeholders.length);
  //           }, speed * 3);
  //           return 0;
  //         }
  //       });
  //     }, speed);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [charIndex, sentenceIndex, shouldMove, speed]);

  const placeholder = placeholders[sentenceIndex].slice(0, charIndex).trim();
  return placeholder;
};
