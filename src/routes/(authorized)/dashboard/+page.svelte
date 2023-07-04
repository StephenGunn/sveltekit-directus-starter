<script lang="ts">
	// Let's get our user data
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";

	// Let's get our auth levels
	import type { Role } from "$api/roles.js";

	// Component imports
	import UserRole from "$layout/dashboard/UserRole.svelte";

	// Retrieve user store from context
	const user: Writable<User> = getContext("user");

	// Retrieve user store from context
	const authorization: Writable<Role> = getContext("authorization");
</script>

<h1>Dashboard</h1>
<h2>Welcome, {$user.first_name} {$user.last_name}</h2>

<UserRole authorization={$authorization} />

<style>
	h1 {
		padding: 2rem 0;
	}
</style>
