# Designify Order Portal

A modern e-commerce platform for ordering custom designs, built with React, Vite, and Sanity CMS.

## Features

- Browse and filter designs by category
- Preview designs before purchase
- Shopping cart functionality
- Responsive design
- Integration with Sanity CMS for content management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Sanity account and project

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/designify-order-portal.git
cd designify-order-portal
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Sanity token:
```
VITE_SANITY_TOKEN=your_sanity_token_here
```

4. Configure CORS in your Sanity project:
   - Go to your Sanity project dashboard
   - Navigate to API settings
   - Add `http://localhost:8080` to the CORS Origins list

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Building for Production

Build the application:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── pages/         # Page components
└── styles/        # Global styles and CSS modules
```

## Technologies Used

- React
- Vite
- TypeScript
- Tailwind CSS
- Sanity CMS
- React Router
- Lucide Icons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
