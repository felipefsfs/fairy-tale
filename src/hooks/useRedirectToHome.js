import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../stores/CurrentUser";

export default function useRedirectToHome(history) {
  const { user, waiting } = useContext(CurrentUserContext);

  useEffect(() =>{
    console.log([user, history])
    if (!(user||{}).uid && !waiting) {
      history.push("/");
    }
  },[user, waiting, history]);

}