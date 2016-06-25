class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacoes(){
        //Retornamos uma nova lista com os elementos da original para garantir
        //que não seja possível alterar a lista externamente.
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
    }

}