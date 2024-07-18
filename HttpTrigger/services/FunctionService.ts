import {inject, injectable} from "inversify";
import axios, {AxiosResponse} from 'axios';
import * as _ from 'lodash';
import {COMMON_TYPES} from "../../ioc/commonTypes";
import {ILogger} from "../../commonServices/ILogger";
import IMessage from "../../Interfaces/IMessage";
import {IPokemon, IPokemonType} from "../../Interfaces/IPokemon";
import {ISuccessResponse} from "../../Interfaces/ISuccessResponse";
import {IFunctionService} from "./IFunctionService";

@injectable()
export class FunctionService implements IFunctionService<any> {

    @inject(COMMON_TYPES.ILogger)
    private readonly _logger: ILogger;

    public async processMessageAsync(msg: IMessage): Promise<ISuccessResponse | {error: string}> {
        this._logger.info("Processing Pokémon data");
        this._logger.verbose(`Request data: ${JSON.stringify(msg)}`);

        const ids: string[] = msg.id.split(',');
        const type: string = msg.type;

        if (!Array.isArray(ids) || !type) {
            return { error: "Please provide a list of ids and a type" };
        }

        try {
            const pokemons: AxiosResponse<IPokemon>[] = await Promise.all(
                ids.map((id: string): Promise<AxiosResponse<IPokemon>> => axios.get<IPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`))
            );

            const filteredPokemons: string[] = _.filter(pokemons, (pokemon: AxiosResponse<IPokemon>): boolean =>
                _.some(pokemon.data.types, (t: IPokemonType): boolean => t.type.name === type)
            ).map((pokemon: AxiosResponse<IPokemon>): string => pokemon.data.name
            );

            return {
                status: 200,
                body: {
                    pokemons: filteredPokemons
                }
            };
        } catch (error) {
            this._logger.error("An error occurred while fetching Pokémon data");
            return { error: "An error occurred while fetching Pokémon data" };
        }
    }
}