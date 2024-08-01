import { Package } from "@/domain/fast-feet/entities/package";
import { PackageRepository } from "../../repository/package-repository";
import { UniqueEntityId } from "@/core/entities/unique-entiti-id";
import { StatusValueObject } from "@/domain/fast-feet/entities/value-object/status";
import { Recipient } from "@/domain/fast-feet/entities/recipient";

interface PackageRequest {
  id: UniqueEntityId
  name: string
  userId: string
  recipient: Recipient
  status: StatusValueObject
  createdAt: Date
}

type PackageResponse = {
  _package: Package
}
export class CreatePackageUseCase {
  constructor(private recipienRepository: PackageRepository) { }

  async execute({
    id,
    name,
    userId,
    recipient,
    status,
    createdAt
  }: PackageRequest): Promise<PackageResponse> {

    const _package = await Package.create({
      id: id,
      name,
      userId,
      recipient,
      status,
      createdAt
    })

    await this.recipienRepository.create(_package)

    return {
      _package
    }
  }
}