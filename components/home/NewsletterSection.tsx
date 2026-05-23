'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

export function NewsletterSection() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section
      className="section-pad border-t"
      style={{ background: '#0A0B12', borderColor: 'rgba(255,255,255,0.04)' }}
    >
      <div className="section-container max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Diamond icon */}
          <div
            className="w-12 h-12 rounded-2xl mx-auto mb-7 flex items-center justify-center"
            style={{ background: 'rgba(0,217,255,0.08)', color: '#00D9FF' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2 L22 9 L18 22 H6 L2 9 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M2 9 L22 9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 2 L6 9 L12 22 L18 9 Z" stroke="currentColor" strokeWidth="0.75" fill="none" opacity="0.5" />
            </svg>
          </div>

          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#00D9FF] mb-4">
            Ice Age Newsletter
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Sois dans le game
          </h2>
          <p className="text-white/55 mb-8 leading-relaxed">
            Drops en avant-première, offres exclusives.
            <br />
            <span className="text-white/60 font-semibold">–10% sur ta 1ère commande.</span>
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(0,217,255,0.1)' }}
              >
                <CheckCircle style={{ width: 26, height: 26, color: '#00D9FF' }} />
              </div>
              <p className="font-serif text-xl font-semibold text-white">Bienvenue dans l'Ice Age</p>
              <p className="text-sm text-white/60">
                Ton code –10% arrive dans ta boîte mail.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
              <input
                type="email"
                required
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#00D9FF]/40"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-ice flex-shrink-0 flex items-center gap-2 px-6 py-3.5 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Rejoindre
                    <ArrowRight style={{ width: 15, height: 15 }} />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-[11px] text-white/18 mt-5">
            Pas de spam. Désabonnement en 1 clic. RGPD.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
