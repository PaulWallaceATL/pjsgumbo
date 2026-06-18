import type {
  DeliveryAnalyticsProvider,
  EmailProvider,
  PaymentProvider,
  SmsProvider,
} from "./types";
import {
  StubDeliveryAnalyticsProvider,
  StubEmailProvider,
  StubPaymentProvider,
  StubSmsProvider,
} from "./stubs";

/**
 * Integration registry. Selects the real adapter when credentials are present,
 * otherwise falls back to a stub. Real adapters (Stripe/Resend/Twilio) will be
 * added in their respective feature phases without changing call sites.
 */

export function getPaymentProvider(): PaymentProvider {
  // TODO: return StripePaymentProvider when STRIPE_SECRET_KEY is set.
  return new StubPaymentProvider();
}

export function getEmailProvider(): EmailProvider {
  // TODO: return ResendEmailProvider when RESEND_API_KEY is set.
  return new StubEmailProvider();
}

export function getSmsProvider(): SmsProvider {
  // TODO: return real SMS adapter when credentials are set.
  return new StubSmsProvider();
}

export function getDeliveryAnalyticsProvider(): DeliveryAnalyticsProvider {
  return new StubDeliveryAnalyticsProvider();
}

export * from "./types";
