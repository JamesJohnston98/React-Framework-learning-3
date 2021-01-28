//axios library used to import data from the PokeAPI
//axios allows asynchronous requests to the api to create the list of pokemon
import React, { useState, useEffect  } from 'react';
import PokemonList from './PokemonList'
import axios from 'axios'
import Pagination from './Pagination'

function App() {
  //create state for the pokemon list which is being generated using the api
  const [pokemon, setPokemon] = useState([])
  //the states for the currently displayed page using the API
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  //states to allow the user to move between the pages within the application
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  //loading page state which would allow the user to see when the data set is loading
  const [load, setLoad] = useState(true)

  //use effect to use the axios library to allow the API Data to be called within the application
  //cancel variable loaded to a cancelToken to enable the removal of the old Data when a new set is to be displayed 
  useEffect(() => {
    //display the load page when the user is moving between pages so they can see it is working rather than a blank page 
    setLoad(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      //disables the load screen once the data has been loaded from the API
      setLoad(false)
      //allow the creation of the next and previous to allow the user to see the next and previous set of pokemon depending on the button they click 
      setNextPage(res.data.next)
      setPrevPage(res.data.previous)
      //loop through the data to display the name of each of the pokemon in the set
      setPokemon(res.data.results.map(p => p.name))
    })
//allow the previous set of data to be removed currentpageUrl changes and load the new set of data 
    return () => cancel()
  }, [currentPageUrl])

  //function to allow the user to move to the next page when they click on the next button
  function gotoNextPage() {
    setCurrentPageUrl(nextPage)
  }
//function to allow the user to move to the previous page when the user clicks on the previous button
  function gotoPrevPage() {
    setCurrentPageUrl(prevPage)
  }
//when the application data is loading display this message
//depending on internet connection this will be displayed 
  if (load) return "Application Loading..."
//return and display the pokemon list and the buttons for the n
  return (
    <>
    {/* display the pokemon list on the application */}
      <PokemonList pokemon={pokemon} />
      {/* call the pagination and display the buttons to allow the user to move to next page or move to the previous page within the application */}
      <Pagination
      //checks that there is another page to open and if it is true this will render when the button is clicked
      //otherwise 
        gotoNextPage={nextPage ? gotoNextPage : null}
        //if there is not a previous set to load then the button will not render on the application otherwise it will load
        gotoPrevPage={prevPage ? gotoPrevPage : null}
      />
    </>
  );
}
export default App;