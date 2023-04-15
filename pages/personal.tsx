import {useAuth} from "@/hooks/useAuth";
import {RootState} from "@/store/store";
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {doc, getFirestore, updateDoc} from "firebase/firestore";
import {app} from "@/service/firebase";
import {useRouter} from "next/router";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const questions = [
  {
    questionText: "만 나이가 어떻게 되나요?",
    type: "number",
  },
  {
    questionText: "선호하는 위치를 알려주세요",
    type: "choice",
    multiple: true,
    choices: [
      "서울시 전체",
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
  },
  {
    questionText: "살고 싶은 집은 어떻게 되나요?",
    type: "choice",
    multiple: true,
    choices: ["아파트", "빌라", "오피스텔"],
  },
  {
    questionText: "선호하는 계약은 어떻게 되나요?",
    type: "choice",
    multiple: true,
    choices: ["전세", "월세"],
  },
  {
    questionText: "낼 수 있는 최대 보증금을 적어주세요",
    subText: "없거나 해당하지 않으면 '없음'을 눌러주세요",
    type: "choice",
    multiple: false,
    choices: [
      "없음",
      "오백만원 이하",
      "1천만원 이하",
      "2천만원 이하",
      "4천만원 이하",
      "6천만원 이하",
      "8천만원 이하",
      "1억원 이하",
      "1억 2천만원 이하",
      "1억 4천만원 이하",
      "1억 6천만원 이하",
      "1억 8천만원 이하",
      "1억 8천만원 초과",
    ],
  },
  {
    questionText: "낼 수 있는 월세를 적어주세요 (이자 포함)",
    subText: "없거나 해당하지 않으면 '없음'을 눌러주세요",
    type: "choice",
    multiple: false,
    choices: [
      "없음",
      "10만원 이하",
      "20만원 이하",
      "40만원 이하",
      "60만원 이하",
      "80만원 이하",
      "100만원 이하",
      "100만원 초과",
    ],
  },
  {
    questionText: "원하는 평수 범위를 알려주세요 (3~30)",
    type: "range",
    min: 3,
    max: 30,
  },
  {
    questionText: "원하는 방의 개수를 알려주세요 (최대)",
    type: "choice",
    multiple: false,
    choices: ["1", "2", "3"],
  },
  {
    questionText: "지금 살고 있는 곳은 어디인가요?",
    type: "choice",
    multiple: false,
    choices: [
      "서울시",
      "경기도",
      "충청도",
      "경상도",
      "전라도",
      "강원도",
      "광역시(특별자치시)",
    ],
  },
  {
    questionText: "현재 해당하는 것이 있나요?",
    type: "choice",
    multiple: false,
    choices: ["수급자가족", "한부모가족", "차상위계층", "해당없음(잘 모름)"],
  },
  {
    questionText: "월소득이 얼마인가요?",
    type: "choice",
    multiple: false,
    choices: [
      "없음",
      "100만원 미만",
      "200만원 이하",
      "300만원 이하",
      "400만원 이하",
    ],
  },
  {
    questionText: "나의 현재 직업은 무엇인가요?",
    type: "choice",
    multiple: false,
    choices: ["없음", "대학생", "취업준비생", "사회초년생"],
  },
  {
    questionText: "내 소유의 차가 있나요?",
    type: "choice",
    multiple: false,
    choices: ["네", "아니요"],
  },

  {
    questionText: "여러분에게 맞는 공고 알려드릴게요!",
    subText: "'나의 맞춤 공고'에서 언제든지 수정할 수 있어요",
    type: "choice",
    multiple: false,
    choices: ["알겠습니다"],
  },

  // ... 추가 질문
];

const Personal: React.FC = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const userUid = useSelector((state: RootState) => state.user.userData?.uid);
  const {user, loading} = useAuth();
  const [collectedAnswers, setCollectedAnswers] = useState<{
    age?: number;
    location?: string;
    house?: string;
    contract?: string;
    deposit?: string;
    monthly?: string;
    area?: string;
    room?: string;
    live?: string;
    welfare?: string;
    salary?: string;
    job?: string;
    car?: string;
  }>({});

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleChoiceChange = (choice: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedChoices = answer
      ? answer.split(",").filter((c) => c !== "")
      : [];
    const isSelected = selectedChoices.indexOf(choice) !== -1;

    if (isSelected) {
      setAnswer(selectedChoices.filter((c) => c !== choice).join(","));
    } else {
      if (currentQuestion.multiple) {
        setAnswer([...selectedChoices, choice].join(","));
      } else {
        setAnswer(choice);
      }
    }
  };

  const saveToFirestore = async () => {
    if (!userUid) return;

    const updatedFields = {...collectedAnswers};

    const userDocRef = doc(getFirestore(app), "users", userUid);
    try {
      await updateDoc(userDocRef, updatedFields);
    } catch (error) {}
  };

  const handleNext = () => {
    const questionKeys = [
      "age",
      "location",
      "contract",
      "house",
      "deposit",
      "monthly",
      "area",
      "room",
      "live",
      "welfare",
      "salary",
      "job",
      "car",
      "yes",
    ];

    if (currentQuestionIndex < questions.length - 1) {
      const key = questionKeys[currentQuestionIndex];
      const value = key === "age" ? parseInt(answer) : answer;
      setCollectedAnswers((prev) => ({...prev, [key]: value}));

      setAnswer("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const key = questionKeys[currentQuestionIndex];
      setCollectedAnswers((prev) => ({...prev, [key]: answer}));

      alert("적어주신 정보로 알려드릴게요!");
      saveToFirestore();
      router.push("/");
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
                max:
                  parseInt(answer.split(",")[1]) || currentQuestion.max || 30,
              }}
              onChange={(value: any) => setAnswer(`${value.min},${value.max}`)}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    if (questions[currentQuestionIndex].type === "choice") {
      const selectedChoices = answer
        ? answer.split(",").filter((c) => c !== "")
        : [];
    }
  }, [answer, currentQuestionIndex]);

  if (loading) {
    return (
      <div className="w-full text-center font-bold">정보 불러오는 중...</div>
    );
  }

  return (
    <div className="container min-h-screen mx-auto p-4">
      <div className="mt-5">
        <label className="block text-xl font-bold mb-4">
          {questions[currentQuestionIndex].questionText}
        </label>
        {questions[currentQuestionIndex].subText ? (
          <label className="mt-1 block text-sm font-medium text-gray-500">
            {questions[currentQuestionIndex].subText}
          </label>
        ) : null}
        {renderAnswerInput()}
      </div>
      <button
        type="button"
        onClick={handleNext}
        disabled={!answer}
        className={`mt-10 w-full p-2 font-medium rounded-md ${
          answer
            ? "bg-green-500 text-white hover:bg-green-700"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default Personal;
