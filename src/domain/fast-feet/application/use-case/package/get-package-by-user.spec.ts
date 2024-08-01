import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPackage } from '../../../../../../test/repository/in-memory-packege'
import { UniqueEntityId } from '@/core/entities/unique-entiti-id'
import { GetPackageByIdUseCase } from './get-package-by-id'
import { Package } from '@/domain/fast-feet/entities/package'
import { StatusValueObject } from '@/domain/fast-feet/entities/value-object/status'
import { Recipient } from '@/domain/fast-feet/entities/recipient'
import { User } from '@/domain/fast-feet/entities/user'
import { GetPackageByUserUseCase } from './get-package-by-user'

let inMemoryPackages: InMemoryPackage
let sut: GetPackageByUserUseCase
describe('Get package', async () => {
  beforeEach(() => {
    inMemoryPackages = new InMemoryPackage()

    sut = new GetPackageByUserUseCase(inMemoryPackages)
  })
  test('should be abble to get package', async () => {
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

    const _package1 = await Package.create({
      id: new UniqueEntityId('package-1'),
      name: 'Computador Acer Nitro 5 515-65',
      userId: user.userId.toString(),
      recipient: recipient,
      status: new StatusValueObject(),
      createdAt: new Date()
    })

    inMemoryPackages.create(_package1)

    const _package2 = await Package.create({
      id: new UniqueEntityId('package-2'),
      name: 'Mouse sem fio',
      userId: user.userId.toString(),
      recipient: recipient,
      status: new StatusValueObject(),
      createdAt: new Date()
    })

    inMemoryPackages.create(_package2)

    const result = await sut.execute({
      userId: user.userId.toString()
    })

    expect(result._package).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: new UniqueEntityId('package-1')
        }),
        expect.objectContaining({
          id: new UniqueEntityId('package-2')
        })
      ])
    )
  })
})