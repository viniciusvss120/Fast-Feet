import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryRecipients } from '../../../../../../test/repository/in-memory-recipients'
import { Recipient } from '@/domain/fast-feet/entities/recipient'
import { UniqueEntityId } from '@/core/entities/unique-entiti-id'
import { DeleteRecipientsUseCase } from './delete-recipient'

let inMemoryDelete: InMemoryRecipients
let sut: DeleteRecipientsUseCase
describe('Delete recipient', async () => {
  beforeEach(() => {
    inMemoryDelete = new InMemoryRecipients()

    sut = new DeleteRecipientsUseCase(inMemoryDelete)
  })
  test('should be abble to delete recipient', async () => {
    const recipient = await Recipient.create({
      recipientId: new UniqueEntityId('recipient-1'),
      name: 'Vinicius Silva',
      rua: 'Ali Perto',
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      createdAt: new Date()
    })

    await inMemoryDelete.create(recipient)

    await sut.execute({
      recipientId: new UniqueEntityId('recipient-1'),

    })

    expect(inMemoryDelete.items).toHaveLength(0)
  })
})