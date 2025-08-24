# Samedev

A modern Next.js application built with TypeScript, Tailwind CSS, and Stylus following best practices and clean architecture principles.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for utility-first styling
- 🎯 **Stylus** for component-specific styles
- 🔧 **TypeScript** for type safety
- 🎪 **Radix UI** for accessible components
- 🗃️ **Zustand** for state management
- ✅ **Zod** for schema validation
- 🧪 **Jest & Testing Library** for testing
- 📝 **ESLint** with Standard.js rules
- 🎯 **Performance optimized** with React Server Components

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Stylus
- **UI Components**: Radix UI + Shadcn UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Standard.js

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd samedev
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
samedev/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── card/             # Example component with Stylus
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
├── store/                # Zustand stores
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── styles/               # Global Stylus styles
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests

### Code Style

This project follows Standard.js rules:

- 2 space indentation
- Single quotes for strings
- No semicolons
- No unused variables
- Space after keywords
- Space before function parentheses
- Always use === instead of ==
- Infix operators must be spaced
- Commas should have a space after them

### Component Structure

Components follow this structure:
1. Exported component
2. Subcomponents
3. Helper functions
4. Static content

### Styling Approach

- **Tailwind CSS**: For utility classes and rapid prototyping
- **Stylus Modules**: For complex, component-specific styles
- **CSS Variables**: For theming and design tokens

### State Management

- **Zustand**: For global state management
- **React Context**: For intermediate state sharing
- **Local State**: For component-specific state

## Testing

Run tests with:
```bash
npm test
```

The project uses Jest and React Testing Library for comprehensive testing.

## Deployment

The application can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

## Contributing

1. Follow the established code style and conventions
2. Write tests for new features
3. Ensure all tests pass before submitting
4. Use conventional commit messages

## License

This project is licensed under the MIT License.
