class ProxyFactory {

    // objeto = Objeto a qual será criado o proxy
    // props = Array com o nome das funções/métodos que serão afetados pelo proxy.
    // acao = Ação que será adicionada ao comportamento padrão das funções/métodos.
    static create(objeto, props, acao) {

        // Aqui estamos criando um proxy para o "objeto" informado e objetivo e incluir comportamentos
        // sem ter que alterar o "objeto".
        return new Proxy(objeto, {

            // Aqui toda vez que um metodo/função da classe é invocado o JS primeiro faz um get nessa função
            // para depois fazer o apply então aqui vamos interceptar essa chamada, verificar se é um dos
            // métodos que queremos e mudar sua implementação adicionando comportamento para ela.
            //target = "objeto" informado
            //prop = propriedade/método que está sendo acessado.
            //receiver = instancia do proxy
            get(target, prop, receiver) {

                if ( props.includes(prop) && ProxyFactory._ehFuncao(target[prop]) ) {

                    // Essa é a nova implementação que será utilizada pelo proxy no lugar 
                    // da função/método informado.
                    return function() {                           
                        let ret = Reflect.apply(target[prop], target, arguments) 
                        acao(target);
                        return ret;
                    }
                }

                //Caso não seja função retorna o valor que está sendo lido.
                return Reflect.get(target, prop, receiver);
            },

            // Aqui toda a vez que a propriedade informada for alterada, será adicionado o comportamento
            // "acao" a essa mudança. 
            set(target, prop, value, receiver) {

                let ret = Reflect.set(target, prop, value, receiver);

                if (props.includes(prop)) {
                    acao(target);
                }
                return ret;
            }

        }); 

    }

    static _ehFuncao(prop) {
        return typeof(prop) == typeof(Function);
    }

}