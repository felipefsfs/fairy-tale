<script>
    export let name = "name";
    export let icon = "";
    export let number = false;
    export let date = false;
    export let email = false;
    export let password = false;

    export let v = "";

    $: inner = name.toLowerCase();
    $: icon_class = "fa-" + icon;

</script>

<div class="control" class:has-icons-left={!!icon}>
    <label class="label" for={inner}>{name}</label>
    {#if !!password}
        <input class="input" type="password" id={inner} bind:value={v}>
    {:else if  !!email}
        <input class="input" type="email" id={inner} placeholder={inner} bind:value={v}>
    {:else if  !!number}
        <input class="input" type="number" id={inner} bind:value={v}>
    {:else if  !!date}
        <input class="input" type="date" id={inner} bind:value={v}>
    {:else}
        <input class="input" type="text" id={inner} placeholder={inner} bind:value={v}>
    {/if}
    {#if !!icon}
    <span class="icon is-small is-left">
        <i class={"fas " + icon_class}></i>
    </span>
    {/if}
</div>