# email-tracking-platform


# overall
email-tracking-platform/
├── apps/
│   ├── web/            # Next.js application
│   └── tracker/        # Tracking microservice
├── packages/
│   └── db/             # Shared database client
├── .github/
│   └── workflows/
├── .gitignore
├── package.json
└── README.md



# web-folder-sturucture

apps/web/
├── app/
│   ├── layout.tsx  # Root layout (Navbar + Sidebar)
│   ├── page.tsx    # Redirect / landing
│   ├── dashboard/
│   │   └── page.tsx
│   ├── campaigns/
│   │   └── page.tsx
│   ├── emails/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── analytics/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── error.tsx          # Global error boundary
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── PageHeader.tsx
│   ├── cards/
│   │   ├── KpiCard.tsx
│   │   └── StatCard.tsx
│   ├── tables/
│   │   ├── CampaignTable.tsx
│   │   └── EmailTable.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   └── Loader.tsx
│   └── empty/
│       └── EmptyState.tsx
│
├── services/
│   └── api.ts                  # Server-side fetchers
│
├── types/
│   ├── email.ts
│   ├── campaign.ts
│   └── analytics.ts
│
├── styles/
│   └── globals.css
│
├── lib/
│   └── utils.ts
│
├── public/
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.example
