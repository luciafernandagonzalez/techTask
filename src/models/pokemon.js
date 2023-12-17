class pokemon {
    constructor(idPokemon, name, experience, height, weight) {
        this.idPokemon = idPokemon;
        this.name = name;
        this.experience = experience;
        this.height = height;
        this.weight = weight;
        this.skillList = []
    }
}
export default pokemon;