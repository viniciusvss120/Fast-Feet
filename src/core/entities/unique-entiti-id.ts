import { randomUUID } from "crypto"

export class UniqueEntityId {
  private value: string 

  toString(){
    return this.value = this.value
  }
  constructor(value?: string){
    this.value = value ?? randomUUID()
  }

  public equals(id: UniqueEntityId) {
    return id.toString() === this.value
  }
}