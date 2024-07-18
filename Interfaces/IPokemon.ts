export interface IPokemonType {
    type: {
        name: string
    }
}

export interface IPokemon {
    name: string
    types: IPokemonType[]
}