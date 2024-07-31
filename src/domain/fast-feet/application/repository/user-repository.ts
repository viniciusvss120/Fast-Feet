import { User } from "@/domain/fast-feet/entities/user";

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByCpf(cpf: string): Promise<User | null>
  findByRole(role: string): Promise<User[] | null>
  save(user: User): Promise<void>
  create(user: User): Promise<void>
  delete(user: User): Promise<void>
}