# Valo

Valo is an AI-first sales automation workspace designed to help businesses turn enquiries into paying customers.

## Current build

The repository now contains a functional responsive SaaS MVP with:

- Dashboard and revenue metrics
- Lead command center with search and filters
- Lead scoring and pipeline stages
- Add-lead flow with AI-scoring UX
- Lead detail drawer
- AI sales copilot panel
- Follow-up workspace
- Conversation inbox
- Automation rules UI
- Customers workspace
- Analytics dashboard
- Workspace and AI settings
- Local persistence for realistic end-to-end testing
- Mobile responsive navigation

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Product principle

Valo is not a generic chatbot or generic CRM. It automates concrete revenue-generating workflows while keeping consequential actions under human control.

## Production architecture

The UI is intentionally usable without credentials so the product can be tested immediately. The next production wiring layer should connect the workspace to authenticated persistent storage, server-side AI, real message channels and billing.

Recommended production stack:

- React + Vite frontend
- Firebase Authentication + Firestore for identity and persistent workspace data
- Server-side AI endpoint with environment-managed provider key
- Netlify Functions for lightweight server endpoints
- Stripe or another supported billing provider after customer validation
- WhatsApp Business / email / website form connectors after the core workflow is validated

## AI safety boundary

AI should qualify, prioritize, draft and recommend by default. Sending consequential customer messages automatically should be an explicit workspace setting.
