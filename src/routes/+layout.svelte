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

	// Create a server-safe context store for our user data
	const user: Writable<User> = writable();
	$: if (data.user) user.set(data.user);
	setContext("user", user);

	// Create another server-safe store for our authorization level
	// Roles can be setup in lib/directus/roles.ts
	const authorization: Writable<Role> = writable();
	$: if (data.authorization) authorization.set(data.authorization);
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
