let pokemonRepository = (function (){

    // empty array that will push in from API and display it
    let pokemonList = [];
    let apiurl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // adding pokemon with validate data
    function add (item) {
        if (
            typeof item === 'object' &&
            'name' in item &&
            'detailsUrl' in item
        ) {
            pokemonList.push(item);
        } else {
            console.log('error Pokemon entry data!');
        }
    }

    // obtain list of storage array as pokemonList
    function getAll () {
        return pokemonList;
    }

    // buttons attached data array with dynamic add items
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add(
            'btn',
            'btn-primary',
            'col-xl-6',
            'col-md-8',
            'col-11',
            'mx-auto');
        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        button.classList.add('pokemon-list-button');
        listpokemon.classList.add('list-group-item');
        listpokemon.classList.add('pokemon-list-item');
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function (){
            showDetails(pokemon);
        })
    }

    // this method fetches data from API add items to the array
    function loadList () {
        return fetch(apiurl).then(function (response){
            return response.json();
        }).then(function (json){
            json.results.forEach(function (item){ // access JSON's property results:item(s)
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e){
            console.error(e);
        })
    }

    // this method fetches data access API values of properties 
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            
            let types = [];
            details.types.forEach(function (item) {
                types.push(item.type.name);
            })
            item.types = types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // reveal API's object in modal display from clicked button
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item);
        });
    }

    // UI pattern of modal display
    function showModal(item) {
        // variables of attributes from model content
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header.modal-title");
        let ModalLabel = $("#exampleModalLabel");

        // clear all existing modal content
        modalHeader.empty();
        modalTitle.empty();
        modalBody.empty();

        // creating elements in modal content
        let nameElement = $(`<h2>${item.name.toUpperCase()}</h2>`);
        let imageElement = $(`<img class='modal-img' width='50%'>`);
        imageElement.attr('src', item.imageUrl);
        let heightElement = $(`<p>Height: ${item.height} m</p>`);
        let typeElement = $(`<p>Types: ${item.types.join(', ')}</p>`);

        // elements appending to title and body into modal
        ModalLabel.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typeElement);
    }

    

    // IIFE returns object contains methods that reference functions.
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    }
})();

// Looping the array from IIFE to handle new change.
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});