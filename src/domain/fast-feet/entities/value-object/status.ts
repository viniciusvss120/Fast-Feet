// Até o momento não vemos necessidade em usar essa classe

// Neste value object criamos um enum, onde estamos colocando quais status a encomenda pode ter, logo em seguida, criamos a class, na qual o value vai receber o status, o toValue vai permitir acessar o value e, no constructor, recebemos o status, q é do tipo do enum Status, e atribuimos a propriedade value o valor do status, por padrão estando como disponivel, mas podendo ser alterado para outros.

export enum Status {
  aguardando = 'aguardando',
  retirada = 'retirada',
  entregue = 'entregue',
  devolvida = 'devolvida',
  cancelado = 'cancelado',
}

export class StatusValueObject {
  private value: string

  toValue() {
    return this.value
  }

  constructor(value?: Status){
    this.value = value ?? Status.aguardando
  }
}