import React, {useEffect, useState} from "react";
import {GetServerSideProps} from "next";
import DetailNav from "@/Components/Nav/DetailNav";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import {app} from "@/service/firebase";
import {DetailInfo} from "@/types";
import convertToMoneyFormat from "@/utils/moneyFormat";
import exchangeArea from "@/utils/exchangeArea";
import dateFormatter from "@/utils/dateFormat";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import dynamic from "next/dynamic";
import {useAuth} from "@/hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {calculateWinningProbability} from "@/utils/Score";
import {UserData} from "@/store/userSlice";
import {updateAdditionalUserData} from "@/store/userSlice";

interface DetailProps {
  NoticeData: DetailInfo;
}

const Detail = ({NoticeData}: DetailProps) => {
  const dispatch = useDispatch();
  const {user, loading} = useAuth();
  const userData = useSelector((state: RootState) => state.user);
  const [winningProbability, setWinningProbability] = useState<number | null>(
    null
  );
  const [additionalDataFetched, setAdditionalDataFetched] = useState(false);
  const Viewer = dynamic(
    () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
    {
      ssr: false,
    }
  );

  const timeFormat = (date: string) => {
    const DateInfo = new Date(date);
    const year = dateFormatter(DateInfo).year;
    const month = dateFormatter(DateInfo).month;
    const day = dateFormatter(DateInfo).day;
    const hours = dateFormatter(DateInfo).hours;
    const timeform = dateFormatter(DateInfo).timeFormat;

    return `${month}월 ${day}일 ${timeform} ${hours}시`;
  };

  useEffect(() => {
    if (userData.isLoggedIn && userData.userData) {
      const calculatedProbability = calculateWinningProbability({
        welfare: NoticeData.welfare,
        location: NoticeData.location,
        salary: NoticeData.salary,
        compete: NoticeData.compete,
        userData: {
          welfare: userData.userData?.welfare ?? null,
          location: userData.userData?.location ?? null,
          salary: userData.userData?.salary ?? null,
        },
      });
      setWinningProbability(
        calculatedProbability ? Math.round(calculatedProbability) : null
      );
    }
    if (user) {
      const fetchAdditionalData = async () => {
        if (userData.isLoggedIn && userData.userData?.uid) {
          const db = getFirestore(app);
          const userDocRef = doc(db, "users", userData.userData.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const additionalData: Partial<UserData> = {
              age: userDoc.data().age,
              location: userDoc.data().location,
              house: userDoc.data().house,
              contract: userDoc.data().contract,
              deposit: userDoc.data().deposit,
              monthly: userDoc.data().monthly,
              area: userDoc.data().area,
              room: userDoc.data().room,
              live: userDoc.data().live,
              welfare: userDoc.data().welfare,
              salary: userDoc.data().salary,
              job: userDoc.data().job,
              car: userDoc.data().car,
            };

            dispatch(updateAdditionalUserData(additionalData));
            setAdditionalDataFetched(true);
          }
        }
      };
      fetchAdditionalData();
    }
  }, [
    dispatch,
    userData.isLoggedIn,
    userData.userData?.uid,
    additionalDataFetched,
  ]);

  if (loading) {
    return (
      <div className="w-full text-center font-bold">정보 불러오는 중...</div>
    );
  }

  return (
    <>
      <DetailNav />
      <div className="w-[88%] m-auto">
        <div className="my-9">
          <div className="text-xl font-bold mb-3">신청 기간</div>
          <p className="text-xl text-gray-600 font-medium mb-0.5">
            {timeFormat(NoticeData.started_at)} ~
          </p>
          <p className="text-xl text-gray-600 font-medium">
            {timeFormat(NoticeData.deadline_at)}
          </p>
        </div>
        <div className="mb-9">
          <div className="text-xl font-bold mb-2">당첨 확률</div>
          <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
            {winningProbability !== null ? (
              <>
                <div
                  className="absolute rounded-full inset-0 bg-green-500"
                  style={{width: `${winningProbability}%`}}
                ></div>
                <div className="absolute inset-0 text-gray-600 text-center flex items-center justify-center">
                  {winningProbability}%
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute rounded-full inset-0 bg-green-500"
                  style={{width: `0%`}}
                ></div>
                <div className="absolute inset-0 text-gray-600 text-center flex items-center justify-center">
                  로그인 후 개인 정보를 입력하세요
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <p className=" w-full h-[16px] bg-[#F2F4F6]"></p>
      <div className="w-[88%] m-auto">
        <ul className="w-full h-full ">
          <li className="relative border-b border-gray-200 w-full h-20 flex items-center space-x-4">
            <p>주소</p>
            <p className="absolute left-12">{NoticeData.address}</p>
          </li>
          <li className="relative border-b border-gray-200 w-full h-20 flex items-center space-x-4">
            <p>보증금</p>
            <p className="absolute left-12">
              {convertToMoneyFormat(NoticeData.deposit)}원
            </p>
          </li>
          <li className="relative border-b border-gray-200 w-full h-20 flex items-center space-x-4">
            <p>월세</p>
            <p className="absolute left-12">
              {convertToMoneyFormat(NoticeData.rent)}원
            </p>
          </li>
          <li className="relative border-b border-gray-200 w-full h-20 flex items-center space-x-4">
            <p>평수</p>
            <p className="absolute left-12">
              {exchangeArea(NoticeData.area)}평
            </p>
          </li>
        </ul>
      </div>
      <p className=" w-full h-[16px] bg-[#F2F4F6]"></p>
      <div className="w-[88%] m-auto">
        <div className="my-9 space-y-0.5"></div>
        <Viewer initialValue={NoticeData.detail || " "} />
      </div>
    </>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps<DetailProps> = async (
  context
) => {
  const id = context.params?.id as string;

  const firestore = getFirestore(app);
  const houseInfoRef = doc(firestore, "house_info", id);
  const docSnap = await getDoc(houseInfoRef);

  if (!docSnap.exists()) {
    return {
      notFound: true,
    };
  }

  const detailInfo = docSnap.data() as DetailInfo;

  let NoticeData: DetailInfo = {
    started_at: detailInfo.started_at.toString(),
    deadline_at: detailInfo.deadline_at.toString(),
    address: detailInfo.address,
    category: detailInfo.category,
    deposit: detailInfo.deposit,
    rent: detailInfo.rent,
    area: detailInfo.area,
    url: detailInfo.url,
    detail: detailInfo.detail,
    age: detailInfo?.age,
    welfare: detailInfo?.welfare,
    location: detailInfo?.location,
    car: detailInfo?.car,
    compete: detailInfo?.compete,
    salary: detailInfo?.salary,
  };

  return {
    props: {NoticeData},
  };
};
