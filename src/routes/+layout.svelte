<script lang="ts">
	// app level styles
	import "$styles/vars.css";
	import "$styles/reset.css";
	import "$styles/typography.css";
	import "$styles/layout.css";

	// basic layout components
	import Header from "$layout/Header.svelte";
	import Footer from "$layout/Footer.svelte";

	export let data;
</script>

<Header authorization={data.user?.authorization ?? "public"} />
<div class="pad">
	<slot />
</div>
<Footer />

<style>
	.pad {
		padding-top: var(--headerHeight);
	}
</style>
