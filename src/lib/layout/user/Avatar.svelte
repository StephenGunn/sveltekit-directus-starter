<script lang="ts">
	// Let's get our user data
	import { session } from "$stores/session.js";

	$: initials = `${$session?.first_name?.charAt(0)}${$session?.last_name?.charAt(0)}`;

	// $: avatar_url = `${env.API_URL}/assets/${$session.user?.avatar}?key=avatar`;
	// use this to dynamically calculate the font size
	let width: number;
</script>

<div
	class="avatar"
	bind:clientWidth={width}
	style:font-size="{width / 1.8}px"
	class:initials={!$session?.avatar}
>
	{#if $session?.avatar}
		<img src="" alt="{$session.first_name} {$session.last_name}'s avatar" />
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
