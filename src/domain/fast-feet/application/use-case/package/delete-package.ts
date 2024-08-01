import { Package } from "@/domain/fast-feet/entities/package";
import { PackageRepository } from "../../repository/package-repository";
import { UniqueEntityId } from "@/core/entities/unique-entiti-id";

interface PackagesRequest {
  id: UniqueEntityId
}

export class DeletePackageUseCase {
  constructor(private packageRepository: PackageRepository) { }

  async execute({
    id,

  }: PackagesRequest) {
    const _package = await this.packageRepository.findById(id.toString())

    if (!_package) {
      throw new Error('Package not found')
    }

    await this.packageRepository.delete(_package)
  }
}