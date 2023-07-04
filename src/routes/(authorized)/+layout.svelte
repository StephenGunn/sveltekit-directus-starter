<script lang="ts">
</script>

<div class="dash column">
	<div class="content">
		<slot />
	</div>
	<nav>
		<a href="/dashbaord/profile">Edit Profile</a>
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
		margin-top: 2rem;
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
