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
        
        //Modelos e Views com o Databind.
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona','esvazia', 'ordena', 'inverteOrdem'
        );
                
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );
        
        // Indica a ordenação atual da tabela.
        this._ordemAtual = '';
    }

    // Adiciona uma negociação a lista de negociações
    adiciona(event) {
        //Cancela o comportamento padrão de submissão do form
        event.preventDefault();
        
        try{
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            this._limparFormulario();  
            this._mensagem.texto = 'Negociação adicionada com sucesso.'; 
        } catch( erro ) {
            this._mensagem.texto = erro;
        }
    }

    importaNegociacoes() {
        
        let negociacaoService = new NegociacaoService();

        negociacaoService.obterNegociacoes()
            .then( listaNegociacoes => {
                listaNegociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações obtidas com sucesso';
            })
            .catch(erro => this._mensagem.texto = erro);
    }    

    // Apaga todas as negociações
    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso.';
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna){
            this._listaNegociacoes.inverteOrdem();    
        } else {
            this._listaNegociacoes.ordena( (a, b) => a[coluna] - b[coluna] );
        }
        this._ordemAtual = coluna;
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