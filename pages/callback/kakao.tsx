import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";

const Kakao = () => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const code = searchParams.get("code");

  const router = useRouter();
  const {query} = router;

  const code = query.code;

  if (!code) {
    return <Link href={"/login"} />;
  }

  return <div>callback page</div>;
};

export default Kakao;
