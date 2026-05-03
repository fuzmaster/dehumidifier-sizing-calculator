import { trackEvent } from './analyticsTracker';
import type { RecommendationAnalyticsPayload, RecommendationTier } from '../types/calculator';

export function trackCalculatorStarted(): void {
  trackEvent('calculator_started');
}

export function trackCalculatorCompleted(payload: RecommendationAnalyticsPayload): void {
  trackEvent('calculator_completed', { ...payload });
}

export function trackResultCapacityTier(payload: {
  resultCapacityTier: RecommendationTier;
  confidenceLevel: RecommendationAnalyticsPayload['confidenceLevel'];
  fallbackStepsUsed?: string;
}): void {
  trackEvent('result_capacity_tier', { ...payload });
}

export function trackAffiliateCardClicked(payload: {
  productId: string;
  productName: string;
  retailer: string;
  capacityTier: string;
  resultCapacityTier: string;
  confidenceLevel: RecommendationAnalyticsPayload['confidenceLevel'];
  fallbackStepsUsed?: string;
  productPosition: number;
  productRankLabel: string;
  verificationStatus: 'exact_model' | 'retailer_search' | 'category_search';
}): void {
  trackEvent('affiliate_card_clicked', { ...payload });
}

export function trackAffiliateCtaClicked(payload: {
  productId: string;
  productName: string;
  retailer: string;
  capacityTier: string;
  resultCapacityTier: string;
  confidenceLevel: RecommendationAnalyticsPayload['confidenceLevel'];
  fallbackStepsUsed?: string;
  productPosition: number;
  productRankLabel: string;
  verificationStatus: 'exact_model' | 'retailer_search' | 'category_search';
}): void {
  trackEvent('affiliate_cta_clicked', { ...payload });
}
