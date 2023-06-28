<script lang="ts">
	import Content from '$layout/Content.svelte';
	export let data;
</script>

<Content>
	{#if data.success}
		<p>test</p>
	{/if}
</Content>

<style>
</style>
