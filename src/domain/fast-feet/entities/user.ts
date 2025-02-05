import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entiti-id"


export interface UserProps {
  userId: UniqueEntityId
  name: string
  cpf: string
  password: string
  role: string
  // id: string[]
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  get role() {
    return this.props.role
  }

  // get id (){
  //   return this.props.id
  // }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set role(role: string) {
    this.props.role = role

    this.touch()
  }

  // set id (id: string[]) {
  //   this.props.id = id

  //   this.touch()
  // }

  set password(password: string) {
    this.props.password = password

    this.touch()
  }

  static create(props: UserProps) {
    const user = new User(props)
    return user
  }
}