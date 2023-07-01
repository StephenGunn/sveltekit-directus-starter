<script lang="ts">
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";

	// Retrieve user store from context
	const user: Writable<User> = getContext("user");
</script>

Hello {$user.first_name}
