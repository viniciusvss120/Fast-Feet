import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'
import { EditUserUseCase } from './edit-user'
import { User } from '@/domain/fast-feet/entities/user'
import { UniqueEntityId } from '@/core/entities/unique-entiti-id'
import { DeleteUserUseCase } from './delete-user'

let inMemoryUser: InMemoryUser
let sut: DeleteUserUseCase
describe('Delete user', async () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new DeleteUserUseCase(inMemoryUser)
  })
  test('should be abble to delete user', async () => {
    const user = await User.create({
      userId: new UniqueEntityId('user-1'),
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'admin',
      createdAt: new Date()
    })

    await inMemoryUser.create(user)

    await sut.execute({
      userId: 'user-1',
    })

    expect(inMemoryUser.items).toHaveLength(0)
  })
})