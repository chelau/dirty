<script>
	import {currentGameScreen, game,  settings, saveSettings, endGame, prevGameScreen, goToHome } from '../stores/stores.js'
    
   function changeGoal(){
       saveSettings();
   }

   async function forceSWupdate () {
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.getRegistrations().then(async function (registrations) {
                for (let registration of registrations) {
                    await registration.update();
                }
            })
        }
        window.location.reload(true);
    }
    </script>
    
    <div class="container-fluid pt-2 vh-100 bg-purple">
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-end" on:click="{() => currentGameScreen.set($prevGameScreen)}">
                    <i class="c-white fas fa-times"></i>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="c-white">Instellingen</h1>
            </div>
        </div>
    
        <div class="container">
            
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row mb-2 justify-content-center">
                                <div class="col-12">
                                    <label for="pointsGoal" class="form-label">Punten Doel:</label>
                                    <input type="number" class="form-control" id="pointsGoal" bind:value="{$settings.pointsToWin}"
                                    on:change="{() => changeGoal()}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <div class="card bg-blue" on:click="{() => goToHome()}">
                        <div class="card-body text-center">
                            <h3 class="c-white">Home</h3>
                        </div>
                    </div>
                </div>
            </div>
            {#if $game != null}
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <div class="card bg-red" on:click="{() => endGame()}">
                        <div class="card-body text-center">
                            <h3 class="c-white">Beeindig spel</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/if}

            <div class="fixed-bottom">
                <div class="row mb-4">
                    <div class="col-12 c-white text-center">
                        <button on:click="{() => forceSWupdate()}" class="btn btn-small bg-blue c-white d-block mx-auto">Force Update</button>
                        <span>App Ver. {window.appVer}</span><br>
                        <span>Words Ver. {window.wordsDBVer}</span><br><br>
                        <h6>Made with <i class="fas fa-heart"></i> by <a href="https://github.com/TheMardy" target="_blank">Mardy</a></h6>
                    </div>
                </div>
            </div>
    </div>
</div>
    
    
    <style>
      .fa-heart {
          color:#d60000;
      }
     
    </style>