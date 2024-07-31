import { Recipient } from "@/domain/fast-feet/entities/recipient";
import { RecipientRepository } from "../../repository/recipient-repository";
import { UniqueEntityId } from "@/core/entities/unique-entiti-id";

interface RecipientsRequest {
  recipientId: UniqueEntityId
}

export class DeleteRecipientsUseCase {
  constructor(private recipienRepository: RecipientRepository) {}

  async execute({
    recipientId,  
  
  }: RecipientsRequest){
    const recipient = await this.recipienRepository.findById(recipientId.toString())

    if (!recipient) {
      throw new Error('Recipient not found')
    }

    await this.recipienRepository.delete(recipient)
  }
}