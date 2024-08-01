import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPackage } from '../../../../../../test/repository/in-memory-packege'
import { Package } from '@/domain/fast-feet/entities/package'
import { UniqueEntityId } from '@/core/entities/unique-entiti-id'
import { DeletePackageUseCase } from './delete-package'
import { StatusValueObject } from '@/domain/fast-feet/entities/value-object/status'
import { Recipient } from '@/domain/fast-feet/entities/recipient'
import { User } from '@/domain/fast-feet/entities/user'

let inMemoryDelete: InMemoryPackage
let sut: DeletePackageUseCase
describe('Delete package', async () => {
  beforeEach(() => {
    inMemoryDelete = new InMemoryPackage()

    sut = new DeletePackageUseCase(inMemoryDelete)
  })
  test('should be abble to delete package', async () => {
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
      packageId: [],
      rua: 'Ali Perto',
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      latitude: -10.4195882,
      longitude: -62.4741694,
      createdAt: new Date()
    })
    const _package = await Package.create({
      id: new UniqueEntityId('package-1'),
      name: 'Computador Acer Nitro 5 515-65',
      userId: user.userId.toString(),
      recipient,
      status: new StatusValueObject(),
      createdAt: new Date()
    })

    await inMemoryDelete.create(_package)

    await sut.execute({
      id: new UniqueEntityId('package-1'),

    })

    expect(inMemoryDelete.items).toHaveLength(0)
  })
})