import HomeNav from "@/Components/Nav/HomeNav";
import Link from "next/link";
import styles from "../styles/Index.module.css";
import {IndexInfo} from "@/types";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import {updateAdditionalUserData} from "@/store/userSlice";
import {UserData} from "@/store/userSlice";
import {app} from "@/service/firebase";
import {useEffect, useState} from "react";
import convertToMoneyFormat from "@/utils/moneyFormat";
import dateFormatter from "@/utils/dateFormat";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/service/firebase";
import {login, logout} from "@/store/userSlice";
import {useAuth} from "@/hooks/useAuth";
import {calculateWinningProbability} from "@/utils/Score";
import classNames from "classnames";

const getGuFormAddress = (address: string) => {
  const guIndex = address.indexOf("구");
  const seoulIndex = address.indexOf("서울시");

  if (guIndex === -1) {
    return null;
  } else if (guIndex === 4) {
    return "서울시 구로구";
  }

  if (seoulIndex === -1) {
    return address.substring(0, guIndex + 1);
  }

  return address.substring(seoulIndex, guIndex + 1);
};

export default function Home() {
  const {user, loading} = useAuth();
  const [posts, setPosts] = useState<IndexInfo[]>([]);
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const [additionalDataFetched, setAdditionalDataFetched] = useState(false);

  useEffect(() => {
    const db = getFirestore(app);
    const collectionRef = collection(db, "house_info");

    const fetchData = async () => {
      const q = query(collectionRef, where("exposure", "==", true));
      const querySnapshot = await getDocs(q);
      const newPosts: IndexInfo[] = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();

          const deadlineAt =
            data.deadline_at instanceof Timestamp
              ? data.deadline_at.toDate()
              : new Date(data.deadline_at);

          return {
            id: doc.id,
            deadline_at: deadlineAt,
            address: data.address,
            category: data.category,
            deposit: data.deposit,
            rent: data.rent,
            area: data.area,
            exposure: data.exposure,
            age: data?.age,
            welfare: data?.welfare,
            location: data?.location,
            car: data?.car,
            compete: data?.compete,
            salary: data?.salary,
          };
        })
        .sort(
          (a, b) =>
            new Date(a.deadline_at).getTime() -
            new Date(b.deadline_at).getTime()
        );

      setPosts(newPosts);
    };

    fetchData();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    });

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
    return () => {
      unsubscribe();
    };
  }, [dispatch, userData.isLoggedIn, userData.userData?.uid]);

  if (loading) {
    return (
      <div className="w-full text-center font-bold">정보 불러오는 중...</div>
    );
  }

  return (
    <>
      <>
        <HomeNav />
        <div className={classNames(styles.container, "bg-[#fff]")}>
          <div className="w-[88%] m-auto">
            <div className="my-9">
              <div className="text-xl font-bold text-[#000]">공고 리스트</div>
            </div>

            <ul className="space-y-5 h-full w-full">
              {posts.map((post) => {
                let winningProbability;

                if (userData.isLoggedIn && additionalDataFetched) {
                  winningProbability = calculateWinningProbability({
                    welfare: post.welfare,
                    location: post.location,
                    salary: post.salary,
                    compete: post.compete,
                    userData: {
                      welfare: userData.userData?.welfare ?? null,
                      location: userData.userData?.location ?? null,
                      salary: userData.userData?.salary ?? null,
                    },
                  });
                  if (winningProbability !== null) {
                    winningProbability = Math.round(winningProbability);
                  }
                }

                return (
                  <li key={post.id}>
                    <Link
                      className="rounded-xl border-gray-200 border bg-white drop-shadow-sm
                h-160 flex items-center"
                      href={`detail/${post.id}`}
                    >
                      <div className="rounded-lg w-24 h-32 bg-[#007BFF] m-4 ">
                        <div className="flex flex-col justify-center items-center h-full">
                          <p className="font-medium text-sm text-white">
                            마감일
                          </p>
                          <p className="font-semibold text-3xl text-white">
                            {dateFormatter(post.deadline_at).month}월
                          </p>
                          <p className="font-semibold text-3xl text-white">
                            {dateFormatter(post.deadline_at).day}일
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-start">
                        <p className="text-xl font-semibold text-[#000DN]">
                          당첨 확률:{" "}
                          {winningProbability ? `${winningProbability}%` : "?"}
                        </p>
                        <div className="pt-1.5">
                          <p className="text-base text-[#444444]">
                            {getGuFormAddress(post.address)}
                          </p>
                          <p className="text-base text-[#444444]">
                            보증금 {convertToMoneyFormat(post.deposit)}원
                          </p>
                          <p className="text-base text-[#444444]">
                            월세 {convertToMoneyFormat(post.rent)}원
                          </p>
                          <p className="text-[#444444] text-sm">
                            {post.category}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    </>
  );
}
