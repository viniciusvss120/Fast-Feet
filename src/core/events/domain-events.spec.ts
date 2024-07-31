import { it } from "vitest";
import { describe, expect, vi } from "vitest";
import { AggregateRoot } from "../entities/aggregate-root";
import { DomainEvent } from "./domain-event";
import { UniqueEntityId } from "../entities/unique-entiti-id";
import { DomainEvents } from "./domain-events";

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate,
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create(){
    const aggregate = new CustomAggregate(null)
    
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))
    return aggregate
  }
}
describe('domain events', () => {
  it('should be abble to dispath and listen to eventa', () => {
    const callbackSpy = vi.fn()

    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    const aggregate = CustomAggregate.create()

    expect(aggregate.domainEvents).toHaveLength(1)

    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(callbackSpy).toHaveBeenCalled()

    expect(aggregate.domainEvents).toHaveLength(0)
  })
})