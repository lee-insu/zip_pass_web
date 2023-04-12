type WinningProbabilityParams = {
  welfare: string | null;
  location: string | null;
  salary: string | null;
  compete: number | null;
  userData: {
    welfare: string | null;
    location: string | null;
    salary: string | null;
  };
};

export const calculateWinningProbability = ({
  welfare,
  location,
  salary,
  compete,
  userData,
}: WinningProbabilityParams): number | null => {
  if (!welfare || !location || !salary || !compete) return null;

  let score = 0;

  if (welfare === "있음") {
    if (
      userData.welfare === "차상위계층" ||
      userData.welfare === "한부모가족" ||
      userData.welfare === "수급자가족"
    ) {
      score += 5;
    }
  }

  if (location === "서울시") {
    if (userData.location === "서울시") {
      score += 3;
    }
  } else if (location === "지방") {
    if (userData.location && userData.location !== "서울시") {
      score += 3;
    }
  }

  if (salary === "200만원 이하" || salary === "100만원 미만") {
    if (
      userData.salary === "200만원 이하" ||
      userData.salary === "100만원 미만"
    ) {
      score += 2;
    }
  }

  const winningProbability = (score / (score + compete)) * 100;

  return winningProbability;
};
