<script lang="ts">
	// app level styles
	import "$styles/vars.css";
	import "$styles/reset.css";
	import "$styles/typography.css";
	import "$styles/layout.css";

	// basic layout components
	import Header from "$layout/Header.svelte";
	import Footer from "$layout/Footer.svelte";

	import { authorization, session } from "$stores/session.js";
	import { browser } from "$app/environment";

	import type { LayoutData } from "./$types.js";
	export let data;

	const set_session = (data: LayoutData) => {
		if (browser) {
			authorization.set(data.authorization ?? "public");
			if (data.user) session.set(data.user);
		}
	};

	$: set_session(data);
</script>

<Header />
<div class="pad">
	<slot />
</div>
<Footer />

<style>
	.pad {
		padding-top: var(--headerHeight);
	}
</style>
