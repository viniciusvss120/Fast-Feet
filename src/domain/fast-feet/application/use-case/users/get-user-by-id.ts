import { User } from "@/domain/fast-feet/entities/user"
import { UserRepository } from "../../repository/user-repository"

interface GetUserByIdRequest {
  userId: string
}

type GetUserByIdResponse = {
  user: User
}

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) { }
  async execute({
    userId
  }: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      user
    }
  }
}