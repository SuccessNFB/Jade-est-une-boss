# Magic MCP – 21st.dev UI Component Generator

Generate beautiful, production-ready UI components from natural language descriptions.

## What it does

- Generates React/Next.js components from a text prompt
- Returns TypeScript code with Tailwind CSS styling
- Includes SVGL logo integration
- Real-time previews available in the 21st.dev console

## Setup (one-time)

1. Get your API key at https://21st.dev/magic/console
2. Open `.claude/settings.json` in this project
3. Replace `YOUR_21ST_DEV_API_KEY` with your actual key

## Usage

When invoked with `/magic`, describe the component you want:

```
/magic Create a product card for ICEKEY with:
- Animated shimmer effect on hover
- Ice blue gradient badge for the price tier
- Gold "Add to cart" button
- Moissanite stone details in a clean spec grid
```

## Tips for ICEKEY

Always include the brand constraints in your prompt:
- **Colors**: White bg, Ice Blue `#00D9FF`, Gold `#FFD700`, Charcoal `#333333`
- **Typography**: Playfair Display (serif headings) + Inter (body)
- **Style**: Premium, luminous, high-ticket luxury feel
- **Stack**: Next.js 15, Tailwind CSS, Framer Motion

## Examples

```
/magic Hero banner with animated floating diamonds and "Cold is the new gold" tagline

/magic Checkout progress stepper with ice blue active states

/magic Jewelry size guide modal with interactive ring sizer

/magic Trust badge strip: SSL, GRA certified, 30-day returns, free shipping
```
