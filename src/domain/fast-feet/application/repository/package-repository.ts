import { Package } from "@/domain/fast-feet/entities/package";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface PackageRepository {
  findById(id: string): Promise<Package | null>
  findByUser(id: string): Promise<Package[] | null>
  findManyNearby(parms: FindManyNearbyParams): Promise<Package[] | null>
  save(_package: Package): Promise<void>
  create(_package: Package): Promise<void>
  delete(_package: Package): Promise<void>
}