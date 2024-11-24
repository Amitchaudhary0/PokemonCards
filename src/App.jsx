
import { useEffect, useState } from 'react'
import './App.css'
import Card from './Components/Card.jsx'

function App() {
  const [PokemonData, setPokemonData] = useState([])
  const [Loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch.trim());
  }

  async function fetchdata() {
    try {
      let resonse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      let pokemonData = await resonse.json();
      const pokemons = await Promise.all(
        pokemonData.results.map(async (e) => {
          let data = await fetch(e.url);
          let pokemon = await data.json();
          return {
            name: e.name,
            image: pokemon.sprites.other.dream_world.front_default,
            height: pokemon.height,
            weight: pokemon.weight,
            experence: pokemon.base_experience,
            ability: pokemon.abilities[1]?.ability.name,
            cries: pokemon.cries.latest,
            type: pokemon.types,
            speed: pokemon.stats[5]?.base_stat,
            attack: pokemon.stats[1]?.base_stat,
          };
        })
      );
      setPokemonData(pokemons);
      setLoading(false);
    } catch (error) {
      console.log("Catch error in fething Pokemons: ", error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, [])

  const searchPokemon = PokemonData.filter((e)=>{
    return e.name.toLowerCase().includes(search.toLowerCase());
  })

  return (
    <>
      <div className='flex flex-col items-center bg-slate-200 h-screen overflow-hidden'>
        <h1 className='text-center sm:text-4xl text-2xl my-4'>Lets Catch Pokemon</h1>
        <div className="searchbar w-full h-10">
          <input className="w-3/4 text-center md:w-1/4 block m-auto p-2 hover:border-b-2 hover:border-black focus:outline-none focus:border-b-2  focus:border-black rounded-sm" type="text" placeholder='Find Pokemon' value={search} onChange={handleChange} />
        </div>
 <div className="max-w-screen-xl flex flex-wrap justify-center overflow-y-scroll m-2">
            {Loading ? <img className='spinner' src="../public/spinner1.gif" alt="../public/spinne2.gif" /> : searchPokemon.map(e => {
              return <Card key={e.name} name={e.name} img={e.image} ability={e.ability}
              height={e.height} weight={e.weight} exp={e.experence} aby={e.ability} cry={e.cries} type={e.type} speed={e.speed} attack={e.attack} />
            })}

          </div>
      </div >

    </>
  )
}

export default App
