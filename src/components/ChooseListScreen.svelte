<script>
    import {currentGameScreen, game, localStorage , prevGameScreen} from '../stores/stores.js'
	import InterimScore from './InterimScore.svelte'
    import Settings from './Settings.svelte';
    import { fly } from 'svelte/transition';
	import Toast from './Toast.svelte'
    import {commonKnowledge, hdlv, everydayLife} from '../stores/wordsDatabase.js';

    let commonKnowledgeSelect = true;
    let hdlvSelect = false;
    let everydayLifeSelect = false;

    function startGame() {
        let wordsDatabase = [];
        if(commonKnowledgeSelect) {
            wordsDatabase = wordsDatabase.concat(commonKnowledge);
        }
        if(hdlvSelect) {
            wordsDatabase = wordsDatabase.concat(hdlv);
        }
        if(everydayLifeSelect) {
            wordsDatabase = wordsDatabase.concat(everydayLife);
        }

        if(wordsDatabase.length > 1) {
            $game.words = wordsDatabase;
            $localStorage.setItem('game', JSON.stringify($game));
            prevGameScreen.set(InterimScore);
            currentGameScreen.set(InterimScore);
        } else {
            window.pushToast("Selecteer minimaal 1 categorie");
        }
    }
    
</script>

<div class="" in:fly>
    <div class="container-fluid pt-2">
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-end" on:click="{() => currentGameScreen.set(Settings)}">
                    <i class="c-white fas fa-cog"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="vertical-center">
        <div class="container-fluid">
            <div class="row justify-content-center pt-3">
                <div class="col-12 col-md-8 col-lg-6 mb-5 text-center">
                    <h1 class="c-white mb-0">Kies Categorie(en)</h1>
                </div>
            </div>

            <div class="row justify-content-center pt-3 mb-3">
                <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <div class="card bg-blue" on:click="{() => startGame()}">
                        <div class="card-body text-center">
                            <h2 class="c-white">Start Spel</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-12 col-sm-8 col-lg-5 mb-3">
                    <div class="card">
                        <div class="card-body c-purple text-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="check1" bind:checked={commonKnowledgeSelect}>
                                <label class="form-check-label" for="check1">
                                    <i class="fas fa-book"></i> Algemene Kennis <small class="float-right">({commonKnowledge.length})</small>
                                </label>
                                <span class="float-end"><a href="mailto:mardy@hdlv.nl?subject=Words - Algemene Kennis&body=Hoi, ik wil graag woorden toevoegen aan de Algemene Kennis lijst \n\n Mijn naam (Leeg = Anoniem): \n Woorden: \n"><i class="fas fa-plus-square"></i></a></span>
                            </div>
                            <hr class="mt-0">
                            <p class="my-0">Een mix van topografie, bekende personen, merken en meer!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-12 col-sm-8 col-lg-5 mb-3">
                    <div class="card">
                        <div class="card-body c-purple text-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="check2" bind:checked={everydayLifeSelect}>
                                <label class="form-check-label" for="check2">
                                    <i class="fas fa-tree"></i> Everyday Life <small class="float-right">({everydayLife.length})</small>
                                </label>
                                <span class="float-end"><a href="mailto:mardy@hdlv.nl?subject=Words - Everyday Life&body=Hoi, ik wil graag woorden toevoegen aan de Everyday Life lijst \n\n Mijn naam (Leeg = Anoniem): \n Woorden: \n"><i class="fas fa-plus-square"></i></a></span>
                            </div>
                            <hr class="mt-0">
                            <p class="my-0">Een mix van allerdaagse dingen en namen</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-12 col-sm-8 col-lg-5 mb-3">
                    <div class="card">
                        <div class="card-body c-purple text-center">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="check3" bind:checked={hdlvSelect}>
                                <label class="form-check-label" for="check3">
                                    <i class="fas fa-beer"></i> HDLV <small class="float-right">({hdlv.length})</small>
                                </label>
                                <span class="float-end"><a href="mailto:mardy@hdlv.nl?subject=Words - HDLV&body=Hoi, ik wil graag woorden toevoegen aan de HDLV lijst \n\n Mijn naam (Leeg = Anoniem): \n Woorden: \n"><i class="fas fa-plus-square"></i></a></span>
                            </div>
                            <hr class="mt-0">
                            <p class="my-0">Woorden van de vriendengroep</p>
                        </div>
                    </div>
                </div>
            </div>
           
        
        </div>
    </div>
</div>
<Toast />

<style>
   .form-check {
        font-size: 20px;
   }
   .fa-plus-square {
       font-size: 25px;
   }
  
</style>