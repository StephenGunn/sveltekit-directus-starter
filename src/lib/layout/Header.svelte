<script lang="ts">
</script>

<header>
	<div class="column site-head">
		<a href=".">SvelteKit + Directus Starter</a>
		<nav>
			<a href="/blog">Blog</a>
			<a href="/login">Login</a>
			<a href="/register">Register</a>
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

	.site-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	nav {
		display: flex;
		gap: 1.5rem;
	}
</style>
