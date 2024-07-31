import { Recipient } from "@/domain/fast-feet/entities/recipient";

export interface RecipientRepository {
  findById(id: string): Promise<Recipient | null>
  save(recipient: Recipient): Promise<void>
  create(recipient: Recipient): Promise<void>
  delete(recipient: Recipient): Promise<void>
}