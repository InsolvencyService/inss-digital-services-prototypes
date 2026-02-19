# AI Coding Agent Instructions for INSS Digital Services Prototypes

## Project Overview

This is a **GOV.UK Prototype Kit** project for building and testing Insolvency Service digital service prototypes. It's a government-aligned prototyping framework (NOT a production application) for rapidly validating UI/UX for multiple insolvency-related services.

**Key Services:**
- **IP Upload**: Redundancy payment forms (RP14/A) upload and processing
- **Customer Forms**: Complaint handling forms and user workflows
- **User Management**: Staff and service manager authentication and registration

## Architecture & Component Structure

### Template Hierarchy
- **Main Layout** ([app/views/layouts/main.html](app/views/layouts/main.html)): All pages extend this; includes GOV.UK header, service navigation, prototype banner
- **Service Roots** (e.g., [app/views/ipservice/index.html](app/views/ipservice/index.html)): Each service has an index that lists available prototype versions using `govukTaskList` components
- **Feature Flows**: Individual steps in multi-step forms (e.g., [app/views/ipservice/ip-upload/home.html](app/views/ipservice/ip-upload/home.html))

### Routing Pattern
- **No explicit route handlers currently**: All pages are directly accessible by file path (e.g., `/ipservice/ip-upload/home.html` → [app/views/ipservice/ip-upload/home.html](app/views/ipservice/ip-upload/home.html))
- **Custom routes** should be added to [app/routes.js](app/routes.js) using `govukPrototypeKit.requests.setupRouter()`
- **Session data** persists across requests via [app/data/session-data-defaults.js](app/data/session-data-defaults.js) (currently minimal)

### Key Files
- **[app/config.json](app/config.json)**: Service name and GOV.UK frontend rebrand settings
- **[app/filters.js](app/filters.js)**: Custom Nunjucks filters for template logic
- **[app/routes.js](app/routes.js)**: Route handlers (minimal currently; add logic here for dynamic pages)
- **[server.js](server.js): Enforces PORT via `process.env.PORT || 3000`

## Development Workflow

### Starting Development
```bash
npm run dev          # Start with hot reload (development)
npm run serve        # Start without hot reload (serving)
npm run start        # Standard start
```
All commands run on `http://localhost:3000` by default.

### Adding New Pages
1. Create `.html` file in [app/views/](app/views/) following the service structure (e.g., `ipservice/new-feature/page.html`)
2. Extend `layouts/main.html` and use GOV.UK Frontend components
3. If page requires logic (form submission, conditional routing), add route handler in [app/routes.js](app/routes.js)

### Adding Filters & Custom Logic
- Template filters go in [app/filters.js](app/filters.js) using `govukPrototypeKit.views.addFilter(name, filterFunction)`
- Keep session data lightweight; session persists across page navigation automatically

## Coding Patterns & Conventions

### Nunjucks Template Blocks
Standard blocks inherited from GOV.UK Prototype Kit layout:
- `{% block pageTitle %}` - Browser tab title
- `{% block beforeContent %}` - Area above main content (typically `govukBackLink`)
- `{% block content %}` - Main page content
- `{% block headerEnd %}` - Custom header area

### GOV.UK Component Usage
Prototype heavily uses Gov.UK Frontend macros:
- **`govukTaskList`**: Multi-item list with status tags (In progress/Completed/Not started)
- **`govukBackLink`**: Navigation back to previous page
- **`govukHeader`** & **`govukServiceNavigation`**: Auto-included in main layout
- **`govukPhaseBanner`**: Always includes "Prototype" warning (data will not persist)

### Status Tag Classes
Defined inline as variables; reuse pattern:
```nunjucks
{% set incompleteStatus = {
  tag: {
    text: "In progress",
    classes: "govuk-tag--light-blue"
  }
} %}
```
Common statuses: `"In progress"` (light-blue), `"Completed"` (default), `"Not started"` (blue)

### Navigation Structure
- Homepage ([app/views/index.html](app/views/index.html)): Service discovery (task list of available prototypes)
- Service index pages: List prototype versions for that service
- Feature/version pages: Individual pages in multi-step flows

## Dependencies & External Knowledge

### Core Dependencies
- **govuk-prototype-kit** (v13.18.1): Base framework; handles templating, routing, session management
- **govuk-frontend** (v5.14.0): Component library with rebrand enabled
- **@govuk-prototype-kit/common-templates** (v2.0.1): Additional templates

### Key Framework Links (for reference)
- Creating routes: https://prototype-kit.service.gov.uk/docs/create-routes
- Creating filters: https://prototype-kit.service.gov.uk/docs/filters
- Using layouts: https://prototype-kit.service.gov.uk/docs/how-to-use-layouts

## Common Workflows for AI Agents

### Task: Add a New Prototype Service
1. Create service folder in [app/views/](app/views/) (e.g., `my-service/`)
2. Create `index.html` extending `layouts/main.html`; use `govukTaskList` to list prototype versions
3. Create version folders (e.g., `my-service/v1/`) with individual page templates
4. Add entry to homepage task list in [app/views/index.html](app/views/index.html)

### Task: Build a Multi-Step Form Flow
1. Create folder for feature (e.g., `app/views/ipservice/new-upload/`)
2. Create step pages: `start.html`, `step1.html`, `step2.html`, `check-answers.html`, `confirmation.html`
3. Each step uses back link (`govukBackLink`) for navigation; form submission goes to next step
4. If session data needed, define defaults in [app/data/session-data-defaults.js](app/data/session-data-defaults.js) and store via `req.session.data`

### Task: Handle Form Submission with Custom Logic
1. Add route to [app/routes.js](app/routes.js):
   ```javascript
   router.post('/path/to/form', (req, res) => {
     req.session.data.fieldName = req.body.fieldName
     res.redirect('/next-page')
   })
   ```
2. Forms should `method="post"` and `action="/path/to/form"` 
3. Use standard input patterns from GOV.UK Frontend (govukInput, govukFileUpload, etc.)

## Important Constraints & Notes

- **Prototype-Only**: All data is lost on server restart; no persistence layer
- **Service Navigation**: Broken/incomplete links should use `href="#"` and `status: notStarted` tag
- **Government Standards**: Always use GOV.UK Frontend components; custom styles go in [app/assets/sass/application.scss](app/assets/sass/application.scss)
- **File Structure Matters**: Path in views/ directory directly maps to URL route (unless custom route handler exists)

## Quick Reference Paths

| Purpose | Path |
|---------|------|
| Add global styles | [app/assets/sass/application.scss](app/assets/sass/application.scss) |
| Add global scripts | [app/assets/javascripts/application.js](app/assets/javascripts/application.js) |
| Session defaults | [app/data/session-data-defaults.js](app/data/session-data-defaults.js) |
| Custom routes | [app/routes.js](app/routes.js) |
| Template filters | [app/filters.js](app/filters.js) |
| Main layout | [app/views/layouts/main.html](app/views/layouts/main.html) |
| Homepage | [app/views/index.html](app/views/index.html) |
