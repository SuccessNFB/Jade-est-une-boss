'use client'

import { useState } from 'react'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import toast from 'react-hot-toast'

const subjects = [
  { value: 'commande', label: 'Ma commande' },
  { value: 'produit', label: 'Un produit' },
  { value: 'personnalisation', label: 'Personnalisation / Gravure' },
  { value: 'autre', label: 'Autre' },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Tous les champs sont requis.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      toast.success('Message envoyé ! On revient vers toi sous 24h.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error("Une erreur est survenue. Réessaie ou écris-nous directement.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="bg-[#F5F5F5] py-14 text-center">
          <div className="section-container">
            <p className="text-ice-500 text-xs tracking-[0.35em] uppercase font-semibold mb-3">
              On est là
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-3">
              Contactez-nous
            </h1>
            <p className="text-charcoal/50 text-lg max-w-md mx-auto">
              Une question, un doute, un projet ? Écris-nous. On répond vite — pour de vrai.
            </p>
          </div>
        </section>

        {/* ── Main grid ── */}
        <section className="section-container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">

            {/* ── Form ── */}
            <div className="lg:col-span-3">
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-6">
                Envoyer un message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">
                      Prénom & Nom
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jade Dupont"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-charcoal text-sm placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-ice-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jade@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-charcoal text-sm placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-ice-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Sujet
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-ice-500 transition bg-white appearance-none"
                  >
                    <option value="" disabled>Choisir un sujet…</option>
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Dis-nous tout…"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-charcoal text-sm placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-ice-500 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#00D9FF] text-charcoal font-semibold text-sm tracking-wide rounded-full hover:scale-[1.02] hover:shadow-ice transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {loading ? 'Envoi en cours…' : 'Envoyer le message →'}
                </button>
              </form>
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#F5F5F5] rounded-2xl p-7">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-5">Infos pratiques</h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">✉️</span>
                    <div>
                      <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-0.5">Email</p>
                      <a
                        href="mailto:contact@icekey.shop"
                        className="text-charcoal font-medium text-sm hover:text-ice-600 transition-colors"
                      >
                        contact@icekey.shop
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">⏱️</span>
                    <div>
                      <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-0.5">Délai de réponse</p>
                      <p className="text-charcoal font-medium text-sm">Sous 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">🕐</span>
                    <div>
                      <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-0.5">Disponibilité</p>
                      <p className="text-charcoal font-medium text-sm">Lun — Ven · 9h–18h</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#E0F7FF] rounded-2xl p-7">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2">On est aussi là-bas</h3>
                <p className="text-charcoal/60 text-sm mb-5">
                  DM, story, tag — on répond sur les réseaux aussi.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://instagram.com/icekey.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl text-charcoal text-sm font-semibold hover:shadow-ice transition-all duration-200 hover:text-ice-600"
                  >
                    <span className="text-lg">📸</span>
                    @icekey.shop — Instagram
                  </a>
                  <a
                    href="https://tiktok.com/@icekey.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl text-charcoal text-sm font-semibold hover:shadow-ice transition-all duration-200 hover:text-ice-600"
                  >
                    <span className="text-lg">🎵</span>
                    @icekey.shop — TikTok
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
