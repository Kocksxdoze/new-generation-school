---
name: Luminous Academy
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#465f87'
  primary: '#00091b'
  on-primary: '#ffffff'
  primary-container: '#002045'
  on-primary-container: '#7089b3'
  inverse-primary: '#aec7f5'
  secondary: '#7c5800'
  on-secondary: '#ffffff'
  secondary-container: '#fdbb31'
  on-secondary-container: '#6d4d00'
  tertiary: '#000a0f'
  on-tertiary: '#ffffff'
  tertiary-container: '#00242d'
  on-tertiary-container: '#0194b2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aec7f5'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2e476e'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#fdbb31'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#b2ebff'
  tertiary-fixed-dim: '#69d4f4'
  on-tertiary-fixed: '#001f27'
  on-tertiary-fixed-variant: '#004e5e'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  surface-muted: '#F1F5F9'
  accent-soft: '#FFFBEB'
  text-heading: '#0F172A'
  text-body: '#334155'
  error-red: '#ba1a1a'
typography:
  display-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  display-xl-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap-lg: 120px
  section-gap-sm: 64px
  stack-md: 16px
---

## Brand & Style
Luminous Academy embodies a **Modern Corporate** aesthetic tailored for the educational sector. The brand personality is professional yet warm, balancing academic rigor with a nurturing, student-centric atmosphere. 

The design style utilizes structured grid layouts, generous whitespace, and a high-fidelity color palette to evoke trust and innovation. It avoids the clinical feel of traditional corporate design by incorporating organic decorative elements (soft blurs, "blobs") and vibrant secondary accents that suggest creativity and youthful energy. The overall emotional response should be one of confidence, clarity, and optimism.

## Colors
The color palette is anchored by a deep **Midnight Primary** (#002045) which provides authority and high contrast for typography. This is balanced by a **Goldenrod Secondary** (#fdbb31), used strategically for calls-to-action and highlights to inject warmth and "energy."

- **Primary:** Used for backgrounds of high-impact sections, primary buttons, and main navigation text.
- **Secondary:** Used for primary CTAs, decorative accents, and icons to draw the eye.
- **Surface Tiers:** Uses a sophisticated range of cool grays and off-whites to create subtle section breaks without relying on heavy borders.
- **Semantic Colors:** Soft ambers and light cyans are used as "soft" background tints for badges and feature cards to denote different categories of content.

## Typography
The typography system uses a pairing of **Manrope** for headlines and **Inter** for body text. 

- **Manrope** is used for its modern, geometric construction which feels both friendly and engineered. High-level displays use heavy weights (800) with tight letter spacing for impact.
- **Inter** provides maximum legibility for long-form content and UI labels.
- **Hierarchy:** Clear distinction is maintained through weight (Bold for labels/headings) and scale. "Label-sm" is frequently used in all-caps or with increased letter spacing for overlines and category tags.

## Layout & Spacing
The system follows a **Fixed Grid** approach for desktop, centering content within a 1280px max-width container. 

- **Vertical Rhythm:** Large section gaps (120px) are used to create "breathing room" between major thematic shifts.
- **Mobile Adaptivity:** Margins shrink to 16px. Hero layouts reflow from a 2-column side-by-side to a stacked vertical arrangement, prioritizing the visual asset or the lead headline depending on content priority.
- **Gutter System:** A standard 24px gutter is used between cards and grid items to ensure clear separation.

## Elevation & Depth
Depth is primarily conveyed through **Tonal Layers** and **Ambient Shadows**.

- **Surfaces:** The design uses `surface-container-lowest` (pure white) for interactive cards against `surface-muted` (light gray) backgrounds to create a natural "lift."
- **Shadows:** Shadows are extra-diffused and low-opacity (e.g., `shadow-xl` for large cards, `shadow-sm` for navigation bars). 
- **Backdrop Blurs:** High-level sections (like Hero) utilize large, low-opacity "blobs" with a `blur-3xl` effect to create a sense of ethereal depth behind images without adding structural complexity.

## Shapes
The shape language is **Rounded** and friendly. 

- **Standard Elements:** Cards and feature blocks use a base roundedness of 1rem (`2xl` or `3xl` in Tailwind terms), giving them a soft, approachable feel.
- **Images:** Hero and primary feature images use an exaggerated `rounded-[2rem]` to stand out as focal points.
- **Buttons & Pills:** Interactive CTA elements use a `full` (pill) radius to distinguish them from structural content containers.

## Components

- **Buttons:** 
  - *Primary:* Pill-shaped, high-contrast (Primary background or Secondary background), bold label-sm text.
  - *Secondary:* Pill-shaped, outlined with a 1px border or matching the surface background with a subtle border.
- **Cards:** 
  - Feature cards use pure white backgrounds, subtle shadows, and internal padding of 32px (8 units).
  - Program cards utilize a "full-bleed" image header with a gradient overlay to ensure text legibility at the bottom.
- **Chips / Badges:** 
  - Small, pill-shaped tags with low-saturation background tints (e.g., `accent-soft`) and contrasting text for category identification.
- **Navigation:**
  - Sticky top bar with a 1px border-bottom and subtle `shadow-sm`. Active links are indicated by a 2px bottom border in the secondary color.
- **Iconography:**
  - Material Symbols (Outlined) are used with a specific "FILL" 1 setting for emphasized features, often housed in rounded-xl containers with pastel backgrounds.