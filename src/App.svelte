<script>
	import Home from './components/Home.svelte'
    import { onMount } from 'svelte'
	import axios from 'axios';
	import {currentGameScreen, localStorage, prevGameScreen } from './stores/stores.js'

	const getWords = async () => {
		const response = await axios.get('http://localhost:1337/api/words');
		return response.data;
	}

	onMount(() => {
		currentGameScreen.set(Home);
		prevGameScreen.set(Home);
        localStorage.set(window.localStorage);
		getWords().then(words => {
			console.log(words);
			// localStorage.set(words);
		});
	});

</script>

<main class="">
	<svelte:component this={$currentGameScreen}/>
</main>

<style>
main {
	width: 100%;
	height: 100%;
}
</style>
