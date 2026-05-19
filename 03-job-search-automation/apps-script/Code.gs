/**
 * Daily Job Application Operating System - simple Google Sheets foundation.
 *
 * Paste this file into a Google Sheet Apps Script project.
 * No external APIs, secrets, OAuth clients, scraping, email sending, or auto-submit.
 */

const SHEET_NAMES = {
  TODAY_INTAKE: 'Today Intake',
  APPLY_QUEUE: 'Apply Queue',
  RESUME_VERSIONS: 'Resume Versions',
  DAILY_SUMMARY: 'Daily Summary',
};

const OBSOLETE_SHEET_NAMES = ['Application Packages', 'Source List', 'Settings'];

const HEADERS = {
  [SHEET_NAMES.TODAY_INTAKE]: [
    'Date',
    'Source',
    'Company',
    'Job Title',
    'Job URL',
    'Location',
    'Category',
    'Decision',
    'Status',
    'Resume',
    'Notes',
  ],
  [SHEET_NAMES.APPLY_QUEUE]: [
    'Queue Date',
    'Company',
    'Job Title',
    'Job URL',
    'Category',
    'Resume',
    'Resume Link',
    'Drafts',
    'Status',
    'Applied Date',
    'Notes',
  ],
  [SHEET_NAMES.RESUME_VERSIONS]: [
    'Resume',
    'Target Role',
    'Drive File Link',
    'Keywords',
  ],
  [SHEET_NAMES.DAILY_SUMMARY]: [
    'Date',
    'Metric',
    'Value',
  ],
};

const STATUS_OPTIONS = {
  Decision: ['Apply', 'Maybe', 'Skip'],
  Status: ['Not Started', 'Queued', 'Drafted', 'Applied', 'Skipped'],
  Resume: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'],
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Job OS')
    .addItem('Setup Sheets', 'setupSheets')
    .addItem('Move Apply Rows to Queue', 'moveApplyRowsToQueue')
    .addItem('Generate Daily Summary', 'generateDailySummary')
    .addItem('Clear Today Filters', 'clearTodayFilters')
    .addToUi();
}

function setupSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  removeObsoleteSheets_(spreadsheet);

  Object.keys(HEADERS).forEach((sheetName) => {
    const sheet = getOrCreateSheet_(spreadsheet, sheetName);
    setupSheet_(sheet, HEADERS[sheetName]);
  });

  seedResumeVersions_(spreadsheet.getSheetByName(SHEET_NAMES.RESUME_VERSIONS));

  SpreadsheetApp.getUi().alert(
    'Job OS setup complete. Tabs are now simplified to Today Intake, Apply Queue, Resume Versions, and Daily Summary.'
  );
}

