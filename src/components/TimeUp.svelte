<script>
   	import {currentGameScreen, getCurrentPlayer } from '../stores/stores.js'
    import GuessedOverview from './GuessedOverview.svelte';


    function checkGuessedOverview() {
        currentGameScreen.set(GuessedOverview)
    }
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
                <h5 class="c-white">Tijd is op</h5>
            </div>
        </div>
        <div class="row justify-content-center pt-3">
            <div class="col-12 col-md-8 col-lg-6 mb-3">
                <div class="card bg-blue" on:click="{() => checkGuessedOverview()}">
                    <div class="card-body text-center">
                        <h2 class="c-white">verder</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<style>

</style>