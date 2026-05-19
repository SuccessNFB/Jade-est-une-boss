'use client'

import { motion } from 'framer-motion'
import { Diamond, Zap, Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const VALUES = [
  {
    icon:  Diamond,
    color: 'text-ice-500',
    bg:    'bg-ice-50',
    title: 'L\'éclat supérieur',
    desc:  'La moissanite a un indice de réfraction plus élevé que le diamant. Résultat : un feu et une brillance encore plus intenses.',
  },
  {
    icon:  Zap,
    color: 'text-gold-400',
    bg:    'bg-gold-300/10',
    title: 'La durabilité',
    desc:  'Dureté 9.25 sur l\'échelle de Mohs — juste sous le diamant. Un bijou ICEKEY dure une vie entière sans perdre son éclat.',
  },
  {
    icon:  Heart,
    color: 'text-rose-400',
    bg:    'bg-rose-50',
    title: 'Le prix honnête',
    desc:  'À beauté égale, la moissanite coûte 10 à 20× moins qu\'un diamant. Vous payez le bijou, pas le marketing.',
  },
]

export function BrandStory() {
  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main image placeholder */}
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-ice-50 via-white to-gold-300/10 border border-ice-100 overflow-hidden relative">
              {/* Decorative diamonds */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-72 h-72"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <Diamond
                      key={i}
                      fill="currentColor"
                      className="absolute text-ice-200"
                      style={{
                        width:     8 + (i % 4) * 4,
                        height:    8 + (i % 4) * 4,
                        top:       `${50 + 46 * Math.sin((i / 12) * Math.PI * 2)}%`,
                        left:      `${50 + 46 * Math.cos((i / 12) * Math.PI * 2)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  ))}
                </motion.div>
                <Diamond className="w-32 h-32 text-ice-300 drop-shadow-[0_0_40px_rgba(0,217,255,0.3)]" fill="currentColor" />
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 right-6 glass rounded-2xl px-4 py-3 shadow-ice"
              >
                <p className="font-serif text-2xl font-bold text-charcoal">10×</p>
                <p className="text-xs text-charcoal/50">moins cher qu&apos;un diamant</p>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute bottom-6 left-6 glass rounded-2xl px-4 py-3 shadow-gold"
              >
                <p className="font-serif text-2xl font-bold text-charcoal">9.25</p>
                <p className="text-xs text-charcoal/50">dureté Mohs</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                Notre conviction
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                Brillez{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-ice-500 to-ice-600">
                  différemment
                </span>
              </h2>
              <p className="mt-4 text-charcoal/60 leading-relaxed">
                Chez ICEKEY, nous croyons que le luxe ne devrait pas être réservé à quelques-uns.
                La moissanite offre un éclat identique — parfois supérieur — au diamant,
                sans le prix prohibitif ni les questions éthiques.
              </p>
            </div>

            {/* Value props */}
            <div className="space-y-4">
              {VALUES.map((v, i) => {
                const Icon = v.icon
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                  >
                    <div className={`w-10 h-10 rounded-xl ${v.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${v.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-charcoal mb-0.5">{v.title}</p>
                      <p className="text-xs text-charcoal/55 leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <Link href="/shop">
              <Button variant="primary" size="lg">
                Voir la collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
