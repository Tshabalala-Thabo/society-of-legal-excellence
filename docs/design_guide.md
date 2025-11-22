# Society of Legal Excellence
## Brand Design Guide

---

## Color Palette

### Primary Color
- **Accent Gold**: `#f6ce54`
  - Usage: CTAs, highlights, accent elements only
  - Frequency: 5-10% of page layouts
  - Applications: Button accents, subtle underlines, hover states, emphasis badges

### Secondary Colors
- **Off-White**: `#fafaf8` - Primary background
- **Dark Charcoal**: `#2a2a2a` - Primary text
- **Medium Gray**: `#757575` - Secondary text, metadata
- **Light Gray**: `#e8e8e6` - Dividers, borders
- **Very Light Gray**: `#f5f5f3` - Secondary background sections

### Color Usage Rules
- Backgrounds: Off-white and very light gray (95% of layouts)
- Text: Dark charcoal for primary content, medium gray for secondary
- Accent: Gold for interactive elements and key highlights only
- Borders: Light gray with subtle presence
- Never use gold as a background color or for body text

---

## Typography

### Font Recommendations
- **Headings**: Inter, Roboto, or similar modern sans-serif (geometric, clean)
- **Body Text**: Inter, Open Sans, or similar (highly legible, neutral)
- Recommendation: Stick with one typeface family to maintain minimalism

### Type Scale

| Element | Font Size | Font Weight | Color |
|---------|-----------|-------------|-------|
| H1 (Page Title) | 48px | 700 | #2a2a2a |
| H2 (Section Header) | 36px | 700 | #2a2a2a |
| H3 (Subsection) | 28px | 600 | #2a2a2a |
| H4 (Minor Heading) | 22px | 600 | #2a2a2a |
| Body Text | 16px | 400 | #2a2a2a |
| Small Text / Metadata | 14px | 400 | #757575 |
| Caption | 12px | 400 | #757575 |

### Line Height

- **Headings**: 1.2 (tight, confident)
- **Body Text**: 1.6 (spacious, readable)
- **Lists**: 1.8 (breathing room between items)

---

## Spacing & Padding System

### Base Unit: 8px
Use multiples of 8px for all spacing decisions to maintain consistency and rhythm.

### Section Spacing
- **Extra Large**: 96px (between major page sections)
- **Large**: 64px (between subsections)
- **Medium**: 48px (between content blocks)
- **Small**: 24px (between components)
- **Extra Small**: 16px (within component groups)

### Component Padding
- **Large Containers**: 48px (page sections, card backgrounds)
- **Medium Containers**: 32px (content blocks, featured areas)
- **Small Containers**: 24px (cards, smaller components)
- **Minimal**: 16px (text inputs, small UI elements)

### Heading Spacing

| Heading Level | Space Below | Space Above (if not page start) |
|---------------|-------------|--------------------------------|
| H1 | 32px | 64px |
| H2 | 24px | 48px |
| H3 | 16px | 32px |
| H4 | 12px | 24px |

### Paragraph Spacing
- **Space between paragraphs**: 24px
- **Space before paragraph after heading**: 0px (heading space below covers this)
- **Space between paragraphs in lists**: 16px

### Maximum Content Width
- **Max-width**: 1200px for centered layouts
- **Padding on sides** (on smaller screens): 24px minimum

---

## Border Radius

### All Elements Must Have Zero Radius
- **Images**: 0px
- **Buttons**: 0px
- **Cards**: 0px
- **Input fields**: 0px
- **Modals**: 0px
- **All UI elements**: 0px

This creates sharp, clean lines consistent with the minimalist aesthetic.

---

## Component Guidelines

