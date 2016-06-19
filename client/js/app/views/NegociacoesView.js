class NegociacoesView {

    constructor(elemento) {
        this._elemento = elemento;
    }

    // Métod privado que retorna a tabela de negociações utilizando Template String
    _template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${this._criaLinhas(model.negociacoes)}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>${this._criaRodape(model.negociacoes)}</td>
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

    // Método privado que constroi o rodapé da tabela
    // Podemos utilizar o método "reduce" do array que retorna um único valor a apartir de um array
    _criaRodape(lista) {
        let rodape = 0.0;
        lista.forEach(n => {
            rodape += n.volume;
        })
        return rodape;
    }

    // Método público que atualiza a tabela na view
    update(model) {
        this._elemento.innerHTML = this._template(model);
    }

}