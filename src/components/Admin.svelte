<script>
    import Home from '../components/Home.svelte';
    import Login from '../components/Login.svelte'
    import jwt_decode from "jwt-decode";
    import { onMount } from 'svelte/internal';
    import axios from 'axios';
    import Swal from 'sweetalert2'
    import Loading from './Loading.svelte';
    import LoadingWord from './LoadingWord.svelte';
    import {
        currentGameScreen
    } from "../stores/stores.js";

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

    let user = {}
    let categories = []
    let words = []
    let name = ""
    let description = ""
    let icon = ""
    let code = ""
    let wordName = "";
    let categoryId = "";
    let loading = false;
    let loadingWord = false;

    const decodeUser = () => {
        var decoded = jwt_decode(window.localStorage.getItem('auth'));
        user = decoded
        if(!user.roles.includes('admin')){
            currentGameScreen.set(Home);
            prevGameScreen.set(Home);
        }
    }

    const deleteWord = async (id) => {
        if(confirm("Are you sure, you want to delete this word?")) {
            loadingWord = true;
            await axios.delete(`https://dirty-seconds.herokuapp.com/api/words/${id}`)
            .then(res => {
                Toast.fire({
                    icon: 'success',
                    title: 'Word deleted'
                })
                // words = words.filter(word => word.id != id)
                getWords()
                loadingWord = false;
            })
            .catch(err => {
                Toast.fire({
                    icon: 'error',
                    title: 'Error deleting word'
                })
                loadingWord = false;
            })
        }
    }

    const deleteCategory = async (id) => {
        if(confirm("Are you sure, You want to delete this category?")) {
            loadingWord = true;
            await axios.delete(`https://dirty-seconds.herokuapp.com/api/categories/${id}`)
            .then(res => {
                Toast.fire({
                    icon: 'success',
                    title: 'Category deleted'
                })
                // words = words.filter(word => word.id != id)
                getCategories()
                loadingWord = false;
            })
            .catch(err => {
                Toast.fire({
                    icon: 'error',
                    title: 'Error deleting category'
                })
                loadingWord = false;
            })
        }
    }

    const addWord = async () => {
        const data = {
            description: wordName,
            categoryId: categoryId
        }
        const config = {
            method: 'post',
            url: 'https://dirty-seconds.herokuapp.com/api/words',
            data,
        }
        try {
            let response = await axios(config)
            if(response.data){
                Toast.fire({
                    icon: 'success',
                    title: 'Word added successfully'
                })
                wordName = "";
            }
            getWords()
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Error adding word'
            })
        }
    }

    const addCategory = async () => {
        const data = {
            description,
            code,
            name,
            icon,
        }
        const config = {
            method: 'post',
            url: 'https://dirty-seconds.herokuapp.com/api/categories',
            data,
        }
        try {
            let response = await axios(config)
            if(response.data){
                Toast.fire({
                    icon: 'success',
                    title: 'Category added successfully'
                })
                description = ""
                code = ""
                name = ""
                icon = ""
            }
            getCategories()
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Error adding category'
            })
        }
    }

    const getCategories = async () => {
        loading = true;
        const response = await axios.get('https://dirty-seconds.herokuapp.com/api/categories');
        categories = response.data;
        loading = false;
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

    const getWords = async () => {
        loadingWord = true;
        const response = await axios.get('https://dirty-seconds.herokuapp.com/api/words');
        words = response.data;
        loadingWord = false;
        console.log(words);
    }

    $: filterWords = words.filter(word => {
        return word.category.id == categoryId
    })

    $: if(!window.localStorage.getItem('auth')){
		currentGameScreen.set(Login);
		prevGameScreen.set(Login);
	}

    onMount(() => {
        decodeUser();
        getCategories();
        getWords()
    })
</script>
<div class="categories">
    <button class="btn btn-primary btn-sm mb-3" on:click={() => currentGameScreen.set(Home)}>
        <i class="fas fa-chevron-left"></i> Back to Home
    </button>
    <div class="card">
        <div class="card-body">
            <h3>Categories <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addCategoriesModal"><i class="fas fa-plus-square"></i> Add</button></h3>
            <table class="table mt-5">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Code</th>
                    <th>Icon</th>
                    <th></th>
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
                           <td style="text-align: right;">
                                <button class="btn btn-danger btn-sm" on:click={() => deleteCategory(item.id)}><i class="fas fa-trash-alt"></i></button>
                                <button class="btn btn-warning btn-sm" on:click={() => categoryId = item.id} data-bs-toggle="modal" data-bs-target="#addWordsModal"><i class="far fa-plus-square"></i> Words</button>
                           </td>
                         </tr>
                    {/each}
                </tbody>
              </table>
        </div>
    </div>
    {#if loading}
         <!-- content here -->
         <Loading/>
    {/if}
</div>
<!-- Modal categories -->
<form on:submit|preventDefault={addCategory}>
<div class="modal fade" id="addCategoriesModal" tabindex="-1" aria-labelledby="addCategoriesModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addCategoriesModalLabel">Add Category</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
                <div class="col-12 mt-3">
                    <label for="">Name</label>
                    <input class="form-control" bind:value={name} type="text" required>
                </div>
                <div class="col-12 mt-3">
                    <label for="">Description</label>
                    <input class="form-control" bind:value={description} type="text" required>
                </div>
                <div class="col-12 mt-3">
                    <label for="">Icon font-awasome</label>
                    <input class="form-control" bind:value={icon} type="text" required>
                </div>
                <div class="col-12 mt-3">
                    <label for="">Reference Code</label>
                    <input class="form-control" bind:value={code} type="text" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
</form>

<!-- Modal words -->
<form on:submit|preventDefault={addWord}>
    <div class="modal fade" id="addWordsModal" tabindex="-1" aria-labelledby="addWordsModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addWordsModalLabel">Add Words</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label for="">New word name</label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" required bind:value={wordName} aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2"><i class="far fa-plus-square"></i></button>
                </div>
                <ul class="words">
                    {#if loadingWord}
                        <LoadingWord/>
                    {/if}
                    {#each filterWords as item, i}
                    <li>
                        <p>{item.description}</p>
                        <button on:click={() => deleteWord(item.id)} class="btn btn-danger btn-sm" type="button"><i class="fas fa-trash-alt"></i></button>
                    </li>
                    {/each}
                </ul>
                </div>
            </div>
        </div>
    </div>
    </form>
<style>
    .categories{
        width: 80%;
        margin: 100px auto;
    }
    .words{
        list-style: none;
        padding: 0;
        width: 100%;
    }
    .words li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
</style>