<script lang="ts">
	import UserRole from "$layout/dashboard/UserRole.svelte";
	// Let's get our user data
	import { session } from "$lib/stores/session.js";

	export let data;
</script>

<h1>Dashboard</h1>
<UserRole authorization={data.authorization} />
<h2>Welcome, {$session.first_name} {$session.last_name}</h2>
