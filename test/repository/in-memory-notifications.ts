import { NotificationsRepository } from "@/domain/notifications/application/repository/notification-repository";
import { Notification } from "@/domain/notifications/entities/notification";

export class InMemoryNotifications implements NotificationsRepository {
  public items: Notification[] = []
  
  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

}