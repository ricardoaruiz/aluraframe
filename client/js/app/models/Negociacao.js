class Negociacao {
    
    //Construtor da classe que será imutável
    //Atributos pre-fixados com _ são convencionados com privado e não devem ser acessados diretamente.
    constructor(data, quantidade, valor) {        
        
        //Cria-se uma nova data a partir da informada para garantir que não seja alterada por sua referência.
        this._data = new Date(data);
        
        this._quantidade = quantidade;
        this._valor = valor;
        
        //Object.freeze faz com que a instanncia não permita alterações diretamente em seus atributos.
        Object.freeze(this);
    }
    
    //Método para obter a data
    get data() {
        //Retornamos uma nova data para evitar que a data do objeto seja alterada pela sua referência.
        return new Date(this._data.getTime());
    }
    
    //Método para obter a quantidade
    get quantidade() {
        return this._quantidade;
    }
    
    //Método para obter o valor
    get valor() {
        return this._valor;
    }
    
    //Método para obter o volume
    get volume() {
        return this._quantidade * this._valor;
    }
    
}