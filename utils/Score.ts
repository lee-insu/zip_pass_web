export const calculateScore = (
  welfare: string,
  address: string,
  salary: string
) => {
  const welfareScore =
    welfare === "차상위계층" ? 5 : welfare === "한부모가족" ? 5 : 0;
  const addressScore = address === "A" ? 5 : 1;
  const salaryScore = salary === "200만 이하" ? 3 : 1;

  return welfareScore + addressScore + salaryScore;
};

export const calculateProbability = (totalScore: number) => {
  // 경쟁률을 반영한 확률 계산 (실제 상황에서는 이 값이 사용자들의 점수 분포와 당첨되기 위한 기준에 따라 달라집니다)
  const competitionRate = 5; // 임의의 경쟁률 값
  const maxScore = 13; // 복지(5) + 주소지(5) + 월급(3)
  const userProbability =
    (maxScore - totalScore) / (maxScore * competitionRate);

  return userProbability;
};
