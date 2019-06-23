import React, { useState } from "react";
import img_normal from "../images/btn_google_signin_light_normal_web.png";
import img_focus from "../images/btn_google_signin_light_focus_web.png";
import img_press from "../images/btn_google_signin_light_pressed_web.png";
import img_disabled from "../images/btn_google_signin_light_disabled_web.png";
 
export default function GoogleSocial({ signIn, loading_indc }) {
  const [imgInteraction, setImgInteraction] = useState("");

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="grey-text text-darken-2">Social</h4>
      </li>
      <li className="collection-item">
        <div>
          <img alt="Sign in with Google" 
            src={(loading_indc && img_disabled)
              ||(!imgInteraction && img_normal)
              ||(imgInteraction === "over"&& img_focus)
              ||(imgInteraction === "click"&& img_press)}
            onClick={() => signIn({ abort: !!loading_indc, google: true }) && 
              setImgInteraction("click")}
            onMouseOver={() => setImgInteraction("over")}
            onMouseOut={() => setImgInteraction("")}
            />
        </div>
      </li>
  </ul>
  );
}