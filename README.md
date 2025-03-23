# Smart Insurance Application Portal

A modern React.js application for managing insurance applications with dynamic forms and customizable views. Built with scalability and maintainability in mind, featuring conditional logic and real-time data synchronization.

## Table of Contents

- Getting Started
- Features
- Technical Overview
- Installation
- Development Guidelines
- Contributing

## Getting Started

Clone the repository

```bash
git clone https://github.com/MehdiiRezakhani/smart-insurance-portal.git

```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

## Features

1. **Dynamic Form System**

- Forms fetched dynamically from API endpoints
- Conditional fields based on user responses
- Nested sections support (Address, Vehicle Details)
- Real-time validation
- API-driven field options

2. **Customizable List View**

- Sortable columns
- Dynamic column selection
- Responsive design

3. **Dark Mode**

- System-preference detection with manual toggle option
- Persistent theme preference via localStorage
- Carefully designed color palette for both light and dark themes
- Smooth transitions between themes
- Improved readability and reduced eye strain in low-light environments

4. **Localization**

- Multi-language support with English and Persian
- Right-to-left (RTL) text direction support for Persian
- Language detection based on browser settings
- Persistent language preference via localStorage
- Custom Persian font integration (Vazirmatn)
- Properly aligned UI elements that adapt to text direction
- Comprehensive translation system using i18next
- Easy extensibility for adding more languages

## Technical Overview

The application follows a modular architecture with clear separation of concerns:

- Form Management System
- API Integration Layer
- State Management

Key technologies used:

- React.js with Hooks
- React Hook Form for form handling
- Redux for state management
- Axios for API communication
- i18next for localization
- Tailwind CSS for styling

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production version
npm run build

```

## Development Guidelines

1. **Component Structure** - Keep components small and focused

- Use TypeScript interfaces for prop types
- Implement error boundaries
- Follow container/presenter pattern

2. **State Management** - Use Redux for global state

- Local component state for UI-only data
- Memoize selectors and callbacks

3. **API Integration** - Use service layer for API calls

- Implement request/response transformers
- Handle errors consistently
- Cache responses when appropriate

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit pull request with documentation
