class MensagemView extends View {

    constructor(elemento) {
        super(elemento);
    }

    // Sobrescrito de View
    // Métod privado que renderiza a mensagem na view
    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }

}