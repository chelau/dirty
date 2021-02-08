<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	let toasts = []; 
	let retainMs = 3500; 

	let toastId = 0;
	const pushToast = (msg = '') => {
		toasts = [...toasts, {
			_id : ++toastId,
			msg
		}]; 
		setTimeout(() => {
			unshiftToast();
		}, retainMs);
	};

	const unshiftToast = () => {
		toasts = toasts.filter((a, i) => i > 0); 
	};

	onMount(() => {
		window.pushToast = pushToast;
	});
</script>

<style>
	.toast-wrapper {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 20px;
		text-align: center;
		z-index: 9999;
	}
	.toast-item {
		border-radius: 4px;
		padding: 12px 10px;
		margin: 10px auto;
		max-width: 400px;
		background: rgba(0, 0, 0, 0.7);
		color: #fff;
	}
</style>

<div class="toast-wrapper">
	{#each toasts as toast (toast._id)}
	<div class="toast-item" in:fly="{{delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut}}" out:fade={{duration:500, opacity: 0}}>
		{toast.msg}
	</div>
	{/each}
</div>
