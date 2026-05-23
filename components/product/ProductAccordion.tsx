'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AccordionItem {
  title:   string
  content: React.ReactNode
}

interface Props {
  items:        AccordionItem[]
  defaultOpen?: number
}

export function ProductAccordion({ items, defaultOpen }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null)

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex items-center justify-between w-full py-4 text-left"
          >
            <span className="text-sm font-semibold text-white/70 hover:text-white transition-colors">
              {item.title}
            </span>
            {open === i
              ? <Minus className="w-4 h-4 text-[#00D9FF] flex-shrink-0" />
              : <Plus  className="w-4 h-4 text-white/65 flex-shrink-0" />
            }
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-sm text-white/60 leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
