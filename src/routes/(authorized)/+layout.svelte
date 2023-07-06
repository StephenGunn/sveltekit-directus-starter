<script lang="ts">
	import Content from "$layout/Content.svelte";
</script>

<div class="dash column">
	<Content>
		<slot />
	</Content>
	<nav>
		<a href="/dashboard">Dashboard</a>
		<a href="/dashboard/profile">Edit Profile</a>
		<a href="/dashboard/avatar">Avatar</a>
	</nav>
</div>

<style>
	.dash {
		display: flex;
		gap: 2rem;
	}

	.content {
		flex-grow: 1;
	}

	nav {
		margin: 2rem 0;
		border: 1px solid #ccc;
		padding: 1rem;
		border-radius: 1rem;
		width: 30%;
		border-left: 1px solid #ccc;
		display: flex;
		flex-flow: column;
		gap: 0.5rem;
	}
</style>
