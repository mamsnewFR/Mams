import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const PLANS = {
  free: {
    name: 'Gratuit',
    price: 0,
    features: [
      '5 résumés par mois',
      '20 flashcards par mois',
      '3 quiz par mois',
      'Chat limité (10 messages/jour)',
    ],
    limits: {
      summaries: 5,
      flashcards: 20,
      quizzes: 3,
      chatMessages: 10,
    },
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
    features: [
      'Résumés illimités',
      'Flashcards illimitées',
      'Quiz illimités',
      'Chat illimité',
      'Export PDF',
      'Support prioritaire',
    ],
    limits: {
      summaries: Infinity,
      flashcards: Infinity,
      quizzes: Infinity,
      chatMessages: Infinity,
    },
  },
}
