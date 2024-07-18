# WORKTRIPS IOC RECRUITMENT TASK

## Requirements

To start Azure function locally you will need:
1. Node.js 20 LTS & npm [(installation instructions)](https://nodejs.org/en/download)
2. Azure Functions Core Tools [(installation instructions)](https://github.com/Azure/azure-functions-core-tools#installing)

## Task

Extend the Azure Function (HttpTrigger) so that it can receive a list of Pokémon IDs (multiple) and a type (single), and then return a list of Pokémon names that match the conditions.

* Remember SOLID principles.
* To fetch Pokémon data, use: https://pokeapi.co.
* The Azure Function should be triggered via GET request (HTTP triggered function).
* Please use lodash, axios and inversify.
* Use the existing structure and extend it.
* Code should be linted.
* Example invocation: `http://localhost:7071/api/HttpTrigger?id=1&id=2&id=5&type=grass`
* Example response: 
```json 
{ "status": 200, "body": { "pokemons": ["bulbasaur", "ivysaur"] } }
```

If something isn't clearly specified in the instructions, decide on your own and be prepared to explain your decision. We strongly rely on your invention and creativity.

Please do not use any client packages dedicated to handling the PokeAPI.

Good luck :slightly_smiling_face:
