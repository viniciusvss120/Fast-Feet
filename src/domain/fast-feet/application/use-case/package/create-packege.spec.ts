import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPackage } from '../../../../../../test/repository/in-memory-packege'
import { UniqueEntityId } from '@/core/entities/unique-entiti-id'
import { CreatePackageUseCase } from './create-package'
import { Status, StatusValueObject } from '@/domain/fast-feet/entities/value-object/status'
import { User } from '@/domain/fast-feet/entities/user'
import { Recipient } from '@/domain/fast-feet/entities/recipient'

let inMemoryPackage: InMemoryPackage
let sut: CreatePackageUseCase
describe('Create recipient', async () => {
  beforeEach(() => {
    inMemoryPackage = new InMemoryPackage()

    sut = new CreatePackageUseCase(inMemoryPackage)
  })
  test('should be abble to create recipient', async () => {
    const user = await User.create({
      userId: new UniqueEntityId('user-1'),
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'entregador',
      createdAt: new Date()
    })

    const recipient = await Recipient.create({
      recipientId: new UniqueEntityId('recipient-1'),
      name: 'Vinicius Silva',
      rua: 'Ali Perto',
      packageId: [],
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      latitude: 0,
      longitude: 0,
      createdAt: new Date()
    })
    await sut.execute({
      packageId: new UniqueEntityId('package-1'),
      name: 'Computador Acer Nitro 5 515-65',
      userId: user.userId.toString(),
      recipient: recipient,
      status: new StatusValueObject(),
      createdAt: new Date()
    })
    expect(inMemoryPackage.items).toHaveLength(1)
  })
})