function moveApplyRowsToQueue() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const intakeSheet = getOrCreateSheet_(spreadsheet, SHEET_NAMES.TODAY_INTAKE);
  const queueSheet = getOrCreateSheet_(spreadsheet, SHEET_NAMES.APPLY_QUEUE);

  setupSheet_(intakeSheet, HEADERS[SHEET_NAMES.TODAY_INTAKE]);
  setupSheet_(queueSheet, HEADERS[SHEET_NAMES.APPLY_QUEUE]);

  const intakeRows = getRowsAsObjects_(intakeSheet);
  const queuedUrls = new Set(
    getRowsAsObjects_(queueSheet)
      .map((row) => normalizeUrl_(row['Job URL']))
      .filter(Boolean)
  );
  const intakeHeaderMap = getHeaderMap_(intakeSheet);
  const rowsToAppend = [];
  const today = new Date();
  let applyRowsFound = 0;
  let duplicateRowsSkipped = 0;
  let missingUrlRowsSkipped = 0;

  intakeRows.forEach((row) => {
    const decision = String(row.Decision || '').trim();
    const status = String(row.Status || '').trim();
    const jobUrl = normalizeUrl_(row['Job URL']);

    if (decision !== 'Apply' || status === 'Queued' || status === 'Drafted' || status === 'Applied') {
      return;
    }

    applyRowsFound += 1;

    if (!jobUrl) {
      missingUrlRowsSkipped += 1;
      return;
    }

    if (queuedUrls.has(jobUrl)) {
      duplicateRowsSkipped += 1;
      setRowValue_(intakeSheet, intakeHeaderMap, row._rowNumber, 'Status', 'Queued');
      return;
    }

    rowsToAppend.push([
      today,
      row.Company || '',
      row['Job Title'] || '',
      row['Job URL'] || '',
      row.Category || '',
      row.Resume || '',
      '',
      '',
      'Not Started',
      '',
      row.Notes || '',
    ]);

    queuedUrls.add(jobUrl);
    setRowValue_(intakeSheet, intakeHeaderMap, row._rowNumber, 'Status', 'Queued');
  });

  if (rowsToAppend.length > 0) {
    const startRow = Math.max(queueSheet.getLastRow() + 1, 2);
    queueSheet.getRange(startRow, 1, rowsToAppend.length, rowsToAppend[0].length).setValues(rowsToAppend);
  }

  SpreadsheetApp.getUi().alert(
    [
      `Apply rows found: ${applyRowsFound}`,
      `Moved to Apply Queue: ${rowsToAppend.length}`,
      `Duplicates skipped: ${duplicateRowsSkipped}`,
      `Missing URL skipped: ${missingUrlRowsSkipped}`,
    ].join('\n')
  );
}

function generateDailySummary() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const intakeSheet = getOrCreateSheet_(spreadsheet, SHEET_NAMES.TODAY_INTAKE);
  const queueSheet = getOrCreateSheet_(spreadsheet, SHEET_NAMES.APPLY_QUEUE);
  const summarySheet = getOrCreateSheet_(spreadsheet, SHEET_NAMES.DAILY_SUMMARY);

  setupSheet_(summarySheet, HEADERS[SHEET_NAMES.DAILY_SUMMARY]);

  const today = new Date();
  const todayKey = dateKey_(today);
  const intakeRows = getRowsAsObjects_(intakeSheet);
  const queueRows = getRowsAsObjects_(queueSheet);
  const todayIntakeRows = intakeRows.filter((row) => dateKey_(row.Date) === todayKey);
  const todayQueueRows = queueRows.filter((row) => dateKey_(row['Queue Date']) === todayKey);

  const summaryRows = [
    [today, 'Jobs found today', todayIntakeRows.length],
    [today, 'Marked Apply', countRows_(todayIntakeRows, 'Decision', 'Apply')],
    [today, 'Marked Maybe', countRows_(todayIntakeRows, 'Decision', 'Maybe')],
    [today, 'Marked Skip', countRows_(todayIntakeRows, 'Decision', 'Skip')],
    [today, 'Queued today', todayQueueRows.length],
    [today, 'Applied today', countRowsByDateAndStatus_(queueRows, 'Applied Date', todayKey, 'Status', 'Applied')],
  ];

  summarySheet.clearContents();
  setupSheet_(summarySheet, HEADERS[SHEET_NAMES.DAILY_SUMMARY]);
  summarySheet.getRange(2, 1, summaryRows.length, summaryRows[0].length).setValues(summaryRows);

  SpreadsheetApp.getUi().alert('Daily Summary updated.');
}

function clearTodayFilters() {
  const todaySheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.TODAY_INTAKE);

  if (!todaySheet) {
    SpreadsheetApp.getUi().alert('Today Intake sheet does not exist yet. Run Setup Sheets first.');
    return;
  }

  const filter = todaySheet.getFilter();
  if (filter) {
    filter.remove();
    SpreadsheetApp.getUi().alert('Today Intake filter removed.');
    return;
  }

  SpreadsheetApp.getUi().alert('No Today Intake filter was active.');
}

