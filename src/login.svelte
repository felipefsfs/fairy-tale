<script>
    import Field from "./field.svelte";

    let email;
    let password;

    function submit_login() {
        console.log(email);
        console.log(password);
    }
</script>

<div class="container">
    <div class="card">
        <div class="card-content">
            <form on:submit|preventDefault="{submit_login}">
                <div class="field">
                    <Field name="Email" email bind:v={email}></Field>
                </div>
                <div class="field">
                    <Field name="Password" password bind:v={password}></Field>
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