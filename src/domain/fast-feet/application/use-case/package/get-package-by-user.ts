import { Package } from "@/domain/fast-feet/entities/package"
import { PackageRepository } from "../../repository/package-repository"

interface GetPackageByUserRequest {
  userId: string
}

type GetPackageByUserResponse = {
  _package: Package[]
}

export class GetPackageByUserUseCase {
  constructor(private packageRepository: PackageRepository) { }
  async execute({
    userId
  }: GetPackageByUserRequest): Promise<GetPackageByUserResponse> {
    const _package = await this.packageRepository.findByUser(userId)

    if (!_package) {
      throw new Error('Packages not found')
    }

    return {
      _package
    }
  }
}