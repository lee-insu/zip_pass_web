import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import {Question} from "@/questionsData";

interface AnswerInputProps {
  currentQuestion: Question;
  answer: string;
  handleAnswerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChoiceChange: (choice: string) => void;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  currentQuestion,
  answer,
  handleAnswerChange,
  handleChoiceChange,
}) => {
  if (currentQuestion.type === "text") {
    return (
      <input
        name="answer"
        type="text"
        value={answer}
        onChange={handleAnswerChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
    );
  } else if (currentQuestion.type === "number") {
    return (
      <input
        name="answer"
        type="number"
        placeholder="숫자만 입력해주세요"
        value={answer}
        onChange={handleAnswerChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
    );
  } else if (currentQuestion.type === "choice" && currentQuestion.choices) {
    return (
      <div className="space-y-2 mt-1">
        {currentQuestion.choices.map((choice) => (
          <button
            key={choice}
            type="button"
            onClick={() => handleChoiceChange(choice)}
            className={`block w-full p-2 text-left border border-gray-300 rounded-md ${
              answer.indexOf(choice) !== -1
                ? "bg-green-500 text-white"
                : "text-gray-700"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
    );
  } else if (currentQuestion.type === "range") {
    return (
      <div className="mx-3">
        <div className="mt-5">
          <InputRange
            minValue={currentQuestion.min || 3}
            maxValue={currentQuestion.max || 30}
            value={{
              min: parseInt(answer.split(",")[0]) || currentQuestion.min || 3,
              max: parseInt(answer.split(",")[1]) || currentQuestion.max || 30,
            }}
            onChange={(value) => setAnswer(`${value.min},${value.max}`)}
          />
        </div>
      </div>
    );
  }

  return null;
};
export default AnswerInput;
