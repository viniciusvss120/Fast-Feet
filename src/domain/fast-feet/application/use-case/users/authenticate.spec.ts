import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUser } from '../../../../../../test/repository/in-memory-user'
import { UniqueEntityId } from '@/core/entities/unique-entiti-id'
import { User } from '@/domain/fast-feet/entities/user'
import { GetUserByIdUseCase } from './get-user-by-id'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcrypt'

let inMemoryUser: InMemoryUser
let sut: AuthenticateUseCase
describe('Get user', async () => {
  beforeEach(() => {
    inMemoryUser = new InMemoryUser()

    sut = new AuthenticateUseCase(inMemoryUser)
  })
  test('should be abble to get user by id', async () => {
    const user = await User.create({
      userId: new UniqueEntityId('user-1'),
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: await hash('123456', 8),
      role: 'admin',
      createdAt: new Date()
    })

    inMemoryUser.create(user)

    const result = await sut.execute({
      cpf: '000.000.111-85',
      password: '123456'
    })

    expect(result.token).toEqual({
      token: expect.any(String)
    })
  })
})