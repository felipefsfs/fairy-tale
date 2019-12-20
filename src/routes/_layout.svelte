<script>
	import Nav from '../components/Nav.svelte';
	import {init} from "../stores/firebase.js";
	export let segment;

	function l() {
		console.log("loaded");
		init();
	}
</script>

<style>
	main {
		text-align: center;
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
<svelte:head>
  <script src="https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js" on:load={l}></script>
  <script src="https://www.gstatic.com/firebasejs/7.6.0/firebase-auth.js" on:load={l}></script>
  <script src="https://www.gstatic.com/firebasejs/7.6.0/firebase-firestore.js" on:load={l}></script>
</svelte:head>
