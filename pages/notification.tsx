import NotiNav from "@/Components/Nav/NotiNav";
import React from "react";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {app} from "@/service/firebase";
import {useEffect, useState} from "react";
import {NotificationInfo} from "@/types";
import Link from "next/link";

const Notification = () => {
  const [posts, setPosts] = useState<NotificationInfo[]>([]);

  useEffect(() => {
    const db = getFirestore(app);
    const collectionRef = collection(db, "notification");
    const fetchData = async () => {
      const p = query(
        collectionRef,
        where("exposure", "==", true),
        orderBy("deadline_at", "desc")
      );

      const q = query(collectionRef, where("exposure", "==", true));
      const querySnapshot = await getDocs(q);
      const newPosts: NotificationInfo[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          address: data.address,
          deadline_at: data.deadline_at,
          category: data.category,
          deposit: data.deposit,
          rent: data.rent,
          area: data.area,
          title: data.title,
          body: data.body,
          pageId: data.pageId,
          exposure: data.exposure,
        };
      });

      setPosts(newPosts);
    };

    fetchData();
  }, []);

  return (
    <>
      <NotiNav />
      <div className="w-[88%] m-auto">
        <div className="my-9 space-y-0.5">
          <div className="font-bold text-xl">이전 알림</div>
        </div>
        <ul className="space-y-8 h-full w-full">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                className="rounded-xl border-b border-gray-200 h-[80px] flex-col items-center "
                href={`/detail/${post.pageId}`}
              >
                <p className="font-semibold text-sm text-gray-600 mb-1">
                  {post.title}
                </p>
                <p className="font-bold text-lg text-gray-900">{post.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Notification;
