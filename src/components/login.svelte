<script>
  import Field from "./field.svelte";
  import { functions, status, user } from "../stores/authentication.js";

  const img_normal = "btn_google_signin_light_normal_web.png";
  const img_focus = "btn_google_signin_light_focus_web.png";
  const img_press = "btn_google_signin_light_pressed_web.png";
  const img_disabled = "btn_google_signin_light_disabled_web.png";

  let google_img = img_normal;
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
  
  function submit_google() {
    if ($status.waiting) return;
    $functions.signInGoogle();
    google_img = img_press;
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
          src={google_img}
          on:click={() => submit_google()}
          on:mouseover={() => google_img = img_focus}
          on:mouseout={() => google_img = img_normal}
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
<h2>{$status.waiting && "waiting"}</h2>
<h2>{($status.error||{}).code}</h2>
<h2>{($status.error||{}).message}</h2>