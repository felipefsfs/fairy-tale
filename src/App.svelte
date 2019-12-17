<script>
	import "./sass/stylesheet.scss";
	import Lform from "./login.svelte";
	import Nav from "./Nav.svelte";
	export let name;

	let n =0
	function update() {
		n+= 1;
	}

	$: comp = () => {
		const x = 100;
		return n+x;
	};

	const nice = nice_func();
	function nice_func() {
		let h=99;
		return function inner(i=0) {
			 h -= i;
			 return h
		} 
	}
</script>

<main>
	<Nav />
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<div class="field">
		<div class="control">
			<input class="input" type="text" placeholder="Input">
		</div>
	</div>
	<button class="button is-primary" on:click={update}>click me {n}; {comp()}</button>
	<button class="button is-info" on:click={() => nice(-1)}>click me {nice()}</button>
	<Lform />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>