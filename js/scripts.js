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

pokemonList.forEach(function(pokemon) {
     
    //rendering in display each name and height
    document.write(pokemon.name + ` (height `+ pokemon.height + `m)`);

    // set conditon highest value of height from the list
    if (pokemon.height == 1.9) {
        document.write(" - Wow, that's huge!<br>");
    } else {
        document.write("<br>");
    }
});