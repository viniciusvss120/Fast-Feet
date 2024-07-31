import { UniqueEntityId } from "@/core/entities/unique-entiti-id"
import { DomainEvent } from "@/core/events/domain-event"
import { Package } from "@/domain/fast-feet/entities/package"
import { StatusValueObject } from "../fast-feet/entities/value-object/status"

export class CreatePackageEvent implements DomainEvent {
  public ocurredAt: Date
  public packageEntity: Package

  constructor(_package: Package) {
    this.packageEntity = _package
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.packageEntity.id
  }
}