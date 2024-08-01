import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entiti-id";

export interface RecipientProps {
  recipientId: UniqueEntityId
  name: string
  packageId: string[]
  rua: string
  numero: number
  bairro: string
  cidade: string
  estado: string
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Recipient extends Entity<RecipientProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get name() {
    return this.props.name
  }

  get packageId() {
    return this.props.packageId
  }

  get rua() {
    return this.props.rua
  }

  get numero() {
    return this.props.numero
  }

  get bairro() {
    return this.props.bairro
  }

  get cidade() {
    return this.props.cidade
  }

  get estado() {
    return this.props.estado
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  toValue() {
    return this.props
  }

  set rua(rua: string) {
    this.props.rua = rua

    this.touch()
  }

  set numero(numero: number) {
    this.props.numero = numero

    this.touch()
  }

  set bairro(bairro: string) {
    this.props.bairro = bairro

    this.touch()
  }

  set packageId(id: string[]) {
    this.props.packageId = id

    this.touch()
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude

    this.touch()
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude

    this.touch()
  }

  static create(props: RecipientProps) {
    const recipient = new Recipient(props)
    return recipient
  }
}