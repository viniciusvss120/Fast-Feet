import { UniqueEntityId } from "@/core/entities/unique-entiti-id"
import { UserRepository } from "../../repository/user-repository"
import { User } from "@/domain/fast-feet/entities/user"
import { hash } from "bcrypt"

interface CreateUserRequest {
  userId: string
  name: string
  cpf: string
  password: string
  role: string
  createdAt: Date
}

type CreateUserResponse = {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) { }
  async execute({
    userId,
    name,
    cpf,
    password,
    role,
    createdAt
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await User.create({
      userId: new UniqueEntityId(userId),
      name,
      cpf,
      password: await hash(password, 8),
      role,
      createdAt
    })

    await this.userRepository.create(user)

    return { user }
  }
}