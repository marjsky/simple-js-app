let pokemonRepository = (function (){

    let pokemonList = [
        {
            name: 'Beedrill',
            height: 1,
            types: ['bug', 'poison'],
            abilities: ['Swarm', 'Sniper']
        },
        {
            name: 'Nidoqueen',
            height: 1.3,
            types: ['ground', 'poison'],
            abilities: ['Poison-point', 'Rivalry', 'Sheer-force']
        },
        {
            name: 'Arcanine',
            height: 1.9,
            types: 'fire',
            abilities: ['Flash-fire', 'Intimidate', 'Justified']
        },
        {
            name: 'Pansear',
            height: 0.6,
            types: 'fire',
            abilities: ['Blaze', 'Gluttony']
        }
    ];

    // adding pokemon with validate data
    function add (item) {
        if (
            typeof item === 'object' &&
            'name' in item &&
            'height' in item &&
            'types' in item
        ) {
            pokemonList.push(item);
            console.log('correct Pokemon entry data!');
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

    // reveal object in console clicked button
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    // IIFE returns object contains methods that reference functions.
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    }
})();

// Adding item to array into IIFE of function add
pokemonRepository.add({
    name: 'Squirtle',
    height: 0.5, 
    types: 'water', 
    abilities: ['Rain-dish', 'Torrent']
});

// returns all items array
console.log(pokemonRepository.getAll()); 

// Looping the array from IIFE to handle new change.
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});