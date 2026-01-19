# Card Component

A React card component implementation based on the Figma design, featuring multiple states, hover interactions, and action buttons.

## Features

- **Multiple Status States:**
  - ✅ Completed (green badge)
  - 🔄 Generating video (purple badge with spinner)
  - 📭 Empty (dark gray badge with placeholder)

- **Interactive Elements:**
  - Hover state with purple border
  - Action buttons that appear on hover (delete, duplicate, more options)
  - Click handlers for card and action buttons

- **Styling:**
  - Rounded corners (12px border radius)
  - Subtle drop shadows
  - Smooth transitions and animations
  - Dark theme optimized

## Usage

```tsx
import Card from './Card';

<Card
  id="card-1"
  title="AA-001-AA"
  category="Car Ads"
  date="3 days ago"
  status="completed"
  imageUrl="https://example.com/image.jpg"
  onDelete={(id) => console.log('Delete:', id)}
  onDuplicate={(id) => console.log('Duplicate:', id)}
  onMoreOptions={(id) => console.log('More options:', id)}
  onClick={(id) => console.log('Card clicked:', id)}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the card |
| `title` | `string` | Yes | Main title displayed on the card |
| `category` | `string` | Yes | Category name (e.g., "Car Ads") |
| `date` | `string` | Yes | Date string (e.g., "3 days ago") |
| `status` | `'completed' \| 'generating' \| 'empty'` | Yes | Status of the card |
| `imageUrl` | `string` | No | URL of the image to display (not used for empty state) |
| `onDelete` | `(id: string) => void` | No | Callback when delete button is clicked |
| `onDuplicate` | `(id: string) => void` | No | Callback when duplicate button is clicked |
| `onMoreOptions` | `(id: string) => void` | No | Callback when more options button is clicked |
| `onClick` | `(id: string) => void` | No | Callback when card is clicked |

## Status Types

- **completed**: Shows a green badge with "Completed" text
- **generating**: Shows a purple badge with "Generating video" text and a spinning icon
- **empty**: Shows a dark gray badge with "Empty" text and displays a placeholder graphic instead of an image

## Styling

The component uses CSS modules. Import `Card.css` alongside the component. The component is designed with a dark theme and uses the following color scheme:

- Background: `#383838`
- Completed badge: `#4CAF50` (green)
- Generating badge: `#9C27B0` (purple)
- Empty badge: `#383838` (dark gray)
- Delete button: `#F44336` (red)
- Action buttons: `#4A4A4A` (dark gray)
- Hover border: `#9C27B0` (purple)

## Demo

See `CardDemo.tsx` for example usage with all states and interactions.
