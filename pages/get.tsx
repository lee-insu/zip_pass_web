import React, { useEffect, useState } from "react";
import { HouseInfo } from "@/types";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { app } from "@/service/firebase";

const dateFormatter = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "오후" : "오전";
  return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일 ${ampm} ${
    hours % 12 || 12
  }시`;
};

const Get = () => {
  const [posts, setPosts] = useState<HouseInfo[]>([]);

  useEffect(() => {
    const db = getFirestore(app);
    const collectionRef = collection(db, "house_info");

    const fetchData = async () => {
      const querySnapshot = await getDocs(collectionRef);

      const newPosts: HouseInfo[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        const startedAt =
          data.started_at instanceof Timestamp
            ? data.started_at.toDate()
            : new Date(data.started_at);
        const deadlineAt =
          data.deadline_at instanceof Timestamp
            ? data.deadline_at.toDate()
            : new Date(data.deadline_at);

        return {
          id: doc.id,
          content_id: data.content_id,
          location: data.location,
          title: data.title,
          description: data.description,
          started_at: startedAt,
          deadline_at: deadlineAt,
          img: data.img,
          price: data.price,
          announcement: data.announcement,
          url: data.url,
          case1: data.case1,
          case2: data.case2,
        };
      });

      setPosts(newPosts);
    };

    fetchData();
  }, []);

  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.content_id}>
          <h2>{post.content_id}</h2>
          <p>{dateFormatter(post.started_at)}</p>
          <p>{dateFormatter(post.deadline_at)}</p>
          <p>{post.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Get;
