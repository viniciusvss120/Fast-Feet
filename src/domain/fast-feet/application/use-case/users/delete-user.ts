import { UserRepository } from "../../repository/user-repository"

interface DeleteUserRequest {
  userId: string
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) { }
  async execute({
    userId,
  }: DeleteUserRequest): Promise<void> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }


    await this.userRepository.delete(user)

  }
}