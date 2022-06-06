let pokemonRepository = (function (){

    // empty array that will push in from API and display it
    let pokemonList = [];
    let apiurl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

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
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.types = details.types;
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
        // clear all existing model content
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        // add h1 element as name data to the modal
        let titleElement = document.createElement('h1');
        titleElement.innerText = item.name;

        // add p element as height data to the modal
        let contentElement = document.createElement('p');
        contentElement.innerText = `Height: ${item.height} m`;

        // add img element as svg to the modal
        let imageElement = document.createElement('img');
        imageElement.src = item.imageUrl;

        // these elements for modal attach as child to div.modal
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    // to close down model
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    // Press Escape keydown as function to call hideout to close model
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' &&
        modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    })

    // click outside of modal display to close modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

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