### Buttons
- **Primary Button**: Gold (#f6ce54) background, dark text, 0px radius, 16px padding
- **Secondary Button**: Transparent with light gray border (#e8e8e6), dark text, 0px radius, 16px padding
- **Text Button**: No background, gold (#f6ce54) text, 0px radius
- Hover state: Slightly darker/lighter shade, maintain sharp edges

### Cards & Containers
- **Background**: Off-white (#fafaf8) or very light gray (#f5f5f3)
- **Border**: Optional light gray (#e8e8e6), 1px
- **Padding**: 32px or 48px
- **Radius**: 0px (sharp corners)

### Dividers
- **Color**: Light gray (#e8e8e6)
- **Weight**: 1px
- **Usage**: Subtle separation between sections
- **Spacing**: 48px above and below

### Images
- **Aspect Ratios**: Maintain consistent ratios throughout (16:9, 3:2, 1:1)
- **Border Radius**: 0px (sharp edges)
- **Borders**: Optional thin light gray border (1px, #e8e8e6)
- **Background**: None (images appear directly on backgrounds)

### Form Elements

#### Text Inputs & Textareas
- **Background**: #fafaf8 (off-white)
- **Border**: 1px solid #e8e8e6 (light gray)
- **Border Radius**: 0px (sharp corners)
- **Padding**: 12px 16px
- **Font Size**: 16px
- **Text Color**: #2a2a2a
- **Placeholder Color**: #757575 (medium gray)
- **Line Height**: 1.5

**Focus State:**
- Border color: #f6ce54 (gold)
- Border width: 2px
- Padding adjustment: 11px 15px (maintain element size)
- Background remains unchanged

**Disabled State:**
- Background: #f5f5f3 (very light gray)
- Border color: #e8e8e6
- Text color: #757575
- Cursor: not-allowed

#### Checkboxes & Radio Buttons
- **Size**: 20px × 20px
- **Border**: 2px solid #e8e8e6
- **Border Radius**: 0px (square)
- **Background**: #fafaf8
- **Checked state**: Gold background (#f6ce54) with white checkmark/dot
- **Focus state**: 2px gold border (#f6ce54)
- **Spacing from label**: 12px

#### Select Dropdowns
- **Background**: #fafaf8
- **Border**: 1px solid #e8e8e6
- **Border Radius**: 0px
- **Padding**: 12px 16px
- **Font Size**: 16px
- **Arrow icon**: Medium gray (#757575), positioned right
- **Focus state**: 2px gold border (#f6ce54)

#### Labels
- **Font Size**: 14px
- **Font Weight**: 600
- **Color**: #2a2a2a
- **Spacing below label**: 8px
- **Margin below entire field**: 24px
- **Required indicator**: Gold asterisk (#f6ce54)

#### Form Validation
- **Error state**: 2px solid #d32f2f (red)
- **Error message color**: #d32f2f
- **Error message font size**: 12px
- **Error message spacing**: 4px above
- **Success state**: 2px solid #2e7d32 (green)

#### File Upload
- **Background**: #f5f5f3 (very light gray)
- **Border**: 2px dashed #e8e8e6
- **Border Radius**: 0px
- **Padding**: 32px 24px
- **Text color**: #757575
- **Hover state**: Border becomes solid, background slightly darker
- **Font size**: 14px

#### Form Sections & Fieldsets
- **Spacing between sections**: 48px
- **Fieldset border**: None
- **Fieldset legend**: H4 style (22px, 600 weight), 24px spacing below
- **Group spacing**: 16px between related fields

#### Textarea
- **Same as text inputs**
- **Min-height**: 120px
- **Resize**: Vertical only
- **Font family**: Body text font (monospace optional for code fields)

### Navigation Styles

#### Primary Navigation (Header)
- **Background**: #fafaf8 (off-white) or transparent on colored backgrounds
- **Border bottom**: Optional 1px solid #e8e8e6
- **Height**: 72px (including padding)
- **Padding**: 16px 48px
- **Alignment**: Left-aligned logo, right-aligned menu items
- **Sticky option**: Can be sticky on scroll for usability

**Logo:**
- **Font size**: 20px
- **Font weight**: 700
- **Color**: #2a2a2a
- **Spacing from edge**: 48px
- **Can include gold accent**: Subtle use acceptable here
- **Font family**: Body text font (Inter, Open Sans, or similar)

**Menu Items (Desktop):**
- **Font size**: 14px
- **Font weight**: 500
- **Color**: #2a2a2a
- **Spacing between items**: 32px
- **Line height**: 1.5

**Menu Item States:**
- **Default**: #2a2a2a
- **Hover**: #f6ce54 (gold text) with smooth transition
- **Active/Current page**: #f6ce54 (gold) with optional 2px underline below (0px radius)
- **Active underline**: 2px solid #f6ce54, positioned 4px below text

#### Secondary Navigation (Breadcrumbs)
- **Font size**: 12px
- **Font weight**: 400
- **Color**: #757575 (medium gray)
- **Separator**: "/" in medium gray
- **Spacing between items**: 8px each side of separator
- **Link color**: #2a2a2a
- **Link hover**: #f6ce54
- **Padding**: 16px 0px
- **Position**: Above main content or below header

#### Mobile Navigation (Hamburger)
- **Icon size**: 24px × 24px
- **Icon color**: #2a2a2a
- **Position**: Right side of header
- **Spacing from edge**: 24px

**Mobile Menu:**
- **Background**: #fafaf8 or #f5f5f3
- **Width**: Full screen or 80% (left/right slide-in)
- **Border right**: Optional 1px solid #e8e8e6
- **Overlay background**: rgba(42, 42, 42, 0.5) semi-transparent
- **Animation**: Slide in from right/left (no rounded corners)
- **Close button**: Top right, 24px icon

**Mobile Menu Items:**
- **Font size**: 16px
- **Font weight**: 500
- **Color**: #2a2a2a
- **Padding**: 16px 24px per item
- **Border top**: 1px solid #e8e8e6 between items
- **Active state**: Gold text (#f6ce54) with left border accent (4px gold, 0px radius)

#### Sidebar Navigation (if applicable)
- **Background**: #f5f5f3 (very light gray)
- **Width**: 240px-280px (fixed or collapsible)
- **Border right**: 1px solid #e8e8e6
- **Padding**: 24px 0px

**Sidebar Items:**
- **Font size**: 14px
- **Font weight**: 500
- **Color**: #2a2a2a
- **Padding**: 12px 24px
- **Margin**: 0px
- **Active state**: Gold background (#f6ce54) with dark text, no hover effect
- **Hover state (inactive)**: #f5f5f3 becomes slightly darker (#efefeb)
- **Nested items**: Indent 16px, font-size 13px, font weight 400

#### Footer Navigation
- **Background**: #2a2a2a (dark charcoal) or #f5f5f3 (light gray)
- **Text color**: #fafaf8 (if dark background) or #2a2a2a (if light background)
- **Padding**: 64px 48px
- **Border top**: 1px solid #e8e8e6 (if light background)
- **Layout**: Multi-column (3-4 columns desktop, stacked mobile)
- **Column spacing**: 48px

**Footer Links:**
- **Font size**: 14px
- **Font weight**: 400
- **Color**: #757575 or lighter gray depending on background
- **Link hover**: Gold (#f6ce54)
- **Line height**: 1.8 (spacious)

**Footer Sections:**
- **Section heading**: Font weight 600, font size 14px, 16px margin below
- **Link spacing**: 12px between items

#### Call-to-Action (CTA) Navigation
- **Button style**: Refer to primary button guidelines
- **Placement**: Right side of main nav (desktop) or bottom of mobile menu
- **Spacing from other items**: 16px left margin

#### Search Bar (if included)
- **Width**: 200px-280px (desktop), full width or 90% (mobile)
- **Background**: #f5f5f3 or transparent with border
- **Border**: 1px solid #e8e8e6
- **Border radius**: 0px
- **Padding**: 12px 16px
- **Icon color**: #757575
- **Icon size**: 18px
- **Icon position**: Right side

---

## Layout Principles

### Grid System
- **12-column grid** on desktop
- **6-column grid** on tablet
- **1-column grid** on mobile
- **Gutter**: 24px between columns

### Whitespace
- Embrace generous whitespace
- Minimum 24px padding around all content
- At least 1.5x spacing above/below major sections
- Never feel crowded; minimalism thrives on space

### Visual Hierarchy
1. Use size and weight for headings
2. Use neutral colors for secondary information
3. Reserve gold accent for the most important CTAs or key information
4. Limit gold to no more than 1-2 accents per page view

---

## Accessibility & Readability

### Contrast Requirements
- Minimum WCAG AA contrast between text and background
- Dark charcoal (#2a2a2a) on off-white: ✓ Excellent
- Gold (#f6ce54) on white: ✗ Not recommended for body text (use for accents only)
- Medium gray (#757575) on off-white: ✓ Acceptable for secondary text

### Focus States
- Use gold (#f6ce54) for keyboard focus indicators
- Maintain 2px outline, 0px radius
- Ensure clear distinction from default state

---

## Design Checklist

- [ ] All elements have 0px border radius
- [ ] Gold accent appears sparingly (5-10% of page)
- [ ] Majority of layout uses neutral colors
- [ ] Consistent spacing using 8px base unit
- [ ] Generous whitespace throughout
- [ ] Line heights follow guidelines (1.2 for headings, 1.6 for body)
- [ ] All typography follows type scale
- [ ] Images and containers have sharp edges
- [ ] Heading spacing follows guidelines
- [ ] Paragraph spacing is 24px between blocks
- [ ] Clean, minimal aesthetic maintained
- [ ] Form inputs have 0px radius and proper focus states
- [ ] Navigation maintains consistent styling across all pages
- [ ] Gold accent used strategically in interactive elements
- [ ] Mobile navigation is fully functional and accessible

---
