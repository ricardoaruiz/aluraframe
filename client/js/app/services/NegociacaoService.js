/**
 * Classe responsável por fazer as chamadas remotas aos serviços expostos.
 */
class NegociacaoService {

    /**
     * Obtem as negociações da semana.
     * cb : callback que tratará o resultado da função.
     *  cb recebe:
     *      erro - erro ocorrido na solicitação
     *      negociacoes - lista de negociações retornada pelo serviço remoto.
     */
    obterNegociacoesDaSemana(cb) {
        
        //Cria o objeto para realizar a requisição.
        let xhr = new XMLHttpRequest();

        //Informa o método HTTP e a URL que será acessada.
        xhr.open('GET', 'negociacoes/semana');

        /*Sempre que a requisição ajax muda esse evento é disparado.
         Os estados são:
         0: requisição não iniciada
         1: conexão com o servidor estabelecida
         2: requisição recebida
         3: processando requisição
         4: requisição concluída e a resposta está pronta
        */
        xhr.onreadystatechange = () => {
            //Caso a requisição esteja concluída e a resposta esteja pronta
            if (xhr.readyState == 4) {
                //Verifica se o HTTP status é 200 - OK
                if(xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                        .map( objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                                        
                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações do servidor.', null);
                }
            }
        }

        xhr.send();

    }

}