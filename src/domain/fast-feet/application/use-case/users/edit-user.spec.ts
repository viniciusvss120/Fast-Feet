import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'
import { EditUserUseCase } from './edit-user'
import { User } from '@/domain/fast-feet/entities/user'
import { UniqueEntityId } from '@/core/entities/unique-entiti-id'

let inMemoryUser: InMemoryUser
let sut: EditUserUseCase
describe('Edit user', async () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new EditUserUseCase(inMemoryUser)
  })
  test('should be abble to edit user', async () => {
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
      userId: user.userId.toString(),
      name: user.name,
      cpf: user.cpf,
      password: user.password,
      role: 'entregador'
    })

    expect(inMemoryUser.items[0]).toMatchObject({
      role: 'entregador'
    })
  })
})