<script>
    import Field from "./field.svelte";
    //import { signIn, signOut} from "./auth.js";
    let email;
    let password;

signIn=()=>{};
 signOut=()=> {};
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