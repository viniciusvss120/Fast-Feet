import { Recipient } from "@/domain/fast-feet/entities/recipient";
import { RecipientRepository } from "../../repository/recipient-repository";
import { UniqueEntityId } from "@/core/entities/unique-entiti-id";

interface RecipientsRequest {
  id: UniqueEntityId
  name: string
  packageId: string[]
  rua: string
  numero: number
  bairro: string
  cidade: string
  estado: string
  latitude: number
  longitude: number
}

type RecipientsResponse = {
  recipient: Recipient
}
export class CreateRecipientsUseCase {
  constructor(private recipienRepository: RecipientRepository) { }

  async execute({
    id,
    name,
    packageId,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    latitude,
    longitude
  }: RecipientsRequest): Promise<RecipientsResponse> {
    const recipient = await Recipient.create({
      recipientId: id,
      name,
      packageId,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await this.recipienRepository.create(recipient)

    return {
      recipient
    }
  }
}