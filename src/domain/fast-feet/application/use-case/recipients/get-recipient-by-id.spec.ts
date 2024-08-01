import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryRecipients } from '../../../../../../test/repository/in-memory-recipients'
import { UniqueEntityId } from '@/core/entities/unique-entiti-id'
import { GetRecipientByIdUseCase } from './get-recipient-by-id'
import { Recipient } from '@/domain/fast-feet/entities/recipient'
import { aW } from 'vitest/dist/reporters-BECoY4-b'

let inMemoryRecipients: InMemoryRecipients
let sut: GetRecipientByIdUseCase
describe('Get recipient', async () => {
  beforeEach(() => {
    inMemoryRecipients = new InMemoryRecipients()

    sut = new GetRecipientByIdUseCase(inMemoryRecipients)
  })
  test('should be abble to get recipient', async () => {
    const recipient = await Recipient.create({
      recipientId: new UniqueEntityId('recipient-1'),
      name: 'Vinicius Silva',
      rua: 'Ali Perto',
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      id: [],
      latitude: 0,
      longitude: 0,
      createdAt: new Date()
    })

    inMemoryRecipients.create(recipient)

    const resut = await sut.execute({
      recipientId: recipient.recipientId.toString()
    })

    expect(resut.recipient).toEqual(
      expect.objectContaining({
        recipientId: new UniqueEntityId('recipient-1')
      })
    )
  })
})