import type { Session } from "@/lib/attendance";
import type { Dict } from "@/lib/i18n";

/**
 * A print-exact replica of the TAQA attendance sheet.
 *
 * Built in HTML rather than drawn into the original PDF on purpose: the names
 * are Arabic, and a PDF writer would need glyph shaping and RTL reordering to
 * render them joined and in the right order. The browser already does both
 * correctly, so printing this page (Save as PDF) gives real Arabic, selectable
 * text, and the same layout.
 *
 * Sizes are in mm against an A4 page so the screen preview and the print match.
 */
const ROWS_PER_PAGE = 18;
const TEAL = "#1d546d";

export default function AttendanceSheet({
  session,
  t,
}: {
  session: Session;
  t: Dict;
}) {
  const pages: Session["attendees"][] = [];
  for (let i = 0; i < Math.max(session.attendees.length, 1); i += ROWS_PER_PAGE) {
    pages.push(session.attendees.slice(i, i + ROWS_PER_PAGE));
  }

  return (
    <div dir="ltr" className="attendance-sheets">
      {pages.map((rows, pageIndex) => (
        <section key={pageIndex} className="sheet">
          <header className="sheet-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/taqa-logo.png" alt="TAQA Arabia" className="sheet-logo" />
            <h1 className="sheet-title">ATTENDANCE SHEET</h1>
          </header>

          <div className="sheet-fields">
            <div className="sheet-field">
              <span className="sheet-field-label">Program Name</span>
              <span className="sheet-colon">:</span>
              <span className="sheet-field-value">{session.programName}</span>
            </div>
            <div className="sheet-field">
              <span className="sheet-field-label">Date</span>
              <span className="sheet-colon">:</span>
              <span className="sheet-field-value">{session.date}</span>
            </div>
          </div>

          <table className="sheet-table">
            <thead>
              <tr>
                <th className="col-no">No</th>
                <th className="col-name">Name</th>
                <th className="col-dept">Department</th>
                <th className="col-sign">Signature</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: ROWS_PER_PAGE }, (_, i) => {
                const person = rows[i];
                const number = pageIndex * ROWS_PER_PAGE + i + 1;
                return (
                  <tr key={i}>
                    <td className="col-no">{person ? number : ""}</td>
                    {/* Arabic names inside an LTR sheet need isolating. */}
                    <td className="col-name">
                      {person && <bdi>{person.name}</bdi>}
                    </td>
                    <td className="col-dept">
                      {person && <bdi>{person.department}</bdi>}
                    </td>
                    {/* Signature stays empty — it is signed by hand. */}
                    <td className="col-sign" />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ))}

      <style>{`
        .attendance-sheets { --teal: ${TEAL}; }
        .sheet {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto 8mm;
          padding: 10mm 9mm 12mm;
          background: #f3f4f4;
          color: #111;
          font-family: "Segoe UI", Arial, sans-serif;
          box-sizing: border-box;
          box-shadow: 0 10px 30px -12px rgb(30 58 107 / 0.35);
        }
        .sheet-head {
          display: flex;
          align-items: flex-end;
          gap: 4mm;
          margin-bottom: 4mm;
        }
        .sheet-logo { width: 72mm; height: auto; display: block; }
        .sheet-title {
          margin: 0 0 2mm;
          color: var(--teal);
          font-size: 25pt;
          font-weight: 700;
          letter-spacing: -0.4pt;
          line-height: 1;
        }
        .sheet-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5mm;
          margin-bottom: 5mm;
        }
        .sheet-field {
          display: flex;
          align-items: baseline;
          gap: 2mm;
          border: 0.4mm solid #2a2a2a;
          padding: 2.4mm 3mm;
          min-height: 9mm;
          box-sizing: border-box;
        }
        .sheet-field-label {
          color: var(--teal);
          font-size: 12pt;
          font-weight: 700;
          white-space: nowrap;
        }
        .sheet-colon { color: var(--teal); font-size: 12pt; font-weight: 700; }
        .sheet-field-value {
          flex: 1;
          min-width: 0;
          border-bottom: 0.3mm dotted #444;
          font-size: 11pt;
          font-weight: 600;
          padding-bottom: 0.6mm;
          overflow-wrap: anywhere;
        }
        .sheet-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        .sheet-table th {
          background: var(--teal);
          color: #fff;
          font-size: 12pt;
          font-weight: 700;
          padding: 3mm 2mm;
          border: 0.3mm solid var(--teal);
        }
        .sheet-table td {
          border: 0.3mm solid #2a2a2a;
          height: 11mm;
          padding: 1mm 2.5mm;
          font-size: 10.5pt;
          background: #f7f8f8;
          overflow-wrap: anywhere;
        }
        .sheet-table td.col-no {
          background: #e8e8e8;
          text-align: center;
          font-weight: 600;
        }
        .col-no { width: 12mm; }
        .col-name { width: 72mm; }
        .col-dept { width: 52mm; }
        .col-sign { width: 46mm; }

        @media print {
          .sheet {
            margin: 0;
            box-shadow: none;
            page-break-after: always;
            break-after: page;
          }
          .sheet:last-child { page-break-after: auto; break-after: auto; }
        }
      `}</style>
    </div>
  );
}
