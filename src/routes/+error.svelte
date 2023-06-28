<script>
	import { page } from '$app/stores';
</script>

<div class="column error">
	{#if $page.status}
		<h1>{$page.status}</h1>
	{:else}
		<h1>An unknown error has occured.</h1>
	{/if}
	{#if $page.error?.message}
		<p>{$page.error.message}</p>
	{:else}
		<p>No error message included.</p>
	{/if}
</div>

<style>
	h1 {
		padding-top: 1rem;
	}

	p {
		padding: 1rem 0;
	}
</style>
