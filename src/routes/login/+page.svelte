<script lang="ts">
	import "$styles/forms.css";
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import Content from "$layout/Content.svelte";

	export let data;

	// UI controls
	let error: boolean = false;
	let logging_in: boolean = false;
</script>

<Content>
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				error = false;
				if (result.type === "success") {
					goto(data.target, {
						invalidateAll: true
					});
				} else {
					logging_in = false;
					error = true;
				}
			};
		}}
	>
		<label>
			<span>Email</span>
			<input name="email" type="email" value="test@test.com" />
		</label>
		<label>
			<span>Password</span>
			<input name="password" type="password" value="test" />
		</label>
		{#if error}
			<div class="error">Cannot login with these creds.</div>
		{/if}
		<button on:click={() => (logging_in = true)}>
			{#if logging_in}
				Logging in...
			{:else}
				Log in
			{/if}
		</button>
	</form>
</Content>

<style>
	.error {
		background: darkred;
		color: white;
		font-weight: bold;
		padding: 0.75rem;
	}
</style>
