<script lang="ts">
	import type { Role } from "$api/roles.js";

	export let authorization: Role;
</script>

<div class="role {authorization}">
	{#if authorization === "admin"}
		You are currently logged in as an admin. Congrats!
	{:else if authorization === "user"}
		You are currently authorized as a user.
	{:else}
		Uh oh. You shouldn't be here.
	{/if}
</div>

<style>
	.role {
		margin: 1rem 0;
		padding: 1rem;
		border: 1px solid #eee;
		border-radius: 1rem;
		display: flex;
		gap: 1rem;
		align-items: center;
	}
	.admin {
		color: purple;
	}
	.user {
		color: blue;
	}
	.public {
		color: red;
	}
</style>
