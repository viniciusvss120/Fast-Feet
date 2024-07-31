import { EventHandler } from "@/core/events/event-handler";
import { PackageRepository } from "@/domain/fast-feet/application/repository/package-repository";
import { SendNotifications } from "../user-case/send-notification";
import { CreatePackageEvent } from "@/domain/events/create-package";
import { DomainEvents } from "@/core/events/domain-events";

export class OnChangeStatusPackage implements EventHandler {
  constructor(
    private packageRepository: PackageRepository,
    private sendNotifications: SendNotifications
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewStatusPackageNotification.bind(this),
      CreatePackageEvent.name
    )

  }

  private async sendNewStatusPackageNotification({ packageEntity }: CreatePackageEvent) {
    const _package = await this.packageRepository.findById(packageEntity.packageId.toString())

    if (_package) {
      await this.sendNotifications.execute({
        recipientId: _package.recipient.recipientId.toString(),
        title: `Mensagem de alteração do status ${_package.status.toValue()} para retirado`,
        content: "O status da sua encomenda foi alterado para retirado."
      })
    }
  }
}