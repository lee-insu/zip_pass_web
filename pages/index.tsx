import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { async } from "@firebase/util";
import { app } from "@/service/firebase";

const db = getFirestore(app);
const collectionRef = collection(db, "house_info");

export default function Home() {
  const [postData, setPostData] = useState({
    content_id: "",
    started_at: "",
    deadline_at: "",
    location: "",
    title: "",
    description: "",
    img: "",
    price: "",
    announcement: "",
    url: "",
    case1: {},
    case2: {},
  });
  const [startedAt, setStartedAt] = useState("");
  const [deadlineAt, setDeadlineAt] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStartedAtChange = (e: any) => {
    const { value } = e.target;
    setStartedAt(value);
    setPostData((prevState) => ({ ...prevState, started_at: value }));
  };

  const handleDeadlineAtChange = (e: any) => {
    const { value } = e.target;
    setDeadlineAt(value);
    setPostData((prevState) => ({ ...prevState, deadline_at: value }));
  };

  const handleAddPost = async () => {
    try {
      const docRef = await addDoc(collectionRef, postData);
      console.log("Document written with ID: ", docRef.id);
      setPostData({
        content_id: "",
        started_at: "",
        deadline_at: "",
        location: "",
        title: "",
        description: "",
        img: "",
        price: "",
        announcement: "",
        url: "",
        case1: {},
        case2: {},
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <label htmlFor="started_at">content_id:</label>
        <input
          type="text"
          name="content_id"
          value={postData.content_id}
          onChange={handleInputChange}
        />
        <label htmlFor="started_at">location:</label>
        <input
          type="text"
          name="location"
          value={postData.location}
          onChange={handleInputChange}
        />
        <label htmlFor="started_at">title:</label>
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleInputChange}
        />
        <label htmlFor="started_at">description:</label>
        <input
          type="text"
          name="description"
          value={postData.description}
          onChange={handleInputChange}
        />
        <label htmlFor="started_at">Started at:</label>
        <input
          type="datetime-local"
          id="started_at"
          name="started_at"
          value={startedAt}
          onChange={handleStartedAtChange}
        />
        <label htmlFor="deadline_at">Deadline at:</label>
        <input
          type="datetime-local"
          id="deadline_at"
          name="deadline_at"
          value={deadlineAt}
          onChange={handleDeadlineAtChange}
        />

        <button onClick={handleAddPost}>Add Post</button>
      </div>
    </>
  );
}
