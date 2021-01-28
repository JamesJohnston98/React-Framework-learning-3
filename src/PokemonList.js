import React from 'react'

//destructoring is used to allow the pokemon to be loaded from the 
export default function PokemonList({ pokemon }) {
    return (
        <div>
           {/* Run Javascript code to loop through the Pokemon list */}
          {pokemon.map(p => (
              //return a single div with the name of the pokemon
              //A key is on the top level element which must be unique
              //use the name of the pokemon as there is only one pokemon with each name
              //this will allow efficient rendering 
              <div key={p}>{p}</div>
          ))}  
        </div>
    )
}
