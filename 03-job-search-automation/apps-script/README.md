# Apps Script Setup

## Purpose

`Code.gs` is the Google Apps Script foundation for the Daily Job Application Operating System.

It creates the `Job OS` menu inside Google Sheets and supports:

- Sheet setup.
- Header creation.
- Dropdown validation.
- Moving `Apply` rows into `Apply Queue`.
- Daily summary counts.
- Basic filter clearing.
- Action result alerts so menu items do not fail silently.

No external APIs, secrets, OAuth setup, scraping, or deployment are required for this foundation.

## Manual Install

1. Create or open the Google Sheet that will become the job tracker.
2. In the sheet menu, open **Extensions > Apps Script**.
3. Delete any starter code in the script editor.
4. Paste the full contents of `Code.gs`.
5. Click **Save**.
6. Return to the Google Sheet and reload the browser tab.
7. Use the new **Job OS** menu.
8. Click **Job OS > Setup Sheets**.
9. Approve the Apps Script permission prompt if Google asks. The script only edits the current spreadsheet.

`Setup Sheets` now simplifies the workbook to the core tabs. It removes the old generated tabs named `Application Packages`, `Source List`, and `Settings` if they exist, and trims extra columns from the core OS tabs.

## First Use

After setup:

1. Add or import job rows into `Today Intake`.
2. Mark `Decision` as `Apply`, `Maybe`, or `Skip`.
3. Run **Job OS > Move Apply Rows to Queue**.
4. Use `Apply Queue` as the application preparation worklist.
5. Mark submitted applications manually.
6. Run **Job OS > Generate Daily Summary**.

## Minimal Test

In `Today Intake`, add one row with:

- today's date in `Date`
- any company
- any job title
- any job URL
- `Apply` in `Decision`
- blank or `Not Started` in `Status`

Then run **Job OS > Move Apply Rows to Queue**. The script should show an alert with the number of rows moved.
