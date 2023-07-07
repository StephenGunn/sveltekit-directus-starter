<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	onMount(() => {
		invalidate("session");
	});

	export let data;
</script>

<div class="column">
	{#if data.success}
		<h1>Thank you!</h1>
		<p>Thank you for using this product.</p>
	{:else}
		<h1>Uh oh</h1>
		<p>It looks like there was a problem logging you out. (no one should see this.)</p>
	{/if}
</div>

<style>
</style>
