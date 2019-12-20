<script>
	export let segment;

	let burg = false;

	function burger() {
		burg = !burg;
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

	<div id="navbarBasicExample" class="navbar-menu" class:is-active={burg} on:click={burger}>
		<div class="navbar-start">
			<a class="navbar-item" class:selected='{segment === undefined}' href='.'>
				My Dashboard
			</a>

			<a class="navbar-item is-active" class:selected='{segment === "about"}' href='about'>
				My Sheets
			</a>

			<div class="navbar-item has-dropdown is-hoverable">
				<a class="navbar-link">
					Favorites
				</a>

				<div class="navbar-dropdown">
					<a class="navbar-item" rel=prefetch class:selected='{segment === "blog"}' href='blog'>
						Sheet 1
					</a>
					<a class="navbar-item">
						Shhet 2
					</a>
					<a class="navbar-item">
						Tshee 3
					</a>
					<hr class="navbar-divider">
					<a class="navbar-item">
						FAvorite Shhet 4
					</a>
				</div>
			</div>
			
			<div class="navbar-item">
				<div class="buttons">
					<a class="button is-info">
						<strong>New Sheet</strong>
					</a>
				</div>
			</div>
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<div class="buttons">
					<button class="button is-primary">
						<strong>Sign up</strong>
					</button>
					<button class="button is-light">
						Log in
					</button>
				</div>
			</div>
		</div>
	</div>
</nav>

