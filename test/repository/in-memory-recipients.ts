import { RecipientRepository } from "@/domain/fast-feet/application/repository/recipient-repository";
import { Recipient } from "@/domain/fast-feet/entities/recipient";

export class InMemoryRecipients implements RecipientRepository {

  public items: Recipient[] = []

  async findById(id: string): Promise<Recipient | null> {
    const result = this.items.find((recipient) => recipient.recipientId.toString() === id)

    if (!result) {
      return null
    }

    return result
  }

  async save(recipient: Recipient) {
    const result = await this.items.findIndex(index => index.recipientId === recipient.recipientId)

    this.items[result] = recipient
  }

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }

  async delete(recipient: Recipient) {
    const result = await this.items.findIndex(index => index.recipientId === recipient.recipientId)

    this.items.splice(result, 1)
  }

}