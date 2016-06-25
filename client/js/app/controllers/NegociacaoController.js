class NegociacaoController {
    
    constructor(){

        let self = this;

        //A busca dos elementos no DOM sendo executada no construtor da classe torna o mais 
        //performático o código pois os elementos só serão buscados no DOM uma única vez.

        //Cria um alias "$" para o document.querySelector
        let $ = document.querySelector.bind(document);

        //Pega os dados dos inputs do formulário
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        // Aqui estamos criando um proxy para lista de negociações e objetivo e incluir comportamentos
        // sem ter que alterar o modelo "ListaNegocicoes".
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            // Aqui toda vez que um metodo/função da classe é invocado o JS primeiro faz um get nessa função
            // para depois fazer o apply então aqui vamos interceptar essa chamada, verificar se é um dos
            // métodos que queremos e mudar sua implementação adicionando comportamento para ela.
            //target = Instancia de ListaNegociacoes.
            //prop = propriedade/método que está sendo acessado.
            //receiver = instancia do proxy
            get: function (target, prop, receiver) {

                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function) ) {

                    // Essa é a nova implementação que será utilizada pelo proxy
                    return function() {     
                        console.log(`interceptando ${prop}`);
                        
                        //Essa linha está executando o método invocado no contexto do objeto original
                        //passando todos os argumentos que foram passados na chamada "arguments".
                        //O arguments é um array que está no contexto da chamada do método.
                        //target[prop] = o propriedade/método que está sendo acessado.
                        //target = instancia da ListaNegociacoes
                        //arguments = é um array que está no contexto da chamada do método mesmo que não sejam passados parâmetros.
                        Reflect.apply(target[prop], target, arguments)

                        //Utilzamos o self pois precisamos nesta linha acessar um atributo do controller
                        // e não do proxy nem do target do proxy
                        //A linha abaixo foi o comportamento que adicionamos a execução padrão dos métodos
                        //adiciona e esvazia da classe "ListaNegociacoes" 
                        self._negociacoesView.update(target);
                    }
                }

                //Caso não seja função retorna o valor que está sendo lido.
                return Reflect.get(target, prop, receiver);
            }

        }); 

        //Modelos
        //this._listaNegociacoes = new ListaNegociacoes((model) => this._negociacoesView.update(model));
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
        this._limparFormulario();  
        this._mensagem.texto = 'Negociação adicionada com sucesso.'; 
        this._mensagemView.update(this._mensagem);     

    }

    // Apaga todas as negociações
    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso.';
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