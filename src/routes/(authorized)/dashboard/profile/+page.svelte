<script lang="ts">
	import "$styles/forms.css";
	import { enhance } from "$app/forms";

	let error: boolean = false;

	import { session } from "$stores/session.js";
</script>

<h1>Edit Profile</h1>
<form method="POST" use:enhance>
	<label>
		<span>First Name</span>
		<input
			name="first_name"
			type="text"
			value={$session.first_name}
			minlength="1"
			maxlength="50"
			required
		/>
	</label>
	<label>
		<span>Last Name</span>
		<input
			name="last_name"
			type="text"
			value={$session.last_name}
			minlength="1"
			maxlength="50"
			required
		/>
	</label>
	<label>
		<span>Location</span>
		<input name="location" type="text" value={$session.location} />
	</label>
	{#if error}
		<div class="error">An error occurred while upading profile.</div>
	{/if}
	<button>Update Profile</button>
</form>

<style>
	.error {
		background: darkred;
		color: white;
		font-weight: bold;
		padding: 0.75rem;
	}
</style>
