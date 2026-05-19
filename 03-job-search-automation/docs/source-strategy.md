# Source Strategy

## MVP Principle

Start with reliable, low-friction sources. Do not build fragile scraping into the foundation.

Direct scraping of LinkedIn and Indeed may be unreliable because of login requirements, changing page structures, rate limits, anti-bot systems, and terms of service concerns. The MVP should avoid depending on scraping those sites.

## Preferred MVP Sources

### Gmail Job Alert Emails

Use job alert emails from LinkedIn, Indeed, and similar services as a future intake source. This can be more reliable than scraping search result pages because the job links arrive in Aaron's inbox.

Not implemented in Phase 1.

### Company Career Pages

Company career pages are useful for targeted source lists. They are often easier to review manually and may expose stable pages.

Not implemented in Phase 1.

### Greenhouse

Many companies use public Greenhouse job boards. Future scripts may read public board pages or APIs where available.

Not implemented in Phase 1.

### Lever

Many companies use public Lever job pages. Future scripts may read public postings where available.

Not implemented in Phase 1.

### Ashby

Ashby-hosted job boards can be useful for company-level source scanning.

Not implemented in Phase 1.

### Manual URL Paste

Manual URL paste should be supported early because it is dependable, transparent, and does not require credentials.

Not implemented in Phase 1, but planned as Phase 2.

## Source Inventory

For now, source strategy can live in config files or docs. A dedicated sheet tab can be added later only if it becomes directly useful.

A future source inventory should track:

- Source name.
- Source type.
- Source URL.
- Enabled status.
- Role categories.
- Location filter.
- Notes.
