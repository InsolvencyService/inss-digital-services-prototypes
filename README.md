# INSS Digital Services Prototypes

A GOV.UK Prototype Kit project for developing and testing insolvency digital service prototypes.

## Description

This prototype kit is used to rapidly create and test user interfaces for insolvency-related digital services. Built on the GOV.UK Prototype Kit, it follows government design standards and patterns to ensure consistency and accessibility.

## Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/InsolvencyService/inss-digital-services-prototypes.git
   cd inss-digital-services-prototypes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Creating New Prototypes

1. Add new pages in the `app/views` directory
2. Use GOV.UK Frontend components and patterns
3. Create custom routes in `app/routes.js` if needed
4. Add custom styles in `app/assets/sass/application.scss`
5. Add custom JavaScript in `app/assets/javascripts/application.js`

### Session Data

Default session data can be configured in `app/data/session-data-defaults.js`.

## Development Setup

### Project Structure

```
inss-digital-services-prototypes/
├── app/
│   ├── assets/          # Custom CSS, JS, and images
│   ├── data/            # Session data defaults
│   ├── filters.js       # Custom Nunjucks filters
│   ├── routes.js        # Custom routes
│   └── views/           # Page templates
│       └── layouts/     # Layout templates
├── docs/                # Documentation
├── package.json         # Project dependencies
└── README.md           # This file
```

### Configuration

Service configuration is stored in `app/config.json`:
- Service name: "Insolvency digital services prototypes"
- GOV.UK Frontend rebrand enabled

## Available Routes/Features

### Current Routes

- `/` - Homepage

### Adding Custom Routes

Edit `app/routes.js` to add new routes:

```javascript
router.get('/your-route', function (req, res) {
  res.render('your-template')
})
```

## Dependencies

### Main Dependencies

- **GOV.UK Prototype Kit**: v13.18.1
- **GOV.UK Frontend**: v5.14.0

### Development Dependencies

See `package.json` for a full list of dependencies.

## Available Commands

- `npm run dev` - Start the development server with auto-reload
- `npm start` - Start the production server
- `npm test` - Run tests (if configured)

## Contributing Guidelines

1. **Branch Naming**: Use descriptive branch names (e.g., `feature/add-search-page`)
2. **Commit Messages**: Write clear, concise commit messages
3. **Code Style**: Follow the existing code style and GOV.UK design patterns
4. **Testing**: Test your prototypes across different browsers and devices
5. **Documentation**: Update the README when adding significant features
6. **Pull Requests**: Create pull requests for review before merging

### GOV.UK Design System

Follow the [GOV.UK Design System](https://design-system.service.gov.uk/) for:
- Components
- Patterns
- Styles
- Accessibility guidelines

## License

[Add your license information here]

## Support

For issues or questions, please [add contact information or issue tracker link].
