export interface Question {
  questionText: string;
  subText?: string;
  type: "text" | "number" | "choice" | "range";
  multiple?: boolean;
  choices?: string[];
  min?: number;
  max?: number;
}

export const questions: Question[] = [
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
      "앖음",
      "오백만원 이하",
      "일천 만원 이하",
      "2천 만원 이하",
      "4천 만원 이하",
      "6천 만원 이하",
      "8천 만원 이하",
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
      "서울",
      "경기도",
      "충청도",
      "경상도",
      "전라도",
      "강원도",
      "광역시(특별자치시)",
    ],
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
