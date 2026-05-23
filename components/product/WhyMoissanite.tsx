import Image from 'next/image'

const STEPS = [
  {
    num:   '01',
    title: 'Choisissez votre pièce',
    desc:  'Parcourez notre collection ou configurez votre bijou sur mesure en quelques clics.',
    img:   '/images/why-step-1.jpg',
    alt:   'Sélection bijou moissanite',
  },
  {
    num:   '02',
    title: 'Nous le fabriquons',
    desc:  'Chaque pièce est montée à la main avec une moissanite certifiée GRA, taille D VVS.',
    img:   '/images/why-step-2.jpg',
    alt:   'Fabrication artisanale',
  },
  {
    num:   '03',
    title: 'Portez-le avec fierté',
    desc:  'Livré dans son écrin ICEKEY avec certificat d\'authenticité. Éclat garanti à vie.',
    img:   '/images/why-step-3.jpg',
    alt:   'Porter un bijou ICEKEY',
  },
]

export function WhyMoissanite() {
  return (
    <section className="py-14 border-t border-white/[0.06]">
      <h2 className="font-serif text-2xl font-bold text-white/70 mb-10 text-center">
        Pourquoi la moissanite ICEKEY ?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {STEPS.map((step) => (
          <div key={step.num} className="text-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#141414] mb-5">
              <Image
                src={step.img}
                alt={step.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center">
                {step.num}
              </div>
            </div>
            <p className="font-serif font-semibold text-white/70 mb-2">{step.title}</p>
            <p className="text-sm text-charcoal/55 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
