import React, { useState, useEffect } from 'react';
import { Banner, Row, Box } from './style'
import api from '../services/api'

export default function Home(props) {

    const [offset, setOffset] = useState(0)
    const [pokemons, setPokemons] = useState([])
    const [pokemonSelect, setPokemonSelect] = useState(false)
    const [pokeData, setPokeData] = useState({})

    async function getPokemons(off) {
        await api.get(`pokemon?limit=${30}&offset=${off}`)
            .then(res => {
                console.log(res.data.results)
                setPokemons(res.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }

    async function getPokemonData(url) {
        await api.get(url.slice(26))
            .then(res => {
                setPokeData(res.data)
                setPokemonSelect(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getPokemons(offset);
    }, [offset])

    return (
        <>
            <Banner>Pokedex API</Banner>
            <Row style={{ margin: 30 }}>
                <Box justify="flex-start" width={400}>
                    <h2 style={{ margin: "15px 5px 0 5px" }}>LISTA DE POKEMONS</h2>
                    <ul>
                        {pokemons.map((pokemon, index) => (
                            <li style={{
                                margin: '5px 0',
                                cursor: 'pointer'}}
                                key={index}
                                onClick={() => getPokemonData(pokemon.url)}>
                                {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                            </li>
                        ))}
                    </ul>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '90%'
                    }}>

                        {offset !== 0 ? <button style={{width: '100px'}}  onClick={() => setOffset(offset - 30)}>Previous</button>
                            : null}
                        <button style={{width: '100px'}} onClick={() => setOffset(offset + 30)}>Next</button>
                    </div>
                    <br/>

                </Box>
                <Box justify="flex-start" width={500}>
                    <h2 style={{ margin: "15px 5px 0 5px" }}>POKEMON SELECIONADO:</h2>
                    {pokemonSelect ?
                        <>
                            <h3>Nome: {pokeData.name[0].toUpperCase() + pokeData.name.slice(1)}</h3>
                            <div style={{display: 'flex', width: '95%', alignItems: 'center', justifyContent: 'center', border: '1px solid grey', borderRadius: '30px'}}>
                                <img src={pokeData.sprites.front_default} alt={pokeData.name} />
                            </div>
                            <ul>
                            {pokeData.types.length > 1 ? 
                            <li>
                                Tipos:
                                {pokeData.types.map((tipo, index) => (<span key={index}> {tipo.type.name.toUpperCase()} </span>))}
                            </li>:
                            <li>Tipo: {pokeData.types[0].type.name.toUpperCase()}</li>}
                            </ul>
                        </>
                        :
                        <>
                            <h3>Selecione um pokemon da lista ao lado!</h3>
                        </>}
                </Box>
            </Row>

        </>
    )
}