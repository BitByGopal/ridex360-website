# RideX360 Marketing Website

Next.js 14 + TypeScript + Tailwind CSS source for the RideX360 company/marketing website (not the mobile app).

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Demo request notifications (email + SMS)

The "Request a Demo" form posts to `app/api/demo/route.ts`, which:
- validates the organization's email and mobile number,
- sends a confirmation email to the organization (via Resend),
- sends an SMS confirmation to the organization's mobile number (via Twilio),
- emails and texts the RideX360 team (`princegopalreddy@gmail.com`, `+917075810619`) with the lead details.

To activate it:

1. `npm install resend twilio` (already listed in `package.json`, so a plain `npm install` also covers it)
2. Copy `.env.local.example` to `.env.local`
3. Fill in `RESEND_API_KEY` from [resend.com](https://resend.com) (dashboard → API Keys)
4. Fill in `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` from [twilio.com](https://twilio.com) (Console dashboard + your trial number)
5. Restart `npm run dev` so the new env vars are picked up

Twilio trial accounts can only text numbers you've verified in their console — verify your own number first when testing.

`.env.local` is gitignored and never shipped in this zip — don't commit real API keys.

## Notes
- Fonts (Fraunces + Inter) load from Google Fonts at build time via `next/font/google` — requires internet access when building.
- Brand tokens (colors, fonts) are in `tailwind.config.ts`.
- All dashboard/product numbers (128 vehicles, 2,450 passengers, etc.) are placeholder demonstration data — replace before going live.
- No real founders/customers/funding claims are included, per the brief.
