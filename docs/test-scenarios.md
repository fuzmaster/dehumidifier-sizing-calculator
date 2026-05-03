# Manual Test Scenarios

## Scenario 1

- Square footage: 4000
- Humidity severity: flooded
- Temperature: 65_75
- Drainage: gravity_drain
- Old rating mode: first_unit
- Budget: premium
- Expected result tier: out_of_bounds
- Expected confidence level: professional_review
- Expected notes: Show professional review guidance with no product cards, no affiliate CTA, and no matched-products language.

## Scenario 2

- Square footage: 1000
- Humidity severity: damp
- Temperature: 60_65
- Drainage: pump_needed
- Old rating mode: replace_old_70
- Budget: mid
- Expected result tier: large_45_50_pump
- Expected confidence level: medium
- Expected notes: Explain old 70-pint translation and why pump need pushes the result into a pump-capable tier.

## Scenario 3

- Square footage: 500
- Humidity severity: slightly_damp
- Temperature: 65_75
- Drainage: manual_bucket
- Old rating mode: first_unit
- Budget: budget
- Expected result tier: small_20_22
- Expected confidence level: high
- Expected notes: Start with 20-22 pint comparisons and mention bucket-emptying convenience tradeoffs.

## Scenario 4

- Square footage: 2500
- Humidity severity: very_wet
- Temperature: under_60
- Drainage: gravity_drain
- Old rating mode: first_unit
- Budget: premium
- Expected result tier: premium_basement
- Expected confidence level: medium
- Expected notes: Cold basement note, premium tier guidance, and a caution that portable sizing is only part of the decision.

## Scenario 5

- Square footage: 1200
- Humidity severity: damp
- Temperature: 65_75
- Drainage: gravity_drain
- Old rating mode: replace_old_70
- Budget: mid
- Expected result tier: large_45_50
- Expected confidence level: high
- Expected notes: Show normal product comparison, old 70-pint translation note, and affiliate disclosure near product cards.

## Scenario 6

- Square footage: 1900
- Humidity severity: damp
- Temperature: 65_75
- Drainage: gravity_drain
- Old rating mode: first_unit
- Budget: mid
- Expected result tier: large_45_50
- Expected confidence level: high
- Expected notes: Explain that size bumped the recommendation above a smaller mid-basement class.

## Scenario 7

- Square footage: 1200
- Humidity severity: damp
- Temperature: 65_75
- Drainage: gravity_drain
- Old rating mode: replace_old_50
- Budget: budget
- Expected result tier: medium_30_35
- Expected confidence level: high
- Expected notes: Old 50-pint translation note should point to the 30-35 pint modern DOE class.

## Scenario 8

- Square footage: 900
- Humidity severity: slightly_damp
- Temperature: under_60
- Drainage: gravity_drain
- Old rating mode: replace_old_30
- Budget: mid
- Expected result tier: small_20_22
- Expected confidence level: medium
- Expected notes: Small-tier result with extra cold-basement caution.

## Scenario 9

- Square footage: 2200
- Humidity severity: wet
- Temperature: 65_75
- Drainage: gravity_drain
- Old rating mode: replace_old_unknown
- Budget: mid
- Expected result tier: premium_basement
- Expected confidence level: medium
- Expected notes: Unknown old rating note and stronger size guidance.

## Scenario 10

- Square footage: 1500
- Humidity severity: wet
- Temperature: 60_65
- Drainage: pump_needed
- Old rating mode: first_unit
- Budget: budget
- Expected result tier: large_45_50_pump
- Expected confidence level: medium
- Expected notes: Pump note should be more prominent than budget preference.

## Scenario 11

- Square footage: 800
- Humidity severity: damp
- Temperature: above_75
- Drainage: manual_bucket
- Old rating mode: replace_old_30
- Budget: budget
- Expected result tier: small_20_22
- Expected confidence level: high
- Expected notes: Emphasize that the newer DOE number can look smaller than the old printed label.

## Scenario 12

- Square footage: 2600
- Humidity severity: wet
- Temperature: 60_65
- Drainage: gravity_drain
- Old rating mode: replace_old_70
- Budget: premium
- Expected result tier: premium_basement
- Expected confidence level: medium
- Expected notes: Large-footprint guidance should win even if the old rating already suggests a big class.

## Scenario 13

- Square footage: 2100
- Humidity severity: damp
- Temperature: under_60
- Drainage: manual_bucket
- Old rating mode: first_unit
- Budget: mid
- Expected result tier: large_45_50
- Expected confidence level: medium
- Expected notes: Result should mention cool-basement matching and explain why capacity moved up.

## Scenario 14

- Square footage: 1100
- Humidity severity: very_wet
- Temperature: 65_75
- Drainage: gravity_drain
- Old rating mode: replace_old_50
- Budget: mid
- Expected result tier: large_45_50
- Expected confidence level: medium
- Expected notes: Very wet conditions should override the smaller old 50-pint conversion tier.

## Scenario 15

- Square footage: 2900
- Humidity severity: damp
- Temperature: 65_75
- Drainage: pump_needed
- Old rating mode: first_unit
- Budget: premium
- Expected result tier: premium_basement
- Expected confidence level: medium
- Expected notes: Pump need plus large footprint should keep the user in a more cautious comparison tier.
