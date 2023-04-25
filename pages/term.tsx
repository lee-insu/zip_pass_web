import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const TermsPage = () => {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [detailedAgreed, setDetailedAgreed] = useState(false);
  const [thirdPartyAgreed, setThirdPartyAgreed] = useState(false);
  const [optionalAgreed, setOptionalAgreed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [showDetailsId, setShowDetailsId] = useState<string | null>(null);

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAgreed(checked);
    setDetailedAgreed(checked);
    setThirdPartyAgreed(checked);
    setOptionalAgreed(checked);
  };
  const handleDetailedAgreeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetailedAgreed(e.target.checked);
  };

  const handleOptionalAgreeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOptionalAgreed(e.target.checked);
  };

  const toggleDetails = (id: string) => {
    if (showDetailsId === id) {
      setShowDetailsId(null);
    } else {
      setShowDetailsId(id);
    }
  };

  useEffect(() => {
    if (detailedAgreed || thirdPartyAgreed || optionalAgreed) {
      setShowDetailsId(null);
    }
  }, [detailedAgreed, thirdPartyAgreed, optionalAgreed]);

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-4">
          가입 약관을 읽고 동의해주세요
        </h2>
        <h3 className="text-xl font-semibold mb-4">약관 동의</h3>
        <div className="my-4">
          <label
            htmlFor="agreeAll"
            className="inline-flex items-center text-lg"
          >
            <input
              id="agreeAll"
              type="checkbox"
              checked={agreed}
              onChange={handleAgreeChange}
              className="mr-2"
              style={{transform: "scale(1.2)"}}
            />
            전체동의
          </label>
        </div>
        <hr />
        <div className="mt-4 flex">
          <div className="flex-1 flex items-center">
            <label htmlFor="agreeDetails" className="text-lg">
              <input
                id="agreeDetails"
                type="checkbox"
                checked={detailedAgreed}
                onChange={handleDetailedAgreeChange}
                className="mr-2"
                style={{transform: "scale(1.2)"}}
              />
              개인정보 수집 및 이용 동의(필수)
            </label>
          </div>
          <button
            onClick={() => toggleDetails("agreeDetails")}
            className="text-blue-500 text-lg"
            style={{fontSize: "1.3em"}}
          >
            {showDetailsId === "agreeDetails" ? "▲" : "▼"}
          </button>
        </div>
        {showDetailsId === "agreeDetails" && (
          <div className="mt-2 ml-4">
            <p>이 약관은 ...</p>
          </div>
        )}
        <div className="mt-4 flex">
          <div className="flex-1 flex items-center">
            <label htmlFor="agreeThirdParty" className="text-lg">
              <input
                id="agreeThirdParty"
                type="checkbox"
                className="mr-2"
                checked={thirdPartyAgreed}
                onChange={() => setThirdPartyAgreed(!thirdPartyAgreed)}
                style={{transform: "scale(1.3)"}}
              />
              개인정보 제 3자 제공 동의(필수)
            </label>
          </div>
          <button
            onClick={() => toggleDetails("agreeThirdParty")}
            className="text-blue-500 text-lg"
            style={{fontSize: "1.3em"}}
          >
            {showDetailsId === "agreeThirdParty" ? "▲" : "▼"}
          </button>
        </div>
        {showDetailsId === "agreeThirdParty" && (
          <div className="mt-2 ml-4">
            <p>이 약관은 2...</p>
          </div>
        )}

        <div className="w-full mt-4 flex">
          <div className="flex-1 flex items-center">
            <label htmlFor="agreeMarketing" className="text-lg">
              <input
                id="agreeMarketing"
                type="checkbox"
                checked={optionalAgreed}
                onChange={handleOptionalAgreeChange}
                className="mr-2"
                style={{transform: "scale(1.3)"}}
              />
              이벤트/마케팅 수신 동의(선택)
            </label>
          </div>
          <button
            onClick={() => toggleDetails("agreeMarketing")}
            className="text-blue-500 text-lg"
            style={{fontSize: "1.3em"}}
          >
            {showDetailsId === "agreeMarketing" ? "▲" : "▼"}
          </button>
        </div>
        {showDetailsId === "agreeMarketing" && (
          <div className="mt-2 ml-4">
            <p>이 마케팅은 2...</p>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={() => {
              if (detailedAgreed && thirdPartyAgreed) {
                router.push({
                  pathname: "/signup",
                  query: {marketingAgreed: optionalAgreed},
                });
              }
            }}
            className={`w-full md:w-auto py-2 px-4 text-white ${
              detailedAgreed && thirdPartyAgreed
                ? "bg-blue-500"
                : "bg-blue-300 cursor-not-allowed"
            }`}
            disabled={!detailedAgreed || !thirdPartyAgreed}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};
export default TermsPage;
