<script>
  import { fade } from 'svelte/transition';
  import Field from "../components/field.svelte";
  import Google from "../components/social_google.svelte";
  import { functions, status } from "../stores/authentication.js";
  
  let email;
  let password;

  function submit_login() {
    console.log(email);
    console.log(password);
    if (!email && !password) {
      return;
    }
    $functions.signIn(email, password);
    email="";
    password="";
  }
  
  function submit_google() {
    if ($status.waiting) return;
    $functions.signInGoogle();
    email="";
    password="";
  }
</script>
<div class="container columns" transition:fade="{{delay: 0, duration: 300}}" >
  <div class="card column is-half is-offset-one-quarter">
    <div class="card-content">
      <Google on:click={submit_google} hold={$status.waiting}/>
      <form on:submit|preventDefault="{submit_login}">
        <div class="field">
          <Field name="Email" email bind:value={email}></Field>
        </div>
        <div class="field">
          <Field name="Password" password bind:value={password}></Field>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" disabled={$status.waiting}>Sign In</button>
          </div>
          {#if !!($status.error||{}).message}
          <p transition:fade="{{delay: 100, duration: 200}}" class="help is-danger">{$status.error.message}</p>
          {/if}
        </div>
      </form>
    </div>
  </div>
</div>