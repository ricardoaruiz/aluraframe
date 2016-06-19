class DateHelper {

    //Como essa classe só terá métodos estáticos, caso seja criado um objeto
    //será retornada uma exceção informando que a classe não deve ser instanciada.
    constructor() {
        throw new Error('Esta classe não pode ser instanciada.');
    }

    //Recebe uma string no formato YYYY-MM-DD e retorna uma data
    static textoParaData(texto) {

        // ... significa "spread operator" que faz é pegar cada item do array e passar
        // como parâmetro para a classe date ou para um método ou etc.

        //map função do array que percorre os itens do mesmo e faz uma transformação retornando 
        // um novo array

        //=> é uma "arrow function"
        // Caso a arrow function possua somente uma linha não é necessário usar os {} para delimilitá-la.
        // e nem o return para retornar o valor
        //Esse código usando função normal seria:
            // map(function(item, indice) { return indice == 1 ? item-1 : item; })

        if( !/\d{4}-\d{2}-\d{2}/.test(texto) ) throw new Error('Deve estar no formato YYYY-MM-DD');

        return new Date(...
            texto
            .split('-')
            .map((item, indice) => indice == 1 ? item-1 : item)
        );
    }

    // Recebe uma data e retorna uma string no formato DD/MM/YYYY
    // Estamos usando o Template String `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`; 
    }

}