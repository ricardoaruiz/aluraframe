# aluraframe

Curso JavaScript avançado I: ES6, orientação a objetos e padrões de projetos

- Site com tabela de compatibilidade ECMA: https://kangax.github.io/compat-table/es6/

- 1 - Criação do Projeto

- 2 - Especificando uma negociação

	- Aqui criamos a classe (modelo) Negociação (propriedades: data, quantidade e valor) que deve ser imutável e para isso foi utilizado alguns recursos como:
		- As propriedades privadas da classe declaradas no constructor devem ter o prefixo "_". Isso é uma convenção.
			Exemplo:

				this._quantidade = quantidade;			

		- Parâmetros recebidos no construtor são criados novos objetos antes de atribuir a propriedade do objeto.
			Exemplo: 

				this._data = new Date(data); //data é um parâmetro recebido no construtor

		- Utilizar o freeze no construtor da classe para não permitir que suas propriedades sejam acessadas diretamente.
			Exemplo: 

				Object.freeze(this); // deve ser a última instrução do construtor			

		- Para os métodos get's nunca devolvemos a propriedade diretamente e sim um novo objeto a partir da propriedade.
			Exemplo: 

				return new Date(this._data.getTime());


- 3 - A ligação entre as ações do usuário e o modelo

	- Criamos um "NegociacaoController" que terá o método "adiciona" que deve se acionado no submit do formulário para pegar os dados do mesmo.
	- Criamos um alias "$" para o document.querySelector para não ter que ficar repetindo código.
		Exemplo:

			//Cria um alias "$" para o document.querySelector
        	let $ = document.querySelector.bind(document);

        	this._inputData = $('#data');


	- Utilizamos o recurso "Spread Operator" "..." que pega cada item de um array e passa como parâmetro para a classe date ou para um método ou etc. Utilizamos isso para pegar o valor da data que veio da tela e passar para o construtor do "Date".

	- Utilizamos o a função "map" do array para decrementar em um o valor do mês recebido da tela.
		Exemplo:

			.map((item, indice) => indice == 1 ? item-1 : item)


	- Utilizamos uma "Arrow Function =>" para passar a função para o para o "map do array". Caso a arrow function possua somente uma linha não é necessário usar as "{}"" para delimilitá-la e nem o return para retornar seu valor.
		Exemplo:

			.map((item, indice) => indice == 1 ? item-1 : item)


- 4 - Lidar com data é trabalhoso? Chame um ajudante!

	- Criamos uma classe "DateHelper" que conterá métodos estáticos (static) para fazer as transformações/criações das datas necessárias. Nessa classe como só teremos métodos estáticos não deve ser possível instanciá-la e faremos isso da seguinte forma:

			constructor() {
				throw new Error('Não é possível instanciar essa classe.');
			}

	- Utilizamos o "Template String" no método dataParaTexto para evitar a concatenção de strings.
		Exemplo:

			static dataParaTexto(data) {
        		return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`; 
    		}

    - Criamos uma classe "ListaNegociacoes" que é responsável por gerenciar as negociaçoes criadas. Só será possível adicionar novas negociações não podendo remover nem alterar. Criamos essa classe como imutável.

- 5 - Temos o modelo, mas e a view?

	- Criamos uma classe "NegociacoesView" que será responsável por realizar a atualização da tabela na nossa view. Para isso utilizaremos o "Template String". Nessa classe será renderizada a tabela na view com suas linhas e seu rodapé.