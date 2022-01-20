<script>
    import {currentGameScreen, localStorage, prevGameScreen } from '../stores/stores.js'
    import Register from './Register.svelte';
    import Home from './Home.svelte';
    import Login from './Login.svelte';
    import axios from 'axios'

    let email = '';
    let password = '';

    const login = async () => {
        let data = {
            email,
            password,
        };
        const config = {
            method: 'post',
            url: 'https://dirty-seconds.herokuapp.com/api/users/login',
            data
        }
        try {
            let response = await axios(config);
            console.log(response);
            if ( response.data ) {
                window.localStorage.setItem('auth', response.data.token);
                currentGameScreen.set(Home);
                prevGameScreen.set(Home);
                localStorage.set(window.localStorage);
            }
        } catch (error) {
            console.log(error)
        }
    }
</script>
<div class="login">
    <div class="card">
        <div class="card-body">
            <h3>Login</h3>
        <div class="col-12 mt-3">
            <input class="form-control" bind:value={email} type="email" placeholder="Your email">
        </div>
        <div class="col-12 mt-3">
            <input class="form-control" bind:value={password} type="password" placeholder="Your password">
        </div>
        <div class="col-12 mt-3" style="text-align: right;">
            <button class="btn btn-primary" on:click={() => currentGameScreen.set(Register)}>Register</button>
            <button class="btn btn-success" on:click={login}>Login</button>
        </div>
        </div>
    </div>
</div>

<style>
    .login{
        width: 350px;
        margin: 100px auto;
        padding: 10px;
    }
</style>