function getOrCreateSheet_(spreadsheet, sheetName) {
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function removeObsoleteSheets_(spreadsheet) {
  OBSOLETE_SHEET_NAMES.forEach((sheetName) => {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (sheet && spreadsheet.getSheets().length > 1) {
      spreadsheet.deleteSheet(sheet);
    }
  });
}

function setupSheet_(sheet, headers) {
  resizeToHeaderCount_(sheet, headers.length);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange
    .setFontWeight('bold')
    .setBackground('#d9ead3')
    .setWrap(true);

  sheet.setFrozenRows(1);
  applyDropdowns_(sheet, headers);
  sheet.autoResizeColumns(1, headers.length);
}

function resizeToHeaderCount_(sheet, headerCount) {
  const maxColumns = sheet.getMaxColumns();

  if (maxColumns > headerCount) {
    sheet.deleteColumns(headerCount + 1, maxColumns - headerCount);
  }

  if (maxColumns < headerCount) {
    sheet.insertColumnsAfter(maxColumns, headerCount - maxColumns);
  }
}

function applyDropdowns_(sheet, headers) {
  headers.forEach((header, index) => {
    const options = STATUS_OPTIONS[header];
    if (!options) {
      return;
    }

    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(options, true)
      .setAllowInvalid(false)
      .build();

    sheet.getRange(2, index + 1, Math.max(sheet.getMaxRows() - 1, 1), 1).setDataValidation(rule);
  });
}

function getRowsAsObjects_(sheet) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  if (lastRow < 2 || lastColumn < 1) {
    return [];
  }

  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const values = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();

  return values
    .map((rowValues, rowIndex) => {
      const row = { _rowNumber: rowIndex + 2 };
      headers.forEach((header, columnIndex) => {
        if (header) {
          row[String(header)] = rowValues[columnIndex];
        }
      });
      return row;
    })
    .filter((row) => Object.keys(row).some((key) => key !== '_rowNumber' && row[key] !== ''));
}

function getHeaderMap_(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const map = {};

  headers.forEach((header, index) => {
    if (header) {
      map[String(header)] = index + 1;
    }
  });

  return map;
}

function setRowValue_(sheet, headerMap, rowNumber, headerName, value) {
  const column = headerMap[headerName];
  if (column) {
    sheet.getRange(rowNumber, column).setValue(value);
  }
}

function countRows_(rows, fieldName, expectedValue) {
  return rows.filter((row) => String(row[fieldName] || '').trim() === expectedValue).length;
}

function countRowsByDateAndStatus_(rows, dateField, expectedDateKey, statusField, expectedStatus) {
  return rows.filter((row) => {
    return dateKey_(row[dateField]) === expectedDateKey &&
      String(row[statusField] || '').trim() === expectedStatus;
  }).length;
}

function normalizeUrl_(value) {
  return String(value || '').trim().toLowerCase();
}

function dateKey_(value) {
  if (!value) {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function seedResumeVersions_(sheet) {
  setupSheet_(sheet, HEADERS[SHEET_NAMES.RESUME_VERSIONS]);

  if (sheet.getLastRow() > 1) {
    return;
  }

  const rows = [
    ['R1', 'Systems Analyst', '', 'systems analysis, requirements, workflow mapping'],
    ['R2', 'Business Analyst', '', 'business analysis, process mapping, reporting'],
    ['R3', 'Project Coordinator', '', 'coordination, timelines, documentation'],
    ['R4', 'Implementation Coordinator', '', 'implementation, rollout, training'],
    ['R5', 'IT Support / Infrastructure Analyst', '', 'IT support, troubleshooting, infrastructure'],
    ['R6', 'Data / Reporting Analyst', '', 'data analysis, dashboards, spreadsheets'],
    ['R7', 'Operations / Process Improvement', '', 'operations, process improvement, SOPs'],
    ['R8', 'ERP / CRM / Business Systems', '', 'ERP, CRM, business systems'],
    ['R9', 'Healthcare IT / Public Sector', '', 'healthcare IT, public sector, documentation'],
    ['R10', 'General Entry-Level Tech / Ops Hybrid', '', 'entry-level, tech, operations'],
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}
