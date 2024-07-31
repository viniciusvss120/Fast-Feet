import { Package } from "@/domain/fast-feet/entities/package";
import { PackageRepository } from "../../repository/package-repository";
import { UniqueEntityId } from "@/core/entities/unique-entiti-id";
import { StatusValueObject } from "@/domain/fast-feet/entities/value-object/status";

interface PackageRequest {
  id: UniqueEntityId
  name: string
  status: StatusValueObject
}

type PackageResponse = {
  _package: Package
}
export class EditPackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({
    id,
    status
  }: PackageRequest): Promise<PackageResponse>{
    const _package = await this.packageRepository.findById(id.toString())

    if (!_package) {
      throw new Error('Package not found')
    }

    _package.status = status


    await this.packageRepository.save(_package)

    return {
      _package
    }
  }
}