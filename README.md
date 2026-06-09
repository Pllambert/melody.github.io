# Melody Website Dev Journal

Production site for `melodyvc.com`, hosted from this GitHub Pages repository.

## Current Production Shape

The production-now architecture is intentionally simple and path-based:

- Public site: `https://melodyvc.com/`
- Employee login: `https://melodyvc.com/employee-login.html`
- Supabase callback: `https://melodyvc.com/auth/callback.html`
- Employee app directory: `https://melodyvc.com/apps.html`
- ARIA app handoff/status page: `https://melodyvc.com/aria.html`
- MAESTRO status page: `https://melodyvc.com/maestro.html`
- CHORUS status page: `https://melodyvc.com/chorus.html`
- ARIA workspace: `https://aria.melodyvc.com`
- MAESTRO workspace: `https://maestro.melodyvc.com`

The `CNAME` file points GitHub Pages at `melodyvc.com`.

## What Was Added

- Employee login page with Google sign-in through Supabase Auth.
- Auth callback page that validates the Supabase session.
- Employee app directory with three tiles: ARIA, MAESTRO, and CHORUS.
- Classy authenticated coming-soon pages for ARIA, MAESTRO, and CHORUS.
- Shared auth helper in `auth.js`.
- Privacy notice, cookie notice, and accessibility statement.
- Contact-form privacy acknowledgement and point-of-collection notice.
- Removal of Google Fonts from site pages to avoid unnecessary third-party requests.

## Supabase

Supabase project URL:

```text
https://izecxzeqymahgonfhwvb.supabase.co
```

Frontend publishable key is stored in `auth.js`.

Allowed employee email domains:

```text
melodyvc.com
vixr.ai
```

Supabase Auth URL Configuration should be:

```text
Site URL:
https://melodyvc.com

Redirect URLs:
https://melodyvc.com/auth/callback.html
https://aria.melodyvc.com/auth/callback
https://maestro.melodyvc.com/auth/callback
```

## Google OAuth

Google Cloud needs these OAuth settings:

```text
Authorised JavaScript origins:
https://melodyvc.com

Authorised redirect URIs:
https://izecxzeqymahgonfhwvb.supabase.co/auth/v1/callback
```

The Google redirect URI points to Supabase, not directly to the website, because Supabase completes the OAuth exchange and then redirects back to `https://melodyvc.com/auth/callback.html`.

## Login Flow

1. User visits `https://melodyvc.com/employee-login.html`.
2. User clicks Continue with Google.
3. Supabase starts Google OAuth.
4. Google redirects back to Supabase.
5. Supabase redirects to `https://melodyvc.com/auth/callback.html`.
6. Callback checks for a valid session and allowed employee domain.
7. Approved users land on `https://melodyvc.com/apps.html`.
8. App tiles route to the authenticated ARIA and MAESTRO workspaces, and the CHORUS status page.

## Important Security Note

This is a static GitHub Pages site. The browser-side Supabase guard prevents normal display and navigation for unauthenticated users, but static HTML files can still be requested directly if someone knows the URL.

For true server-side access control, move the employee portal behind an edge/server auth layer such as Cloudflare Access, Vercel/Netlify middleware, or the authenticated app deployments themselves.

## Compliance Baseline

The site currently states that Melody does not set analytics, advertising, profiling, or marketing cookies. Because no non-essential cookies are set by Melody, no cookie consent banner is shown.

The contact form includes a notice at collection and requires acknowledgement of the Privacy Notice before submission.

Privacy requests are directed to:

```text
privacy@melodyvc.com
```

## App Subdomains

The long-term product shape uses:

- `portal.melodyvc.com`
- `aria.melodyvc.com`
- `maestro.melodyvc.com`
- `chorus.melodyvc.com`

For production today, ARIA and MAESTRO use app subdomains. The static
`melodyvc.com` site remains the public site and employee app directory.
