import React, { useEffect, useState } from "react";
import { ErrorResponse, ResponseData } from "./helpers/fetch";
import FlashCard from "./components/FlashCard";

const REACT_INTERVIEW_QUESTIONS_URL = "/src/data/react-questions.json";
const JAVASCRIPT_INTERVIEW_QUESTIONS_URL =
  "/src/data/javascript-questions.json";

export interface InterviewQuestion {
  question: string;
  answer: string;
}

async function fetchInterviewQuestions(
  url: URL,
  cb: (responseData: ResponseData<InterviewQuestion[]>) => void
) {
  let responseData: ResponseData<InterviewQuestion[]> = {
    hasError: false,
  };

  try {
    const response = await fetch(JAVASCRIPT_INTERVIEW_QUESTIONS_URL);
    if (response.ok) {
      const questions = await response.json();
      responseData.data = questions;
    } else {
      responseData = {
        hasError: true,
        errorResponse: {
          title: "Oops",
          message: "We messed up. Sorry!",
        },
      };
    }
  } catch (e) {
    responseData = {
      hasError: true,
      errorResponse: {
        title: "Oops",
        message: "We messed up. Sorry!",
      },
    };
  }

  cb(responseData);
}

function App() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [error, setError] = useState<ErrorResponse | undefined>();

  useEffect(() => {
    fetchInterviewQuestions(
      new URL(
        "https://api.github.com/repos/sudheerj/reactjs-interview-questions/contents/README.md"
      ),
      ({ hasError, data, errorResponse }) => {
        if (!hasError) {
          setQuestions(data ?? []);
        } else {
          setError(errorResponse);
        }
      }
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      {questions.length > 0 && selectedQuestionIndex > 0 && (
        <button
          onClick={() => setSelectedQuestionIndex((prev) => (prev = prev - 1))}
        >
          Previous
        </button>
      )}
      {questions.length > 0 && (
        <FlashCard {...questions[selectedQuestionIndex]} />
      )}
      {questions.length > 0 && selectedQuestionIndex < questions.length && (
        <button
          onClick={() => setSelectedQuestionIndex((prev) => (prev = prev + 1))}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default App;
