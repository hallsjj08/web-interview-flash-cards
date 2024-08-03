import React, { useState } from "react";
import { InterviewQuestion } from "../App";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function FlashCard({ question, answer }: InterviewQuestion) {
  const [flipped, setIsFlipped] = useState(false);
  return (
    <div onClick={() => setIsFlipped((prev) => !prev)}>
      {!flipped && <p>{question}</p>}
      {flipped && (
        <ReactMarkdown
          children={answer}
          components={{
            code({ node, className, children, style, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !node?.properties.inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  PreTag="div"
                  style={atomDark}
                  // {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      )}
    </div>
  );
}
