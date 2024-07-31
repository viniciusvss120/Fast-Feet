import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entiti-id";

interface NotificationsProps {
  recipientId: UniqueEntityId
  title: string
  content: string
  readAt?: Date
  createdAt: Date
}

export class Notification extends Entity<NotificationsProps> {
  get recipentId () {
    return this.props.recipientId
  }

  get title () {
    return this.props.title
  }

  get content () {
    return this.props.content
  }

  get createdAt () {
    return this.props.createdAt
  }

  get readAt () {
    return this.props.readAt
  }

  static create (props: NotificationsProps) {
    const notification = new Notification(props)

    return notification
  }
}