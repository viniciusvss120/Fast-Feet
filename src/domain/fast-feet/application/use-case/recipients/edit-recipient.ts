import { Recipient } from "@/domain/fast-feet/entities/recipient";
import { RecipientRepository } from "../../repository/recipient-repository";
import { UniqueEntityId } from "@/core/entities/unique-entiti-id";

interface RecipientsRequest {
  id: UniqueEntityId
  name: string
  rua: string
  numero: number
  bairro: string
  cidade: string
  estado: string
}

type RecipientsResponse = {
  recipient: Recipient
}
export class EditRecipientsUseCase {
  constructor(private recipienRepository: RecipientRepository) {}

  async execute({
    id,
    name,
    rua,
    numero,
    bairro,
    cidade,
    estado,
  }: RecipientsRequest): Promise<RecipientsResponse>{
    const recipient = await this.recipienRepository.findById(id.toString())

    if (!recipient) {
      throw new Error('Recipient not found')
    }

    recipient.rua = rua
    recipient.numero = numero
    recipient.bairro = bairro

    await this.recipienRepository.save(recipient)

    return {
      recipient
    }
  }
}