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

    ordena(criterio) {
        this._negociacoes.sort(criterio);
    }

    inverteOrdem(){
        this._negociacoes.reverse();
    }

    // Podemos utilizar o método "reduce" do array que retorna um único valor a apartir de um array
    get volumeTotal() {
        let volumeTotal = 0.0;
        this._negociacoes.forEach(n => {
            volumeTotal += n.volume;
        })
        return volumeTotal;
    }

}