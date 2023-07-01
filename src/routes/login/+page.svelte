<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import Content from "$layout/Content.svelte";

	let error: boolean = false;
</script>

<Content>
	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === "success") {
					error = false;
					invalidateAll();
					goto("/dashboard");
				} else {
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
		<button>Log in</button>
	</form>
</Content>

<style>
	form {
		margin: 2rem auto;
		max-width: 600px;
		display: flex;
		flex-flow: column;
		gap: 1.5rem;
		border: 1px solid #eee;
		padding: 2rem;
		border-radius: 1rem;
	}

	label {
		display: flex;
		gap: 1rem;
	}
	label span {
		display: inline-flex;
		min-width: 20%;
	}

	input {
		flex-grow: 1;
	}

	.error {
		background: darkred;
		color: white;
		font-weight: bold;
		padding: 0.75rem;
	}
</style>
