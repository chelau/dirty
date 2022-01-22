<script>
    import {
        currentGameScreen,
        localStorage,
        prevGameScreen,
    } from "../stores/stores.js";
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import Login from "./Login.svelte";

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    let fullName = '';
    let email = '';
    let password = '';
    let phone = '';

    const register = async () => {
        let data = {
            fullName,
            email,
            password,
            phone,
        };
        const config = {
            method: 'post',
            url: 'https://dirty-seconds.herokuapp.com/api/users/register',
            data
        }
        console.log(config)
        try {
            let response = await axios(config);
            if (response.data) {
                Toast.fire({
                    icon: 'success',
                    title: 'Succesvol toegevoegd aan de 2G database.'
                })
                currentGameScreen.set(Login);
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Register Failed'
                })
            }
        } catch (error) {
            if(error){
                Toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            }
            console.error(error);
        }
    };
</script>

<div class="login">
    <div class="card">
        <div class="card-body">
            <h3>Register</h3>
            <form on:submit|preventDefault={register}>
                <div class="col-12 mt-3">
                    <input
                        class="form-control"
                        type="text"
                        bind:value={fullName}
                        required
                        placeholder="Voor & Achternaam"
                    />
                </div>
                <div class="col-12 mt-3">
                    <input
                        class="form-control"
                        type="tel"
                        placeholder="WhatsApp?"
                        required
                        bind:value={phone}
                    />
                </div>
                <div class="col-12 mt-3">
                    <input
                        class="form-control"
                        type="email"
                        placeholder="Emailadres"
                        required
                        bind:value={email}
                    />
                </div>
                <div class="col-12 mt-3">
                    <input
                        class="form-control"
                        type="password"
                        placeholder="Wachtwoord"
                        required
                        bind:value={password}
                        minlength="5"
                    />
                </div>
                <div class="col-12 mt-3" style="text-align: right;">
                    <button
                        class="btn btn-primary"
                        on:click={() => currentGameScreen.set(Login)}
                        >Terug</button
                    >
                    <button type="submit" class="btn btn-success"
                        >Registreren</button
                    >
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .login {
        width: 350px;
        margin: 100px auto;
        padding: 10px;
    }
</style>
