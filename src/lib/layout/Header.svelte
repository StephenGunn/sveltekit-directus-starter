<script lang="ts">
	import Avatar from "./user/Avatar.svelte";

	import type { Role } from "$api/roles.js";
	export let authorization: Role;

	$: authorized = authorization === "admin" || authorization === "user";
</script>

<header>
	<div class="column site-head">
		<a href="."><span>🤓</span> SvelteKit + Directus</a>
		<nav>
			<a href="/blog">Blog</a>
			{#if authorized}
				<a href="/dashboard">Dashboard</a>
				<a href="/logout">Logout</a>
				<div class="avatar"><Avatar /></div>
			{:else}
				<a href="/login">Login</a>
				<a href="/register">Register</a>
			{/if}
		</nav>
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		background: white;
		min-height: var(--headerHeight);
	}

	.avatar {
		width: 2rem;
		height: 2rem;
	}

	.site-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	nav {
		display: flex;
		gap: 1.5rem;
	}

	a {
		text-decoration: none;
		font-weight: bold;
		color: rgb(28, 28, 63);
		display: inline-flex;
		align-items: center;
		gap: 1rem;
	}

	a span {
		font-size: 150%;
	}
</style>
