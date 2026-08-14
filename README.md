# Vishnu's Portfolio

### Live - https://vishnuprasadbhat-portfolio.vercel.app/

### Checkout my old portfolio here - https://portfolio-vishnuprasad.netlify.app/

### Features

- Built using Next.js and TailwindCSS
- Minimal Design with Single Page Application(SPA) approach
- Authentication with Next Auth for Administarion
- Serverless SQL with Neon PostgreSQL for storing application data
- Customize and edit the portfolio details with GUI
- Builtin PDF Reader to view on browser
- Light and Dark Mode

### Sections

- Header
- Work
- Tech Stacks
- About
- Resume
- Contact
- Login (to Edit data)

### Tech Stack Used

- Next.js (Using lastest app router)
- TailwindCSS
- Serverless Postgres
- Next Auth
- Vercel

### Environment Variables

Set `DATABASE_URL` to the Neon connection string in local `.env.local`. For Vercel, open the project settings, select **Environment Variables**, add `DATABASE_URL`, paste the Neon connection string, and enable it for both **Preview** and **Production**. Redeploy after changing the variable. The application no longer uses the deprecated Vercel Postgres `POSTGRES_*` variables.
