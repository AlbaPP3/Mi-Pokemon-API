
import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonEncontrados, setPokemonEncontrados] = useState([]);
  const [pokemonActual, setPokemonActual] = useState(null);
  const [pokemonQuitadoActual, setPokemonQuitadoActual] = useState(null);
  const [mensajeEncontrar, setMensajeEncontrar] = useState("");
  const [mensajeQuitar, setMensajeQuitar] = useState("");
  const [contador, setContador] = useState(0); 

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
      });
  }, []);

  const encontrarPokemon = () => {
    if (pokemonList.length === 0) {
      alert("No quedan Pokemons por encontrar");
      return;
    }
    const indice = Math.floor(Math.random() * pokemonList.length);
    const pokemonEncontrado = pokemonList[indice];
    setPokemonList((prevList) =>
      prevList.filter((pokemon) => pokemon !== pokemonEncontrado)
    );
    setPokemonEncontrados((prevList) => [...prevList, pokemonEncontrado]);
    setPokemonQuitadoActual(null);
    fetch(pokemonEncontrado.url)
      .then((response) => response.json())
      .then((data) => {
        setPokemonActual(data.sprites.front_default);
        setMensajeEncontrar(`Te ha tocado: ${pokemonEncontrado.name}!`);
        setMensajeQuitar("");
        setContador((prevContador) => prevContador + 1); 
      });
  };

  const quitarPokemon = () => {
    if (pokemonEncontrados.length === 0) {
      alert("No hay Pokemons encontrados");
      return;
    }
    const indice = Math.floor(Math.random() * pokemonEncontrados.length);
    const pokemonQuitado = pokemonEncontrados[indice];
    setPokemonEncontrados((prevList) =>
      prevList.filter((pokemon) => pokemon !== pokemonQuitado)
    );
    setPokemonList((prevList) => [...prevList, pokemonQuitado]);
    setPokemonActual(null);
    fetch(pokemonQuitado.url)
      .then((response) => response.json())
      .then((data) => {
        setPokemonQuitadoActual(data.sprites.front_default);
        setMensajeQuitar(`Se te ha escapado: ${pokemonQuitado.name}!`);
        setMensajeEncontrar("");
        setContador((prevContador) => prevContador - 1); 
      });
  };

  return (
    <div className="todo">
      <div className="title">
        
        <div className ="pokeball"><img  src="Pokeball.png" alt="10px"/></div>
        <div className="lema"><img  src="todos.png" alt="10px"/></div>
      </div>
      <div className="btn">
        <button onClick={encontrarPokemon}>+</button>
        <p>{contador}</p>
        <button onClick={quitarPokemon}>-</button>
     </div>
     <div className="mensaje">
        <p>{mensajeEncontrar}</p>
        <p>{mensajeQuitar}</p>
      </div>
      <div className="img poke">
        {pokemonActual && <img src={pokemonActual}  />}
        {pokemonQuitadoActual && <img src={pokemonQuitadoActual} />}
      </div>
      <div className="consiguelos">
        <h1>Consíguelos a todos</h1>
      </div>
      <div className="listas">
        <div className="listanoencontrados">
          <h2>Pokemons por Capturar</h2>
          <ul>
            {pokemonList.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
        ))}
          </ul>
        </div>
        <div className="listaencontrados">
          <h2>Pokemons Capturados</h2>
          <ul>
            {pokemonEncontrados.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
        ))}
          </ul>
        </div>
      </div>
      </div>
  );
}

export default App;