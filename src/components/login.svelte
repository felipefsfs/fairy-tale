<script>
  import Field from "./field.svelte";
  import { firebase, status, user } from "../stores/authentication.js";

  async function signIn(email="", password="") {
    try {
      console.log(email, password, "signin");
      await $firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("signInWithEmailAndPassword Triggered");
    } catch(e) {
      console.log(e);
    }
    console.log(email, password, "signin END!");
  }

  async function signOut() {
    try {
      console.log("sign out");
      await $firebase.auth().signOut();
      console.log("signOut Triggered");
    } catch(e) {
      console.log(e);
    }
    console.log( "sig out END!");;
  }


  let email;
  let password;

  function submit_login() {
    console.log(email);
    console.log(password);
    if (!email && !password) {
      signOut();
      return;
    }
    signIn(email, password);
    email="";
    password="";
  }
</script>
<h2>{($user||{}).email}</h2>
<div class="container">
  <div class="card">
    <div class="card-content">
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