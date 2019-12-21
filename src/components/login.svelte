<script>
  import Field from "./field.svelte";
  import { functions, status, user } from "../stores/authentication.js";
  import img_normal from "../images/btn_google_signin_light_normal_web.png";
  import img_focus from "../images/btn_google_signin_light_focus_web.png";
  import img_press from "../images/btn_google_signin_light_pressed_web.png";
  import img_disabled from "../images/btn_google_signin_light_disabled_web.png";

  let email;
  let password;

  function submit_login() {
    console.log(email);
    console.log(password);
    if (!email && !password) {
      $functions.signOut();
      return;
    }
    $functions.signIn(email, password);
    email="";
    password="";
  }
</script>
<h2>{($user||{}).email}</h2>
<div class="container">
  <div class="card">
    <div class="card-content">
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
      <form on:submit|preventDefault="{submit_login}">
        <div class="field">
          <Field name="Email" email bind:value={email}></Field>
        </div>
        <div class="field">
          <Field name="Password" password bind:value={password}></Field>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" disabled={$status.waiting}>click me</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>