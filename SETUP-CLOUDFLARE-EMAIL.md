# Cloudflare Email Sending Setup Guide

This guide explains how to configure Cloudflare Email Sending so the contact form sends submissions directly to revitaldaycare@gmail.com without opening the user's email client.

## Prerequisites

1. **Domain ownership**: You must own `revitaldaycare.com`
2. **Cloudflare account**: You must have access to the Cloudflare account that manages this domain

## Step 1: Add Domain to Cloudflare

If `revitaldaycare.com` is not already in your Cloudflare account:

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Add a Site** (top right)
3. Enter `revitaldaycare.com`
4. Select the **Free** plan (sufficient for this use case)
5. Cloudflare will scan your existing DNS records
6. **Update your domain's nameservers** at your registrar (GoDaddy, Namecheap, etc.) to the ones Cloudflare provides
7. Wait for DNS propagation (usually 24-48 hours, often much faster)

## Step 2: Enable Email Sending

Once the domain is active in Cloudflare:

```bash
# Using Wrangler CLI
npx wrangler email sending enable revitaldaycare.com
```

Or via the Cloudflare Dashboard:
1. Go to **Email** > **Email Sending** in the left sidebar
2. Click **Enable** for `revitaldaycare.com`
3. Verify the domain (Cloudflare will guide you through this)

## Step 3: Configure the Pages Project

The contact form currently uses a `mailto:` fallback. To switch back to the Pages Function approach:

### 3a. Recreate the Pages Project with Functions Support

The current `websitedaycare` project was created as static-only and doesn't support Workers/Functions. You have two options:

**Option A: Create a new Pages project (Recommended)**

```bash
# Create a new project connected to the GitHub repo
npx wrangler pages project create revitaldaycare-website \
  --production-branch=main
```

Then connect it to the GitHub repository `revitaldaycare-dev/website`.

**Option B: Delete and recreate the existing project**

1. Go to Cloudflare Dashboard > Pages
2. Delete the `websitedaycare` project
3. Create a new project with the same name, connected to GitHub

### 3b. Add the Form Handler Function

Once the new project is created, the `functions/submit.js` file will be recognized:

```bash
# Restore the function file
cd /tmp/opencode/website-clone
git checkout 26ebc3a -- functions/submit.js
git add functions/submit.js
git commit -m "feat: restore Pages Function for form handling"
git push origin main
```

### 3c. Configure the Email Binding

In the Cloudflare Dashboard:
1. Go to **Pages** > your project > **Settings** > **Functions**
2. Under **Bindings**, click **Add binding**
3. Select **Email Sending**
4. Name: `EMAIL`
5. Send to: `revitaldaycare@gmail.com`

Or using Wrangler:
```bash
npx wrangler pages secret put EMAIL --project-name=revitaldaycare-website
```

### 3d. Update the Form Action

Once the function is working, update `script.js` to use the API instead of mailto:

```javascript
// Replace the mailto handler with fetch
const res = await fetch('/.functions/submit', {
    method: 'POST',
    body: new FormData(contactForm),
    headers: { 'Accept': 'application/json' }
});
```

## Step 4: Set Up Custom Domain (for SEO)

To fix the SEO score (currently 66/100 due to noindex on preview URL):

1. Go to **Pages** > your project > **Custom domains**
2. Add `revitaldaycare.com` and `www.revitaldaycare.com`
3. Cloudflare will configure DNS automatically (since the domain is on Cloudflare)
4. Wait for SSL certificate provisioning (usually <5 minutes)

## Step 5: Verify Everything Works

1. Visit `https://revitaldaycare.com/contact`
2. Fill out the form
3. Submit it
4. Check `revitaldaycare@gmail.com` for the submission email

## Troubleshooting

### "Email service not configured" error (503)
- The `EMAIL` binding is not set up in the Pages project
- Go to Pages > Settings > Functions > Bindings and verify

### Form returns 405
- The project doesn't support Workers/Functions
- Recreate the project following Step 3a

### Emails not arriving
- Check spam folder
- Verify Email Sending is enabled in Cloudflare Dashboard
- Check the function logs: `npx wrangler pages deployment tail`

## Current Status

| Feature | Status | Notes |
|---------|--------|-------|
| Static site | ✅ Working | Deployed to Cloudflare Pages |
| Contact form | ⚠️ mailto fallback | Opens email client instead of sending directly |
| Email Sending | ❌ Not configured | Domain needs to be added to Cloudflare |
| Custom domain | ❌ Not configured | Needed for SEO (removes noindex) |
| Lighthouse | 99/100/100/66 | SEO score limited by noindex on preview URL |

## Quick Reference

- **Production URL**: `https://websitedaycare.pages.dev`
- **Repository**: `https://github.com/revitaldaycare-dev/website`
- **Cloudflare Account**: `Revitaldaycare@gmail.com's Account`
- **Target email**: `revitaldaycare@gmail.com`
