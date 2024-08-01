import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entiti-id";
import { Status, StatusValueObject } from "./value-object/status";
import { Recipient } from "./recipient";
import { AggregateRoot } from "@/core/entities/aggregate-root";
import { CreatePackageEvent } from "@/domain/events/create-package";

// type Status  = {
//   disponivel?: 'disponivel',
//   aguardando?: 'aguardando',
//   cancelado?: 'cancelado',
//   entregue?: 'entregue',
//   devolvida?: 'devolvida',
// }

export interface PackageProps {
  id: UniqueEntityId
  name: string
  userId: string
  recipient: Recipient
  status: StatusValueObject
  createdAt: Date
  updatedAt?: Date | null
}

export class Package extends AggregateRoot<PackageProps> {
  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get userId() {
    return this.props.userId
  }

  get recipient() {
    return this.props.recipient
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set status(status: StatusValueObject) {
    this.props.status = status
  }

  set userId(userId: string) {
    this.props.userId = userId
  }

  set recipient(recipient: Recipient) {
    this.props.recipient = recipient
  }

  // set createdAt(createdAt: Date) {
  //   this.props.createdAt = createdAt
  // }

  // set updatedAt(updatedAt: Date) {
  //   this.props.updatedAt = updatedAt
  // }

  static create(props: PackageProps) {
    const _package = new Package(props)
    if (!_package.id) {

      this.addDomainEvent(new CreatePackageEvent(_package))
    }

    return _package
  }
  static addDomainEvent(arg0: CreatePackageEvent) {
    throw new Error("Method not implemented.");
  }
}