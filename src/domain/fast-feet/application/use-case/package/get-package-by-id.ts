import { Package } from "@/domain/fast-feet/entities/package"
import { PackageRepository } from "../../repository/package-repository"

interface GetPackageByIdRequest {
  packageId: string
}

type GetPackageByIdResponse = {
  _package: Package
}

export class GetPackageByIdUseCase {
  constructor(private packageRepository: PackageRepository) { }
  async execute({
    packageId
  }: GetPackageByIdRequest): Promise<GetPackageByIdResponse> {
    const _package = await this.packageRepository.findById(packageId)

    if (!_package) {
      throw new Error('Package not found')
    }

    return {
      _package
    }
  }
}