import { cn } from '@/lib/utils/cn'

interface LogoProps {
  /** 'full' = icône + wordmark empilés | 'horizontal' = icône + wordmark côte à côte | 'icon' = icône seule | 'wordmark' = texte seul */
  variant?:   'full' | 'horizontal' | 'icon' | 'wordmark'
  /** Couleur du trait. Par défaut : currentColor (hérite de la couleur du parent) */
  color?:     string
  /** Hauteur totale en px */
  height?:    number
  className?: string
}

/** Reproduction SVG fidèle du logo ICEKEY :
 *  losange avec monogramme IK + wordmark "ICEKEY" en capitales sérifées.
 */
export function IcekeyLogo({
  variant   = 'horizontal',
  color     = 'currentColor',
  height    = 40,
  className,
}: LogoProps) {

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height, width: 'auto' }}
        className={className}
        aria-label="ICEKEY"
      >
        <DiamondMonogram color={color} cx={110} cy={110} size={190} fontSize={82} />
      </svg>
    )
  }

  if (variant === 'wordmark') {
    return (
      <svg
        viewBox="0 0 260 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: height * 0.38, width: 'auto' }}
        className={className}
        aria-label="ICEKEY"
      >
        <Wordmark color={color} x={130} y={42} fontSize={44} />
      </svg>
    )
  }

  if (variant === 'full') {
    return (
      <svg
        viewBox="0 0 220 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height, width: 'auto' }}
        className={cn('flex-shrink-0', className)}
        aria-label="ICEKEY"
      >
        <DiamondMonogram color={color} cx={110} cy={110} size={190} fontSize={82} />
        <Wordmark color={color} x={110} y={288} fontSize={38} />
      </svg>
    )
  }

  /* horizontal — défaut */
  return (
    <svg
      viewBox="0 0 330 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height, width: 'auto' }}
      className={cn('flex-shrink-0', className)}
      aria-label="ICEKEY"
    >
      {/* Icon centré verticalement à gauche */}
      <DiamondMonogram color={color} cx={40} cy={40} size={70} fontSize={30} />
      {/* Wordmark à droite */}
      <text
        x={88}
        y={51}
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={36}
        fontWeight="700"
        letterSpacing="6"
        fill={color}
      >
        ICEKEY
      </text>
    </svg>
  )
}

/* ── Sub-components ────────────────────────────────────────── */

function DiamondMonogram({
  color, cx, cy, size, fontSize,
}: {
  color: string; cx: number; cy: number; size: number; fontSize: number
}) {
  const half = size / 2
  const pts  = `${cx},${cy - half} ${cx + half},${cy} ${cx},${cy + half} ${cx - half},${cy}`
  const sw   = size * 0.032

  return (
    <g>
      {/* Losange */}
      <polygon
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="miter"
      />
      {/* Monogramme IK */}
      <text
        x={cx - fontSize * 0.12}
        y={cy + fontSize * 0.35}
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize={fontSize}
        fontWeight="400"
        textAnchor="middle"
        fill={color}
        letterSpacing="-2"
      >
        IK
      </text>
    </g>
  )
}

function Wordmark({
  color, x, y, fontSize,
}: {
  color: string; x: number; y: number; fontSize: number
}) {
  return (
    <text
      x={x}
      y={y}
      fontFamily="'Playfair Display', Georgia, serif"
      fontSize={fontSize}
      fontWeight="700"
      textAnchor="middle"
      letterSpacing={fontSize * 0.22}
      fill={color}
    >
      ICEKEY
    </text>
  )
}
