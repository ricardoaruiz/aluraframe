/**
 * Classe responsável por executar as chamadas http
 */
class HttpService {

    /**
     * Chama uma url com o método GET retornando uma promise
     */
    get(url) {

        return new Promise((resolve, reject) => {

            //Cria o objeto para realizar a requisição.
            let xhr = new XMLHttpRequest();

            //Informa o método HTTP e a URL que será acessada.
            xhr.open('GET', url);

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
                        resolve(JSON.parse(xhr.responseText));                                            
                    } else {
                        reject(xhr.responseText);
                    }
                }
            }

            xhr.send();
        });        

    }

    post(url, dados) {

        return new Promise( (resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onreadystatechange = () => {
                if(xhr.readyState == XMLHttpRequest.DONE) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.send(JSON.stringify(dados));
        });

    }

}