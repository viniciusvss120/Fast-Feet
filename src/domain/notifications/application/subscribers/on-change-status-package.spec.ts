import { describe, expect, it, MockInstance, vi } from "vitest";
import { InMemoryPackage } from "../../../../../test/repository/in-memory-packege";
import { OnChangeStatusPackage } from "./on-change-status-package";
import { SendNotifications } from "../user-case/send-notification";
import { InMemoryNotifications } from "../../../../../test/repository/in-memory-notifications";
import { beforeEach } from "vitest";
import { Package } from "@/domain/fast-feet/entities/package";
import { UniqueEntityId } from "@/core/entities/unique-entiti-id";
import { StatusValueObject } from "@/domain/fast-feet/entities/value-object/status";
import { Recipient } from "@/domain/fast-feet/entities/recipient";
import { User } from "@/domain/fast-feet/entities/user";
import { waitFor } from "../../../../../utils/wait-for";
import { Notification } from "../../entities/notification";

let inMemoryPackage: InMemoryPackage
let inMemoryNotification: InMemoryNotifications
let sendNotifications: SendNotifications

let sendNotificationExecuteSpy: MockInstance
describe('On change status package', () => {
  beforeEach(() => {
    inMemoryPackage = new InMemoryPackage()
    inMemoryNotification = new InMemoryNotifications()
    sendNotifications = new SendNotifications(inMemoryNotification)

    sendNotificationExecuteSpy = vi.spyOn(sendNotifications, 'execute')

    new OnChangeStatusPackage(inMemoryPackage, sendNotifications)
  })
  it.only('should be abble to change status to package', async () => {

    const user = User.create({
      userId: new UniqueEntityId('user-1'),
      name: 'Vinicius Silva',
      cpf: '000.000.111-85',
      password: '123456',
      role: 'entregador',
      createdAt: new Date()
    })

    const recipient = Recipient.create({
      recipientId: new UniqueEntityId('recipient-1'),
      name: 'Vinicius Silva',
      rua: 'Ali Perto',
      packageId: [],
      numero: 2544,
      bairro: 'Jardim luz',
      cidade: 'Jaru',
      estado: 'Rondônia',
      latitude: 0,
      longitude: 0,
      createdAt: new Date()
    })

    try {
      const _package = await Package.create({
        id: new UniqueEntityId('package-1'),
        name: 'Vinicius Silva',
        userId: user.userId.toString(),
        recipient,
        status: new StatusValueObject(),
        createdAt: new Date(),
      })
      console.log(_package)
      await inMemoryPackage.create(_package)

    } catch (error) {
      console.log('Deu ruim', error)
    }

    const notification = await sendNotifications.execute({
      recipientId: 'user-1',
      title: 'Notificação',
      content: 'Pedido criado com sucesso :)'
    })

    console.log(notification.notification)
    expect(sendNotifications).toBeDefined()


    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})