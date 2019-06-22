
import { useEffect } from "react";
import localForage from "localforage";

export default function useLocal(key, states = [[]]) {
  const bad_format = (states[states.length - 1]||[])[1] === undefined;
  const state_list =  (!bad_format && states.map(([state]) => state)) || states[0];
  const setState_list =  (!bad_format && states.map(([,setState]) => setState)) || states[1];

  useEffect(() => {
    readDb();
    document.addEventListener("visibilitychange",handleVisibilityChange, false);
    return () => {
      document.removeEventListener(handleVisibilityChange)
    }

    function handleVisibilityChange() {
      if (!document.hidden) {
        readDb();
      }
    }
    
    function readDb() {
      if (!key) return;
      localForage.getItem(key).then(stored_list => {
        stored_list.forEach((v, index) => {
          if (!!setState_list[index] && typeof setState_list[index] === "function") {
            setState_list[index](v);
          }
        });
      }).catch(() => {
        console.log("new instance");
      });
    }// eslint-disable-next-line 
  }, []);

  useEffect(() => {
    if (!key) return;
    localForage.setItem(key, state_list).catch(() => {
      console.log("Problem w IndexDB");
    });// eslint-disable-next-line
  }, state_list);
}
