/**
 * Provider-agnostic integration contracts. Concrete adapters (Stripe, Resend,
 * Twilio, etc.) implement these interfaces so application code never depends on
 * a vendor SDK directly. Stub adapters are used until real keys are wired in.
 */

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/* ----------------------------- Payments ----------------------------- */

export type CheckoutLineItem = {
  name: string;
  description?: string;
  amount: number; // unit amount in cents
  quantity: number;
};

export type CreateCheckoutInput = {
  lineItems: CheckoutLineItem[];
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
};

export interface PaymentProvider {
  readonly name: string;
  createCheckoutSession(
    input: CreateCheckoutInput,
  ): Promise<Result<{ id: string; url: string }>>;
  refund(paymentId: string, amount?: number): Promise<Result<{ id: string }>>;
}

/* ------------------------------ Email -------------------------------- */

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
};

export interface EmailProvider {
  readonly name: string;
  sendEmail(input: SendEmailInput): Promise<Result<{ id: string }>>;
}

/* ------------------------------- SMS --------------------------------- */

export type SendSmsInput = {
  to: string;
  body: string;
};

export interface SmsProvider {
  readonly name: string;
  sendSms(input: SendSmsInput): Promise<Result<{ id: string }>>;
}

/* ------------------------- Delivery analytics ------------------------ */

export type DeliveryPlatform = "UBER_EATS" | "DOORDASH";

export type DeliveryStatsRange = { start: Date; end: Date };

export type DeliveryStats = {
  platform: DeliveryPlatform;
  orders: number;
  grossSales: number;
  fees: number;
  netSales: number;
  refunds: number;
  cancelled: number;
  averageTicket: number;
};

export interface DeliveryAnalyticsProvider {
  readonly name: string;
  fetchStats(
    platform: DeliveryPlatform,
    range: DeliveryStatsRange,
  ): Promise<Result<DeliveryStats>>;
}
