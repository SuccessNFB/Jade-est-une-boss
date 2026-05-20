import { stripe } from './client'

const COUPON_ID = 'icekey_bienvenue_5pct'

/* Creates the coupon once in Stripe, then retrieves it on subsequent calls. */
export async function getWelcomeCouponId(): Promise<string> {
  try {
    await stripe.coupons.retrieve(COUPON_ID)
    return COUPON_ID
  } catch {
    await stripe.coupons.create({
      id:          COUPON_ID,
      percent_off: 5,
      duration:    'once',
      name:        'Bienvenue ICEKEY — Première commande -5%',
    })
    return COUPON_ID
  }
}
