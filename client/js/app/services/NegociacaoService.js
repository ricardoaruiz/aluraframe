/**
 * Classe responsável por fazer as chamadas remotas aos serviços expostos.
 */
class NegociacaoService {

    constructor() {
        this._httpService = new HttpService();
    }

    /**
     * Retorna uma promise com as negociações da semana atual, passada e retrasada
     */
    obterNegociacoes() {
        return new Promise( (resolve, reject) => {
            // Promisse.all é uma maneira de executar várias promises observando a sequência de execução
            // Caso alguma delas dê problema nada será retornado caindo no catch para tratar o erro.
            // Caso não ocorra problema o resultado é a junção do resultado das promisses em um único retorno.
            Promise.all(
                [
                 this.obterNegociacoesDaSemana()
                ,this.obterNegociacoesDaSemanaAnterior()
                ,this.obterNegociacoesDaSemanaRetrasada()
                ]
            ).then( negociacoes => {
                // quando todas as promises foram executadas com sucesso a variável "negociacoes" recebida
                // no then terá um array de arrays de negociacao. A idéia do "reduce"" é transformar esse array de 
                // array de negociacao em um array com todas as negociações de todos os arrays retornados.
                console.log(negociacoes);

                // Reduce recebe uma função e a incialização da variável resultante de seu processamento
                // A função recebe os seguintes parâmetros:
                    // arrayAchatado = é o resultado final do processamento do reduce.
                    // array = é cada array contido no array principal retornado pelas promises.
                // A inicialização do resultado é:
                // [] = inicialização do arrayAchatado.
                resolve(negociacoes.reduce( (arrayAchatado, array) => arrayAchatado.concat(array), [] ));
                            
            }).catch( erro => reject(erro)); 
        });               
    }

    /**
     * Retorna uma promise com as negociações da semana.
     */
    obterNegociacoesDaSemana() {        
        return new Promise( (resolve, reject) => {
            this._httpService
                .get('negociacoes/semana')
                .then( negociacoes => {
                    resolve(negociacoes.map( objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch( erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana.');
                });
        });        
    }

    /**
     * Retorna uma promise com as negociações da semana anterior.
     */
    obterNegociacoesDaSemanaAnterior() {        
        return new Promise( (resolve, reject) => {
            this._httpService
                .get('negociacoes/anterior')
                .then( negociacoes => {
                    resolve(negociacoes.map( objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch( erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior.');
                });
        });
    }

    /**
     * Retorna uma promise com as negociações da semana retrasada.
     */
    obterNegociacoesDaSemanaRetrasada() {
       return new Promise( (resolve, reject) => {
            this._httpService
                .get('negociacoes/retrasada')
                .then( negociacoes => {
                    resolve(negociacoes.map( objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch( erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada.');
                });
        });       
    }

}