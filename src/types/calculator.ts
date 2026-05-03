export type HumiditySeverity =
  | 'slightly_damp'
  | 'damp'
  | 'wet'
  | 'very_wet'
  | 'flooded';

export type BasementTemperature = 'under_60' | '60_65' | '65_75' | 'above_75';

export type DrainagePreference = 'manual_bucket' | 'gravity_drain' | 'pump_needed';

export type ConfusionMode =
  | 'first_unit'
  | 'replace_old_30'
  | 'replace_old_50'
  | 'replace_old_70'
  | 'replace_old_unknown';

export type BudgetRange = 'budget' | 'mid' | 'premium';

export type CapacityTier =
  | 'small_20_22'
  | 'medium_30_35'
  | 'large_45_50'
  | 'large_45_50_pump'
  | 'premium_basement';

export type RecommendationTier = CapacityTier | 'out_of_bounds';

export type LowTemperatureSuitability = 'standard' | 'cool' | 'cold';

export type VerificationStatus = 'exact_model' | 'retailer_search' | 'category_search';

export interface CalculatorInputs {
  squareFootage: number;
  humiditySeverity: HumiditySeverity;
  basementTemperature: BasementTemperature;
  drainagePreference: DrainagePreference;
  confusionMode: ConfusionMode;
  budgetRange: BudgetRange;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  modelNumber?: string;
  capacityTier: CapacityTier;
  capacityLabel: string;
  priceTier: BudgetRange;
  hasPump: boolean;
  supportsGravityDrain: boolean;
  lowTemperatureSuitability: LowTemperatureSuitability;
  smartFeatures: string[];
  bestFor: string;
  knownDownside: string;
  lastReviewed: string;
  verificationStatus: VerificationStatus;
  imagePath: string;
  retailer: string;
  affiliateUrl: string;
  affiliatePriority: number;
  badges: string[];
}

export type ProductRecord = Product;

export interface AffiliateMessage {
  headline: string;
  subheadline: string;
  ctaLabel: string;
}

export interface RecommendationResult {
  status: 'ok' | 'out_of_bounds';
  capacityTier: RecommendationTier;
  capacityLabel: string;
  plainEnglishExplanation: string;
  reasoningSteps: string[];
  drainageRecommendation: string;
  temperatureNote: string;
  oldRatingTranslationNote: string;
  safetyNote: string;
  confidenceLevel: 'high' | 'medium' | 'professional_review';
  confidenceLabel: string;
  affiliateMessage: AffiliateMessage;
  recommendedBudget: BudgetRange;
  fallbackTier?: CapacityTier;
}

export interface FilterProductsOptions {
  capacityTier: CapacityTier;
  drainagePreference: DrainagePreference;
  basementTemperature: BasementTemperature;
  budgetRange: BudgetRange;
}

export interface FilterProductsResult {
  products: ProductRecord[];
  fallbackStepsUsed: string[];
}

export interface AnalyticsEvent {
  name:
    | 'calculator_started'
    | 'calculator_completed'
    | 'result_capacity_tier'
    | 'affiliate_card_clicked'
    | 'affiliate_cta_clicked';
  payload?: Record<string, string | number | boolean | undefined>;
}

export interface RecommendationAnalyticsPayload {
  squareFootage: number;
  humiditySeverity: HumiditySeverity;
  basementTemperature: BasementTemperature;
  drainagePreference: DrainagePreference;
  ratingConfusionMode: ConfusionMode;
  budgetRange: BudgetRange;
  resultCapacityTier: RecommendationTier;
  confidenceLevel: RecommendationResult['confidenceLevel'];
  fallbackStepsUsed?: string;
}
