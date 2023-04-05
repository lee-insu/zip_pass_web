import {useAuth} from "@/hooks/useAuth";
import {RootState} from "@/store/store";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {doc, getFirestore, updateDoc} from "firebase/firestore";
import {app} from "@/service/firebase";

const questions = [
  {
    questionText: "당신의 만 나이를 적어주세요 (숫자만)",
    type: "text",
  },
  {
    questionText: "당신의 소득 수준은 어느 정도인가요?",
    type: "choice",
    choices: [
      "수익 없음",
      "100만원 미만",
      "200만원 미만",
      "300만원 미만",
      "400만원 미만",
    ],
  },
  {
    questionText: "기분 좋아요?",
    type: "text",
  },
  {
    questionText: "질문이 끝났어요! 아무말이나 적어주세요",
    type: "text",
  },

  // ... 추가 질문
];

const Personal: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const userUid = useSelector((state: RootState) => state.user.userData?.uid);
  const {user, loading} = useAuth();
  const [collectedAnswers, setCollectedAnswers] = useState<{
    age?: number;
    rich?: string;
    feel?: string;
  }>({});

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleChoiceChange = (choice: string) => {
    setAnswer(choice);
  };

  const saveToFirestore = async () => {
    if (!userUid) return;

    const updatedFields: {
      age?: number;
      rich?: string;
      feel?: string;
    } = {};
    if (collectedAnswers.age !== undefined) {
      updatedFields.age = collectedAnswers.age;
    }
    if (collectedAnswers.rich !== undefined) {
      updatedFields.rich = collectedAnswers.rich;
    }
    if (collectedAnswers.feel !== undefined) {
      updatedFields.feel = collectedAnswers.feel;
    }

    const userDocRef = doc(getFirestore(app), "users", userUid);
    try {
      await updateDoc(userDocRef, updatedFields);
      console.log("Successfully saved to Firestore");
    } catch (error) {
      console.error("Error saving to Firestore: ", error);
    }
  };

  const handleNext = () => {
    console.log(
      `Question: ${questions[currentQuestionIndex].questionText}, Answer: ${answer}`
    );

    if (currentQuestionIndex < questions.length - 1) {
      // 각 질문 유형에 대한 응답을 수집
      if (currentQuestionIndex === 0) {
        setCollectedAnswers((prev) => ({...prev, age: parseInt(answer)}));
      } else if (currentQuestionIndex === 1) {
        setCollectedAnswers((prev) => ({...prev, rich: answer}));
      } else if (currentQuestionIndex === 2) {
        setCollectedAnswers((prev) => ({...prev, feel: answer}));
      }

      setAnswer("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 마지막 질문에 대한 응답을 수집하고 Firestore에 저장
      if (currentQuestionIndex === questions.length - 1) {
        setCollectedAnswers((prev) => ({...prev, feel: answer}));
      }
      alert("All questions have been answered.");
      saveToFirestore();
    }
  };

  const renderAnswerInput = () => {
    const currentQuestion = questions[currentQuestionIndex];

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
    } else if (currentQuestion.type === "choice" && currentQuestion.choices) {
      return (
        <div className="space-y-2 mt-1">
          {currentQuestion.choices.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => handleChoiceChange(choice)}
              className={`block w-full p-2 text-left border border-gray-300 rounded-md ${
                answer === choice ? "bg-blue-500 text-white" : "text-gray-700"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="w-full text-center font-bold">정보 불러오는 중...</div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Personal Status Check</h1>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {questions[currentQuestionIndex].questionText}
        </label>
        {renderAnswerInput()}
      </div>
      <button
        type="button"
        onClick={handleNext}
        disabled={!answer}
        className={`mt-4 w-full p-2 font-medium rounded-md ${
          answer
            ? "bg-blue-500 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Personal;
