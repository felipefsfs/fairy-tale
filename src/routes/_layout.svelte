<script>
	import Nav from '../components/Nav.svelte';
	import { loaded } from "../stores/firebase_init.js";
	export let segment;

	function track_firebase_load(n=0) {
		return function inner() {
			n-=1;
			if (n == 0) {
				loaded.set(true);
			}
		}
	};
	const track = track_firebase_load(3);
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
  <script src="https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js" on:load={track}></script>
  <script src="https://www.gstatic.com/firebasejs/7.6.0/firebase-auth.js" on:load={track}></script>
  <script src="https://www.gstatic.com/firebasejs/7.6.0/firebase-firestore.js" on:load={track}></script>
</svelte:head>
