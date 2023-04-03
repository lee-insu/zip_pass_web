import {RootState} from "@/store/store";
import {
  collection,
  doc,
  getFirestore,
  addDoc,
  updateDoc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {app} from "@/service/firebase";

const DetailNav = () => {
  const router = useRouter();
  const userStatus = useSelector((state: RootState) => state.user);
  const db = getFirestore(app);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);

  const handleBookmarkClick = async () => {
    if (userStatus?.isLoggedIn) {
      const uid = userStatus.userData?.uid;
      const params = router.query.id as string;

      const bookmarkRef = doc(db, `users/${uid}/bookmarks`, params);

      const bookmarkData = {
        url: router.asPath,
      };

      if (bookmarkStatus) {
        // 북마크가 활성화 된 경우, Firestore에서 문서를 삭제합니다.
        await deleteDoc(bookmarkRef);
      } else {
        // 북마크가 비활성화 된 경우, Firestore에 문서를 추가합니다.
        await setDoc(bookmarkRef, bookmarkData);
      }

      // 북마크 상태를 토글합니다.
      setBookmarkStatus(!bookmarkStatus);
    } else {
      router.push("/auth");
    }
  };

  const checkBookmark = async () => {
    if (userStatus?.isLoggedIn) {
      const uid = userStatus.userData?.uid;
      const params = router.query.id as string;

      const bookmarksCollection = collection(db, `users/${uid}/bookmarks`);
      const q = query(bookmarksCollection, where("__name__", "==", params));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setBookmarkStatus(true);
      } else {
        setBookmarkStatus(false);
      }
    }
  };

  useEffect(() => {
    checkBookmark();
  }, [bookmarkStatus]);
  return (
    <nav className="fixed top-0 left-0 z-10 w-full h-[91px]">
      <div className="max-w-[820px] mx-auto h-full flex bg-[#FAFCFB] border-b-2 border-gray-100 justify-between items-center px-6">
        <div className="nav-left flex space-x-4 ">
          <Link href={"/"}>
            <Image
              className="pt-2"
              src="/images/back.svg"
              alt="뒤로가기"
              width={17}
              height={17}
            />
          </Link>
          <div className="text-xl font-semibold">공고 요약</div>
        </div>
        <div className="nav-right flex space-x-12">
          <Image
            src={
              bookmarkStatus
                ? "/images/bookmark_filled.svg"
                : "/images/bookmark.svg"
            }
            alt="북마크"
            width={24}
            height={24}
            onClick={handleBookmarkClick}
          />
          <Image
            src="/images/share.svg"
            alt="공유하기"
            width={22}
            height={22}
          />
        </div>
      </div>
    </nav>
  );
};

export default DetailNav;
