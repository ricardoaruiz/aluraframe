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
        
        //Modelos
        this._listaNegociacoes = new ListaNegociacoes();
        this._mensagem = new Mensagem();

        //Views
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._mensagemView = new MensagemView($('#mensagemView'));

        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagemView.update(this._mensagem);        
    }

    // Adiciona uma negociação a lista de negociações
    adiciona(event) {
        //Cancela o comportamento padrão de submissão do form
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);
        this._limparFormulario();  
        this._mensagem.texto = 'Negociação adicionada com sucesso.'; 
        this._mensagemView.update(this._mensagem);     

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