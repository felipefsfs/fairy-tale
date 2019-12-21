<script>
  import Field from "./field.svelte";
  import { fb_auth } from "../stores/firebase.js";
  $: auth = $fb_auth;
  $: if (!!auth) {
    auth().onAuthStateChanged(authUser => {
      if (!!authUser) {
        console.log(authUser);
      } else {
        console.log("no user");
      }
    });
  }

//const googleProvider = new auth.GoogleAuthProvider();

  async function signIn(email="", password="") {
    try {
      console.log(email, password, "signin");
      await auth().signInWithEmailAndPassword(email, password);
      console.log("signInWithEmailAndPassword Triggered");
    } catch(e) {
      errorHandler(e);
    }
    console.log(email, password, "signin END!");
  }

  async function signOut() {
    try {
      console.log("sign out");
      await auth().signOut();
      console.log("signOut Triggered");
    } catch(e) {
      errorHandler(e);
    }
    console.log( "sig out END!");;
  }

  function errorHandler(error) {
    const errorMessage = {};
    console.log("ERROR", error.code);
    console.log({ 
      code: error.code, 
      message: error.message,
      credential: (error.code === 'auth/account-exists-with-different-credential' &&
      error.credential) || errorMessage.credential,
      email: (error.code === 'auth/account-exists-with-different-credential' &&
      error.mail) || errorMessage.email 
    });
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
            <button class="button is-primary">click me</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>