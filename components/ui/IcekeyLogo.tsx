import { cn } from '@/lib/utils/cn'

/** Couleur brand du logo (gris chaud) */
export const ICEKEY_LOGO_COLOR = '#595355'

interface LogoProps {
  /** 'full' = icône + wordmark empilés | 'horizontal' = côte à côte | 'icon' = losange seul | 'wordmark' = texte seul */
  variant?:   'full' | 'horizontal' | 'icon' | 'wordmark'
  /** Couleur. Défaut : couleur brand #595355 */
  color?:     string
  /** Hauteur totale en px */
  height?:    number
  className?: string
}

export function IcekeyLogo({
  variant   = 'horizontal',
  color     = ICEKEY_LOGO_COLOR,
  height    = 40,
  className,
}: LogoProps) {

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height, width: 'auto' }}
        className={className}
        role="img"
        aria-label="ICEKEY"
      >
        <Emblem color={color} />
      </svg>
    )
  }

  if (variant === 'wordmark') {
    return (
      <svg
        viewBox="0 0 280 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height, width: 'auto' }}
        className={className}
        role="img"
        aria-label="ICEKEY"
      >
        <text
          x="140" y="40"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
          fontSize="44"
          fontWeight="700"
          letterSpacing="10"
          fill={color}
        >
          ICEKEY
        </text>
      </svg>
    )
  }

  if (variant === 'full') {
    /* Proportions du logo original :
       - Losange ≈ 70 % de la hauteur totale
       - Espace   ≈  5 %
       - Wordmark ≈ 25 %                          */
    return (
      <svg
        viewBox="0 0 200 265"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height, width: 'auto' }}
        className={cn('flex-shrink-0', className)}
        role="img"
        aria-label="ICEKEY"
      >
        {/* Losange + monogramme IK */}
        <Emblem color={color} />

        {/* Wordmark ICEKEY */}
        <text
          x="100" y="253"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
          fontSize="35"
          fontWeight="700"
          letterSpacing="7"
          fill={color}
        >
          ICEKEY
        </text>
      </svg>
    )
  }

  /* ── horizontal (défaut) ─────────────────────────── */
  return (
    <svg
      viewBox="0 0 290 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height, width: 'auto' }}
      className={cn('flex-shrink-0', className)}
      role="img"
      aria-label="ICEKEY"
    >
      {/* Losange 68×68, centré verticalement à x=36 */}
      <g transform="translate(36,36) scale(0.34)">
        <Emblem color={color} cx={0} cy={0} />
      </g>

      {/* Wordmark */}
      <text
        x="82" y="46"
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontWeight="700"
        letterSpacing="7"
        fill={color}
      >
        ICEKEY
      </text>
    </svg>
  )
}

/* ── Emblem (losange + monogramme IK) ─────────────────────── */
function Emblem({
  color = ICEKEY_LOGO_COLOR,
  cx    = 100,
  cy    = 100,
}: {
  color?: string
  cx?:   number
  cy?:   number
}) {
  /* Losange : un carré de 162×162 tourné 45° */
  const half = 82
  const sw   = 5.5   /* stroke-width */

  return (
    <g>
      {/* ── Losange ── */}
      <polygon
        points={`${cx},${cy - half} ${cx + half},${cy} ${cx},${cy + half} ${cx - half},${cy}`}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinejoin="miter"
      />

      {/* ── Monogramme IK ──
          Police serif, lettres larges comme dans le logo original.
          Le I est légèrement à gauche, le K légèrement à droite,
          leurs empattements se touchent au centre.              */}
      <text
        x={cx - 22}
        y={cy + 30}
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontSize="82"
        fontWeight="400"
        textAnchor="middle"
        fill={color}
      >
        I
      </text>
      <text
        x={cx + 24}
        y={cy + 30}
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontSize="82"
        fontWeight="400"
        textAnchor="middle"
        fill={color}
      >
        K
      </text>
    </g>
  )
}
