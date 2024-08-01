import React, { useState } from "react";
import { InterviewQuestion } from "../App";

export default function FlashCard({ question, answer }: InterviewQuestion) {
  const [flipped, setIsFlipped] = useState(false);
  return (
    <div onClick={() => setIsFlipped((prev) => !prev)}>
      {!flipped && <p>{question}</p>}
      {flipped && <p>{answer}</p>}
    </div>
  );
}
