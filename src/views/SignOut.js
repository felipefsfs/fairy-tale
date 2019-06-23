import React, {useContext, useEffect} from "react";
import { CurrentUserContext } from "../stores/CurrentUser";
import Loading from "../components/Loading";

export default function SignOut({ history }) {

  const current = useContext(CurrentUserContext);

  useEffect(() => {
      current.signOut();
      history.push("/");
      // eslint-disable-next-line
  },[]);

  return (
    <div className="container">
      <Loading size="big" />
    </div>
  );
}