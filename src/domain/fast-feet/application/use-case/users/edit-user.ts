import { UniqueEntityId } from "@/core/entities/unique-entiti-id"
import { UserRepository } from "../../repository/user-repository"
import { User } from "@/domain/fast-feet/entities/user"

interface EditUserRequest {
  userId: string
  name: string
  cpf: string
  password: string
  role: string
}

type EditUserResponse = {
  user: User
}

export class EditUserUseCase {
  constructor(private userRepository: UserRepository) { }
  async execute({
    userId,
    name,
    cpf,
    password,
    role
  }: EditUserRequest): Promise<EditUserResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    user.role = role
    user.password = password

    await this.userRepository.save(user)

    return { user }
  }
}