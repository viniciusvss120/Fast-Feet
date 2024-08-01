import { DomainEvents } from "@/core/events/domain-events";
import { FindManyNearbyParams, PackageRepository } from "@/domain/fast-feet/application/repository/package-repository";
import { Package } from "@/domain/fast-feet/entities/package";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinats";

export class InMemoryPackage implements PackageRepository {

  public items: Package[] = []

  async findById(id: string): Promise<Package | null> {
    const result = this.items.find((_package) => _package.id.toString() === id)

    if (!result) {
      return null
    }

    return result
  }

  async findByUser(userId: string): Promise<Package[] | null> {
    const result = this.items.filter((_package) => _package.userId.toString() === userId)

    if (!result) {
      return null
    }

    return result
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Package[] | null> {
    return this.items.filter(item => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: item.recipient.latitude, longitude: item.recipient.longitude }
      )
      return distance < 3
    })
  }

  async save(_package: Package): Promise<void> {
    const packageIndex = await this.items.findIndex(index => index.id === _package.id)

    this.items[packageIndex] = _package
    DomainEvents.dispatchEventsForAggregate(_package.id)
  }

  async create(_package: Package) {
    this.items.push(_package)

    DomainEvents.dispatchEventsForAggregate(_package.id)

  }

  async delete(_package: Package): Promise<void> {
    const packageIndex = await this.items.findIndex(index => index.id === _package.id)

    this.items.splice(packageIndex, 1)
  }

}