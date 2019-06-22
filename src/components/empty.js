import React, { useContext, useEffect }  from "react";
import { CurrentUserContext } from "../stores/CurrentUser";

export default function Empty() {
    const current = useContext(CurrentUserContext);

    useEffect(() => {
        current.signOut();
    })
    return (
        <header className="App-header">
            <i className="material-icons">assessment</i>
            <p>
               Void
            </p>
        </header>
    );
}
