<script lang="ts">
	import UserRoleCard from "$layout/dashboard/UserRoleCard.svelte";

	export let data;
</script>

<h1>Dashboard</h1>
{#if data.user}
	<UserRoleCard authorization={data.user.authorization} />
	<h2>Welcome, {data.user.first_name} {data.user.last_name}</h2>
{/if}
