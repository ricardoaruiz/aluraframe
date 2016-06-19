class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    // Esse método lança exceção para indicar que o método template deve ser implementado 
    //pelas classes filhas
    template(model) {
        throw new Error('O método _template deve ser implementado.');
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }

}