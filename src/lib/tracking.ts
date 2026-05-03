import { trackAnalyticsEvent } from './analyticsTracker';
import type { AnalyticsEvent, RecommendationAnalyticsPayload, RecommendationTier } from '../types/calculator';

export function trackEvent(event: AnalyticsEvent): void {
  trackAnalyticsEvent(event);
}

export function trackCalculatorStarted(): void {
  trackEvent({ name: 'calculator_started' });
}

export function trackCalculatorCompleted(payload: RecommendationAnalyticsPayload): void {
  trackEvent({
    name: 'calculator_completed',
    payload: { ...payload },
  });
}

export function trackResultCapacityTier(payload: {
  resultCapacityTier: RecommendationTier;
  confidenceLevel: RecommendationAnalyticsPayload['confidenceLevel'];
  fallbackStepsUsed?: string;
}): void {
  trackEvent({
    name: 'result_capacity_tier',
    payload,
  });
}

export function trackAffiliateCardClicked(payload: {
  productId: string;
  retailer: string;
  resultCapacityTier: string;
  confidenceLevel: RecommendationAnalyticsPayload['confidenceLevel'];
  productPosition: number;
}): void {
  trackEvent({
    name: 'affiliate_card_clicked',
    payload,
  });
}

export function trackAffiliateCtaClicked(payload: {
  productId: string;
  retailer: string;
  resultCapacityTier: string;
  confidenceLevel: RecommendationAnalyticsPayload['confidenceLevel'];
  productPosition: number;
}): void {
  trackEvent({
    name: 'affiliate_cta_clicked',
    payload,
  });
}
