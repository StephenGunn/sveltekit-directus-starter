<script lang="ts">
	import Content from '$layout/Content.svelte';
	export let data;
</script>

<Content>
	<h1>Sample Blog Posts</h1>
	{#each data.posts as post}
		<article>
			<h2>{post.title}</h2>
			{@html post.content}
		</article>
	{:else}
		<p>no blog posts found</p>
	{/each}
</Content>

<style>
	h1 {
		margin-top: 2rem;
	}
	article {
		padding: 2rem 0;
	}

	article:not(:last-child) {
		border-bottom: 1px solid #eee;
	}

	h2 {
		margin-bottom: 1em;
		color: #333;
	}
</style>
