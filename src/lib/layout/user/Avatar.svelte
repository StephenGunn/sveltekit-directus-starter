<script lang="ts">
	// Let's get our user data
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";

	// Retrieve user store from context
	const user: Writable<User> = getContext("user");

	$: initials = `${$user?.first_name?.charAt(0)}${$user?.last_name?.charAt(0)}`;

	// $: avatar_url = `${env.API_URL}/assets/${$session.user?.avatar}?key=avatar`;
	// use this to dynamically calculate the font size
	let width: number;
</script>

<div
	class="avatar"
	bind:clientWidth={width}
	style:font-size="{width / 1.8}px"
	class:initials={!$user?.avatar}
>
	{#if $user?.avatar}
		<img src="" alt="{$user.first_name} {$user.last_name}'s avatar" />
	{:else}
		{initials}
	{/if}
</div>

<style>
	.avatar {
		width: 100%;
		height: 100%;
		position: relative;
		display: grid;
		place-content: center;
		background: darkblue;
		border-radius: 50%;
		font-weight: bold;
		color: white;
		overflow: hidden;
	}

	.initials {
		padding-top: 15%;
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
