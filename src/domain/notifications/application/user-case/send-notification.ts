import { UniqueEntityId } from "@/core/entities/unique-entiti-id"
import { Notification } from "../../entities/notification"
import { NotificationsRepository } from "../repository/notification-repository"

export interface SendNotificationsRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationsResponse = {
  notification: Notification
}
export class SendNotifications {
  constructor( private notificationRepository: NotificationsRepository) {}
  async execute ({
    recipientId,
    title,
    content
  }: SendNotificationsRequest): Promise<SendNotificationsResponse> {
    const notification = await Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
      createdAt: new Date()
    })

    await this.notificationRepository.create(notification)

    return {
      notification
    }
  }
}