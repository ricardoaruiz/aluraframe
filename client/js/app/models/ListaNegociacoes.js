class ListaNegociacoes {

    constructor(funcUpdateView) {
        this._negociacoes = [];
        this._funcUpdateView = funcUpdateView;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._funcUpdateView(this);

    }

    get negociacoes(){
        //Retornamos uma nova lista com os elementos da original para garantir
        //que não seja possível alterar a lista externamente.
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
        this._funcUpdateView(this);
    }

}