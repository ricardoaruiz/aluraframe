# aluraframe

Curso JavaScript avançado I: ES6, orientação a objetos e padrões de projetos

- 1 - Especificando uma negociação

	- Aqui criamos a classe (modelo) Negociação (propriedades: data, quantidade e valor) que deve ser imutável e para isso foi utilizado alguns recursos como:
		- As propriedades privadas da classe declaradas no constructor devem ter o prefixo "_". Isso é uma convenção.
			Exemplo this._quantidade = quantidade;
		- Parâmetros recebidos no construtor são criados novos objetos antes de atribuir a propriedade do objeto.
			Exemplo: this._data = new Date(data); //data é um parâmetro recebido no construtor
		- Utilizar o freeze no construtor da classe para não permitir que suas propriedades sejam acessadas diretamente.
			Object.freeze(this); // deve ser a última instrução do construtor			
		- Para os métodos get's nunca devolvemos a propriedade diretamente e sim um novo objeto a partir da propriedade.
			Exemplo: return new Date(this._data.getTime());
