/**
 * Classe responsável por realizar ligação entre o modelo e a view e 
 * atualizar a view em função de uma alteração no modelo.
 */
class Bind {

    // Esse construtor retornará sempre a instancia de um proxy
    //model - objeto que define o modelo
    //view - objeto que atualiza a view
    //props - ações no modelo que vão disparar atualizações na view. Os 3 pontinhos significa que o
    // parametro é um "Rest operator" como se fosse um array
    constructor(model, view, ...props) {

        let proxy = ProxyFactory.create(
          model,
          props,
          (model) => view.update(model)
        );

        view.update(model);

        return proxy;

    }

}