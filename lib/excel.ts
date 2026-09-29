import { ALL_ITEMS } from "./form-schema";
import type { ProgramGroup } from "./program-key";
import { overallAverage, sectionAverages, submissionAverage } from "./scoring";
import { SECTIONS } from "./form-schema";
import type { Dict } from "./i18n";
import type { Submission } from "./types";

/** Header fill. White text on this reads at ~6.5:1, so it stays legible. */
const HEADER_BLUE = "FF2F5597";

type Column = { header: string; width: number };
type Sheet = { name: string; columns: Column[]; rows: (string | number)[][] };

/**
 * Builds a styled .xlsx and hands it to the browser.
 *
 * Deliberately not CSV: CSV is plain text and cannot carry the blue header, and
 * it also needs a BOM hack before Excel reads Arabic correctly. xlsx has neither
 * problem. exceljs is loaded on demand so it stays out of the page bundle.
 */
export async function downloadWorkbook(filename: string, sheets: Sheet[]) {
  const ExcelJS = (await import("exceljs")).default;
  const workbook = new ExcelJS.Workbook();

  for (const sheet of sheets) {
    const worksheet = workbook.addWorksheet(sheet.name, {
      // Always left-to-right, in both languages, by request: spreadsheets are
      // read as columns of numbers and an RTL sheet flips that layout.
      views: [{ rightToLeft: false, state: "frozen", ySplit: 1 }],
    });

    worksheet.columns = sheet.columns.map((c) => ({ width: c.width }));
    worksheet.addRow(sheet.columns.map((c) => c.header));
    for (const row of sheet.rows) worksheet.addRow(row);

    const header = worksheet.getRow(1);
    header.height = 34;
    header.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: HEADER_BLUE },
      };
      cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });

    worksheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: sheet.columns.length },
    };
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const url = URL.createObjectURL(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.xlsx`;
  link.click();
  URL.revokeObjectURL(url);
}

/** One row per trainee, with every rated item as its own column. */
export function responsesSheet(
  t: Dict,
  name: string,
  submissions: Submission[],
  withProgram = false,
): Sheet {
  const columns: Column[] = [
    ...(withProgram ? [{ header: t.excel.program, width: 30 }] : []),
    { header: t.excel.traineeName, width: 22 },
    { header: t.excel.programDate, width: 14 },
    { header: t.excel.instructors, width: 26 },
    { header: t.excel.submittedAt, width: 14 },
    ...ALL_ITEMS.map((item) => ({
      header: t.excel.lang === "en" ? item.en : item.ar,
      width: 16,
    })),
    { header: t.excel.average, width: 10 },
    { header: t.excel.recommendations, width: 50 },
  ];

  const rows = submissions.map((s) => [
    ...(withProgram ? [s.program_name] : []),
    s.trainee_name ?? "",
    s.program_date,
    s.instructors.join("، "),
    s.created_at.slice(0, 10),
    ...ALL_ITEMS.map((item) => s.ratings?.[item.key] ?? ""),
    round(submissionAverage(s.ratings)),
    s.recommendations ?? "",
  ]);

  return { name, columns, rows };
}

/** One row per course: counts, overall average, and each section's average. */
export function summarySheet(t: Dict, groups: ProgramGroup[]): Sheet {
  return {
    name: t.excel.summarySheet,
    columns: [
      { header: t.excel.program, width: 32 },
      { header: t.excel.fromDate, width: 14 },
      { header: t.excel.toDate, width: 14 },
      { header: t.excel.instructors, width: 28 },
      { header: t.excel.responseCount, width: 12 },
      { header: t.excel.overallAverage, width: 14 },
      ...SECTIONS.map((section) => ({
        header: t.excel.lang === "en" ? section.en : section.ar,
        width: 18,
      })),
    ],
    rows: groups.map((group) => {
      const bySection = sectionAverages(group.submissions);
      return [
        group.name,
        group.firstDate,
        group.lastDate,
        group.instructors.join("، "),
        group.submissions.length,
        round(overallAverage(group.submissions)),
        ...SECTIONS.map((section) => round(bySection[section.key])),
      ];
    }),
  };
}

function round(value: number | null): number | string {
  return value === null ? "" : Math.round(value * 100) / 100;
}

/** Excel rejects : \ / ? * [ ] in sheet names, and caps them at 31 chars. */
export function safeSheetName(name: string): string {
  return name.replace(/[:\\/?*[\]]/g, " ").slice(0, 31) || "ورقة";
}
