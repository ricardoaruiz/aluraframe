class NegociacoesView extends View {

    constructor(elemento) {
        super(elemento);
    }

    // Sobrescrito de View
    // Métod privado que retorna a tabela de negociações utilizando Template String
    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacaoController.ordena('data')">DATA</th>
                    <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${this._criaLinhas(model.negociacoes)}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>${model.volumeTotal}</td>
            </tfoot>
        </table>
        `;
    }

    // Método privado que constroi as linhas da tabela em função da lista de negociações 
    // informada utilizando Template String e Arrow Function =>
    _criaLinhas(lista) {
        let linhas = '';
        lista.forEach(n => {
            linhas += `
                <tr>
                    <td>${DateHelper.dataParaTexto(n.data)}</td>
                    <td>${n.quantidade}</td>
                    <td>${n.valor}</td>
                    <td>${n.volume}</td>
                </tr>
            `;            
        });
        return linhas;
    }

}