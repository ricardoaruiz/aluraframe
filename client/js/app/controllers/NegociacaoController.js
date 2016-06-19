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
        this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);
    }

    // Adiciona uma negociação a lista de negociações
    adiciona(event) {
        //Cancela o comportamento padrão de submissão do form
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);
        this._limparFormulario();        

    }

    // Cria uma negociação a partir dos dados da tela
    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value)
            , this._inputQuantidade.value
            , this._inputValor.value
        );
    }   

    // Limpa o formulário
    _limparFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 1; 
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
    
}