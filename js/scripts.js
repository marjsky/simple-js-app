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
        button.classList.add('button-class');
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
            item.imageUrl = details.sprites.font_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // reveal API's object in console clicked button
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
    }

    // IIFE returns object contains methods that reference functions.
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    }
})();

// Looping the array from IIFE to handle new change.
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});