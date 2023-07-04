<script lang="ts">
	// app level styles
	import "$styles/vars.css";
	import "$styles/reset.css";
	import "$styles/typography.css";
	import "$styles/layout.css";

	// basic layout components
	import Header from "$layout/Header.svelte";
	import Footer from "$layout/Footer.svelte";

	// authorization stuff
	import { setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";
	import type { LayoutData } from "./$types.js";
	import type { Role } from "$api/roles.js";

	export let data: LayoutData;

	// Use context + writable stores to create safe sessions
	const user: Writable<User | undefined> = writable();
	const authorization: Writable<Role> = writable("public");

	// if the server returns new data, update our stores
	$: if (data) {
		user.set(data.user);
		authorization.set(data.authorization);
	}

	// set our context to create server safe sessions
	setContext("user", user);
	setContext("authorization", authorization);
</script>

<Header />
<div class="pad">
	<slot />
</div>
<Footer />

<style>
	.pad {
		padding-top: var(--headerHeight);
	}
</style>
