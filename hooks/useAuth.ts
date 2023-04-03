import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {auth} from "@/service/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {RootState} from "@/store/store";
import {login, logout} from "@/store/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return {user, loading};
};
