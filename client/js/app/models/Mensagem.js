class Mensagem {

    // Caso não seja passada o parametro no construtor assume ''.
    //Não suportado pelo Edge.
    //constructor(texto = '') {

    constructor(texto) {
        this._texto = texto || '';
    }

    get texto() {
        return this._texto;
    }

    set texto(texto) {
        this._texto = texto;
    }

}