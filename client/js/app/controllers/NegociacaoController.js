class NegociacaoController {
    
    constructor(){
        //A busca dos elementos no DOM sendo executada no construtor da classe torna o mais 
        //performático o código pois os elementos só serão buscados no DOM uma única vez.

        //Cria um alias "$" para o document.querySelector
        let $ = document.querySelector.bind(document);

        //Pega os dados dos inputs do formulário
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        //Cancela o comportamento padrão de submissão do form
        event.preventDefault();

        let data = this.getDataNegociacao(this._inputData.value);

        let negociacao = this.novaNegociacao(data, this._inputQuantidade.value, this._inputValor.value);        

        this.limparFormulario();

        console.log(negociacao);
        // adicionar a negociação em uma lista

    }

    // Cria uma negociação a partir dos dados da tela
    novaNegociacao(data, quantidade, valor) {
        return new Negociacao(
            data,
            quantidade,
            valor
        );
    }

    //Recebe uma data no formato YYYY-MM-DD
    getDataNegociacao(strData) {

        // ... significa "spread operator" que faz é pegar cada item do array e passar
        // como parâmetro para a classe date ou para um método ou etc.

        //map função do array que percorre os itens do mesmo e faz uma transformação retornando 
        // um novo array

        //=> é uma "arrow function"
        // Caso a arrow function possua somente uma linha não é necessário usar os {} para delimilitá-la.
        // e nem o return para retornar o valor
        //Esse código usando função normal seria:
            // map(function(item, indice) { return indice == 1 ? item-1 : item; })

        return new Date(...
            strData
            .split('-')
            .map((item, indice) => indice == 1 ? item-1 : item)
        );
    }

    limparFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = ""; 
        this._inputValor.value = "";
        this._inputData.focus();
    }
    
}