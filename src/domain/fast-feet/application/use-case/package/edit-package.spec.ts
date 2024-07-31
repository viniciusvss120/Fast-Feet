import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPackage } from '../../../../../../test/repository/in-memory-packege'
import { Package } from '@/domain/fast-feet/entities/package'
import { UniqueEntityId } from '@/core/entities/unique-entiti-id'
import { EditPackageUseCase } from './edit-package'
import { Status, StatusValueObject } from '@/domain/fast-feet/entities/value-object/status'
import { User } from '@/domain/fast-feet/entities/user'
import { Recipient } from '@/domain/fast-feet/entities/recipient'

let inMemoryEdit: InMemoryPackage
let sut: EditPackageUseCase
describe('Edit package', async () => {
  beforeEach(() => {
    inMemoryEdit = new InMemoryPackage()

    sut = new EditPackageUseCase(inMemoryEdit)
  })
  test('should be abble to edit package', async () => {
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
      packageId: new UniqueEntityId('package-1'),
      name: 'Vinicius Silva',
      userId: user.userId.toString(),
      recipient,
      status: new StatusValueObject(),
      createdAt: new Date(),
    })

    await inMemoryEdit.create(_package)

    await sut.execute({
      id: new UniqueEntityId('package-1'),
      name: 'Vinicius Silva',
      status: new StatusValueObject(Status.aguardando)
    })
    expect(inMemoryEdit.items[0]).toMatchObject({
      status: new StatusValueObject(Status.aguardando)
    })
  })
})