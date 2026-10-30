# Legacy repo merge summary

This branch keeps the active `revitaldaycare-dev/website` project as the canonical production repo and adds merged snapshots of the other legacy repositories for comparison and future content adoption.

## Included sources
- `revitaldaycare-dev/websitedaycare` — static daycare site content snapshot
- `revitaldaycare-dev/learning-in-action` — static educational program showcase snapshot

## Merged paths
- `legacy/websitedaycare/index.html`
- `legacy/websitedaycare/styles.css`
- `legacy/websitedaycare/script.js`
- `legacy/learning-in-action/public/index.html`

## Merge intent
- Preserve the current `website` production setup and Worker configuration.
- Keep the legacy repos as archived reference material rather than overwriting live site files.
- Use these snapshots as a source for future content, page sections, design direction, and SEO improvements.

## Notes
- The live production repo remains authoritative for Cloudflare deployment and routing.
- The imported content should be curated manually before being promoted into the root site pages.
