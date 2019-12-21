<script>
  	import { fade } from 'svelte/transition';
  	import { functions, status, user } from "../stores/authentication.js";
	export let segment;

	let burg = false;

	function burger() {
		burg = !burg;
	}
	
	function sign_out() {
		if ($status.waiting) return;
		$functions.signOut();
	}
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/">
			Fairy Tale
		</a>

		<div role="button" href={segment} 
				class="navbar-burger burger" 
				class:is-active={burg}
				aria-label="menu" aria-expanded="false" 
				data-target="navbarBasicExample"
				on:click={burger}>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</div>
	</div>

	<div id="navbar" class="navbar-menu" class:is-active={burg} on:click={burger}>
		<div class="navbar-start">
			<a class="navbar-item" class:selected='{segment === undefined}' href='.'>
				My Dashboard
			</a>

			<a class="navbar-item is-active" class:selected='{segment === "about"}' href='about'>
				My Sheets
			</a>

			<div class="navbar-item has-dropdown is-hoverable">
				<div class="navbar-link">
					Favorites
				</div>

				<div class="navbar-dropdown">
					<a class="navbar-item" rel=prefetch class:selected='{segment === "blog"}' href='blog'>
						Sheet 1
					</a>
					<a class="navbar-item" href='blog'>
						Shhet 2
					</a>
					<a class="navbar-item" href='blog'>
						Tshee 3
					</a>
					<hr class="navbar-divider">
					<a class="navbar-item" href='blog'>
						FAvorite Shhet 4
					</a>
				</div>
			</div>
			
			<div class="navbar-item">
				<div class="buttons">
					<a class="button is-info" href='blog'>
						<strong>New Sheet</strong>
					</a>
				</div>
			</div>
		</div>

		<div class="navbar-end">
			{#if $status.waiting}
			<div class="navbar-item" transition:fade="{{duration: 150}}">
				...
			</div>
			{:else if !!($user||{}).uid}
			<div class="navbar-item" transition:fade="{{duration: 150}}">
				Welcome, {$user.displayName || $user.email}
			</div>
			<div class="navbar-item" transition:fade="{{duration: 150}}">
				<div class="buttons">
					<button class="button is-link" on:click={sign_out}>
						Log out
					</button>
				</div>
			</div>
			{:else}
			<div class="navbar-item" transition:fade="{{duration: 150}}">
				<div class="buttons">
					<a class="button is-info" href="login">
						<strong>Sign up</strong>
					</a>
					<a class="button is-primary" href="login">
						Sign in
					</a>
				</div>
			</div>
			{/if}
		</div>
	</div>
</nav>

