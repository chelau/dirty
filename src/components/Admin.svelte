<script>
    import Home from '../components/Home.svelte';
    import Login from '../components/Login.svelte'
    import jwt_decode from "jwt-decode";
import { onMount } from 'svelte/internal';
import axios from 'axios';

    let user = {}
    let categories = []

    const decodeUser = () => {
        var decoded = jwt_decode(window.localStorage.getItem('auth'));
        user = decoded
        if(!user.roles.includes('admin')){
            currentGameScreen.set(Home);
            prevGameScreen.set(Home);
        }
    }

    const getCategories = async () => {
        // loading = true;
        const response = await axios.get('https://dirty-seconds.herokuapp.com/api/categories');
        categories = response.data;
        // loading = false;
        console.log(categories);
        categories = categories.map(category => {
            return {
                id: category.id,
                description: category.description,
                name: category.name,
                code: category.code,
                icon: category.icon,
                selected: false
            }
        })
        console.log(categories)
    }

    $: if(!window.localStorage.getItem('auth')){
		currentGameScreen.set(Login);
		prevGameScreen.set(Login);
	}

    onMount(() => {
        decodeUser();
        getCategories();
    })
</script>
<div class="categories">
    <div class="card">
        <div class="card-body">
            <h3>Categories <button class="btn btn-primary btn-sm"><i class="fas fa-plus-square"></i> Add</button></h3>
            <table class="table mt-5">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Code</th>
                    <th>Icon</th>
                  </tr>
                </thead>
                <tbody>
                    {#each categories as item, i}
                         <tr>
                           <th scope="row">{i+1}</th>
                           <td>{item.name}</td>
                           <td>{item.description.slice(0,10)}...</td>
                           <td>{item.code}</td>
                           <td>{item.icon}</td>
                         </tr>
                    {/each}
                </tbody>
              </table>
        </div>
    </div>
</div>
<style>
    .categories{
        width: 80%;
        margin: 100px auto;
    }
</style>