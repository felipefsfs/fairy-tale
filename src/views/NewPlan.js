import React, { useState, useEffect, useRef, useContext } from "react";
import useRedirectToHome from "../hooks/useRedirectToHome";
import useFirestore from "../hooks/useFirestore";
import UnctrlInput from "../components/UnctrlInput";
import CtrlInput from "../components/CtrlInput";
import CtrlChkBox from "../components/CtrlChkBox";
import CtrlSelect from "../components/CtrlSelect";
import SubmitButton from "../components/SubmitButton";
import { CurrentUserContext } from "../stores/CurrentUser";

const options = ["Choose the recurrency...", 
  "Daily", "Weekly", "Monthly", "Bimonthly", 
  "Quarterly", "Semiannual", "Annual", "None"];

export default function NewPlan({history}) {
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [planpublic, setPlanpublic] = useState(false);
  const [recurrency, setRecurrency] = useState("");
  const dateStartRef = useRef(null);
  const dateEndRef = useRef(null);
  
  const { user } = useContext(CurrentUserContext);
  const [{ working }, { add }] = useFirestore();
  useRedirectToHome(history);

  useEffect(() =>{
    console.log("working", working);
  },[working]);

  useEffect(() =>{
    if (name === "") {
      setErrorMsg("Plan Name is mandatory");
    } else if (desc === "") {
      setErrorMsg("Plan Description is mandatory");
    }else {
      setErrorMsg("");
    }
  },[name, desc]);

  return (
    <div className="container">
      <div className="card-panel">
        <h4 className="grey-text text-darken-3">Create New Plan</h4>
        <form onSubmit={submit} className="white">
          <CtrlInput value={name} setValue={setName} inputId="plannameId">
            Plan Name
          </CtrlInput>
          <CtrlInput value={desc} setValue={setDesc} inputId="descId">
            Plan Description
          </CtrlInput>
          <UnctrlInput ref={dateStartRef} inputId="datestartId" extraClasses="datepicker">
            Date Start
          </UnctrlInput>
          <CtrlSelect value={recurrency} setValue={setRecurrency} options={options} inputId="recurrentId">
              Recurrency
          </CtrlSelect>
          <div className={((recurrency !== "None" && recurrency !== "") && "hidden")|| undefined}>
            <UnctrlInput ref={dateEndRef} inputId="dateendId" extraClasses="datepicker">
              Date End
            </UnctrlInput>
          </div>
          <CtrlChkBox value={planpublic} setValue={setPlanpublic} type="checkbox" inputId="planpublicId">
            Public
          </CtrlChkBox>
          <SubmitButton message={errorMsg}  disabled={errorMsg.substr(0,4) === "Plan"} loading_indc={false}>
            Create
          </SubmitButton>
        </form>
      </div>
    </div>
  );
  function submit(event) {
    event.preventDefault();
    const dstart = dateStartRef.current.value;
    const dend = dateEndRef.current.value;
    const rec = !!recurrency && recurrency !== "None";

    if (!dstart) {
      setErrorMsg("Date Start is mandatory");
      return;
    } else if (!dend && !rec) {
      setErrorMsg("If not Recurrent Date End is mandatory");
      return;
    } 

    const document = {
      name,
      desc,
      date_start: dstart,
      creation_date: Date.now().valueOf(),
      created_by: {
        uid: user.uid,
        displayName: user.displayName
      }
    };
    if (planpublic) document.public = true;
    if (rec) {
      document.recurrency = recurrency;
      document.date_end = computedEndDate(dstart, recurrency);
    } else {
      document.date_end = dend;
    }
    add(["plans"], document).then(console.log).catch(console.log);
    setRecurrency("");
    setName("");
    setDesc("");
  }

  function computedEndDate(startDate, recur) {
    const [y, m, d] = startDate.split("-");
    const tempDate = new Date();
    tempDate.setDate(d);
    tempDate.getMonth(m);
    tempDate.getFullYear(y);
    const endDate = (recur === "Daily" && tempDate.setDate(tempDate.getDate()+1)) ||
      (recur === "Weekly" && tempDate.setDate(tempDate.getDate()+7)) ||
      (recur === "Monthly" && tempDate.setMonth(tempDate.getMonth()+1)) ||
      (recur === "Bimonthly" && tempDate.setMonth(tempDate.getMonth()+2)) ||
      (recur === "Quarterly" && tempDate.setMonth(tempDate.getMonth()+3)) ||
      (recur === "Semiannual" && tempDate.setMonth(tempDate.getMonth()+6)) ||
      (recur === "Annual" && tempDate.setFullYear(tempDate.getFullYear()+1)) ||
      tempDate;
    console.log(tempDate, endDate);
    return `${tempDate.getFullYear()}-${(tempDate.getMonth()+1).toString().padStart(2,"0")}-${tempDate.getDate().toString().padStart(2,"0")}`;
  }
}