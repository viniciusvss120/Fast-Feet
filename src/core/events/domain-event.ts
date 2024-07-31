import { UniqueEntityId } from '../entities/unique-entiti-id'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityId
}
