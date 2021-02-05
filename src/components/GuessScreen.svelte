<script>
    import {currentGameScreen, getCurrentPlayer, currentFiveWords } from '../stores/stores.js'
	import TimeUp from './TimeUp.svelte'

    let turnSecondsLeft = 30;

let gameTimer = setInterval(function(){
            if(turnSecondsLeft <= 1){
                clearInterval(gameTimer);
                currentGameScreen.set(TimeUp);
            } else {
                turnSecondsLeft -= 1;
            }
        }, 1000);
</script>


<div class="vertical-center">
    <div class="container-fluid">
        <div class="row justify-content-center pt-3">
            <div class="col-12 mb-5 text-center">
                <h5 class="c-white">{getCurrentPlayer().name}</h5>
            </div>
        </div>
        <div class="row justify-content-center pt-3">
            <div class="col-12 mb-5 text-center">
                <h5 class="c-white">{turnSecondsLeft}</h5>
            </div>
        </div>
        <div class="row justify-content-center pt-3">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-body text-center c-purple border border-secondary m-3">
                        {#each $currentFiveWords as word, i}
                        {#if i == 4}
                        <h4 class="">{word}</h4>
                        {:else}
                        <h4 class="mb-3">{word}</h4>
                        {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
<style>

</style>