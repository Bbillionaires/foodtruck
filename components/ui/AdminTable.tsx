export default function AdminTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <div className="card overflow-auto">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xl font-black">{title}</h3>
        <span className="badge">CSV-ready</span>
      </div>
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-slate-200 bg-slate-50 p-3 text-left font-black text-slate-700 first:rounded-l-xl last:rounded-r-xl">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-slate-100 p-3 text-slate-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
