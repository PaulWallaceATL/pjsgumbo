import type {
  CreateCheckoutInput,
  DeliveryAnalyticsProvider,
  DeliveryPlatform,
  EmailProvider,
  PaymentProvider,
  Result,
  SendEmailInput,
  SendSmsInput,
  SmsProvider,
} from "./types";

/**
 * No-op stub adapters used in development before real provider keys exist.
 * They log intent and return deterministic fake successes so flows are
 * testable end-to-end without external calls.
 */

function fakeId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export class StubPaymentProvider implements PaymentProvider {
  readonly name = "stub-payments";

  async createCheckoutSession(
    input: CreateCheckoutInput,
  ): Promise<Result<{ id: string; url: string }>> {
    const id = fakeId("cs");
    console.info("[stub-payments] createCheckoutSession", {
      items: input.lineItems.length,
    });
    return { ok: true, data: { id, url: `${input.successUrl}?session_id=${id}` } };
  }

  async refund(paymentId: string): Promise<Result<{ id: string }>> {
    console.info("[stub-payments] refund", { paymentId });
    return { ok: true, data: { id: fakeId("re") } };
  }
}

export class StubEmailProvider implements EmailProvider {
  readonly name = "stub-email";

  async sendEmail(input: SendEmailInput): Promise<Result<{ id: string }>> {
    console.info("[stub-email] sendEmail", {
      to: input.to,
      subject: input.subject,
    });
    return { ok: true, data: { id: fakeId("email") } };
  }
}

export class StubSmsProvider implements SmsProvider {
  readonly name = "stub-sms";

  async sendSms(input: SendSmsInput): Promise<Result<{ id: string }>> {
    console.info("[stub-sms] sendSms", { to: input.to });
    return { ok: true, data: { id: fakeId("sms") } };
  }
}

export class StubDeliveryAnalyticsProvider
  implements DeliveryAnalyticsProvider
{
  readonly name = "stub-delivery";

  async fetchStats(platform: DeliveryPlatform) {
    const orders = 120 + Math.floor(Math.random() * 60);
    const averageTicket = 24.5;
    const grossSales = orders * averageTicket;
    const fees = grossSales * 0.3;
    return {
      ok: true as const,
      data: {
        platform,
        orders,
        grossSales,
        fees,
        netSales: grossSales - fees,
        refunds: Math.floor(orders * 0.02),
        cancelled: Math.floor(orders * 0.03),
        averageTicket,
      },
    };
  }
}
