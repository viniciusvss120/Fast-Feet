import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryPackage } from '../../../../../../test/repository/in-memory-packege'
import { UniqueEntityId } from '@/core/entities/unique-entiti-id'
import { Package } from '@/domain/fast-feet/entities/package'
import { StatusValueObject } from '@/domain/fast-feet/entities/value-object/status'
import { Recipient } from '@/domain/fast-feet/entities/recipient'
import { User } from '@/domain/fast-feet/entities/user'
import { FetchNearbyPackageUseCase } from './fetch-nearby-package'
// import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinats'

let inMemoryPackages: InMemoryPackage
let sut: FetchNearbyPackageUseCase
describe('Fetch Nearby package use case', async () => {
  beforeEach(() => {
    inMemoryPackages = new InMemoryPackage()

    sut = new FetchNearbyPackageUseCase(inMemoryPackages)
  })
  test('should be abble to fetch nearby package', async () => {
    const user = await User.create({
      userId: new UniqueEntityId('user-1'),
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'entregador',
      createdAt: new Date()
    })

    const recipient1 = await Recipient.create({
      recipientId: new UniqueEntityId('recipient-1'),
      name: 'Vinicius Silva',
      rua: 'Ali Perto',
      packageId: [],
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      latitude: -10.4195882,
      longitude: -62.4741694,
      createdAt: new Date()
    })

    const recipient2 = await Recipient.create({
      recipientId: new UniqueEntityId('recipient-2'),
      name: 'Vinicius Silva',
      rua: 'Br-364 km 15',
      packageId: [],
      numero: 2544,
      bairro: 'Jardim Paz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      latitude: -10.4878625,
      longitude: -62.4617677,
      createdAt: new Date()
    })

    const _package1 = await Package.create({
      id: new UniqueEntityId('package-1'),
      name: 'Computador Acer Nitro 5 515-65',
      userId: user.userId.toString(),
      recipient: recipient1,
      status: new StatusValueObject(),
      createdAt: new Date()
    })

    const _package2 = await Package.create({
      id: new UniqueEntityId('package-2'),
      name: 'Mouse sem fio',
      userId: user.userId.toString(),
      recipient: recipient2,
      status: new StatusValueObject(),
      createdAt: new Date()
    })

    await inMemoryPackages.create(_package1)
    await inMemoryPackages.create(_package2)
    // const distance = getDistanceBetweenCoordinates(
    //   {latitude: -10.4428484, longitude: -62.4842607},
    //   {latitude: recipient.latitude, longitude: recipient.longitude}

    // )
    // 10.4616581,-62.4538744
    // -10.442930, -62.48386
    const result = await sut.execute({
      userLatitude: -10.4428484,
      userLongitude: -62.4842607
    })

    expect(result._package).toHaveLength(1)
  })
})