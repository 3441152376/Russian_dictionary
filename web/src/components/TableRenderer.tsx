import React from 'react';

type TableLike = any;

function is2DArray(value: any): value is Array<Array<any>> {
  return Array.isArray(value) && value.every((row) => Array.isArray(row));
}

function isRowObjectArray(value: any): value is Array<Record<string, any>> {
  return Array.isArray(value) && value.every((row) => row && typeof row === 'object' && !Array.isArray(row));
}

function uniqueKeys(rows: Array<Record<string, any>>): string[] {
  const set = new Set<string>();
  rows.forEach((r) => Object.keys(r).forEach((k) => set.add(k)));
  return Array.from(set);
}

export function TableRenderer({ data, title }: { data: TableLike; title?: string }) {
  // 常见结构：
  // 1) { headers: string[], rows: string[][] }
  // 2) string[][]
  // 3) Array<Record<string, any>>
  // 4) 其他对象 => 键值表

  if (!data) return null;

  // 1) 带 headers/rows 的对象
  if (data && typeof data === 'object' && Array.isArray((data as any).rows)) {
    const headers: string[] = (data as any).headers || [];
    const rows: any[][] = (data as any).rows || [];
    return (
      <div className="overflow-x-auto">
        {title && <div className="text-sm text-gray-500 mb-2">{title}</div>}
        <table className="min-w-full divide-y divide-gray-200">
          {headers.length > 0 && (
            <thead className="bg-gray-50">
              <tr>
                {headers.map((h: string, i: number) => (
                  <th key={i} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-2 whitespace-pre-wrap text-sm text-gray-900">{String(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 2) 纯二维数组
  if (is2DArray(data)) {
    const rows = data as any[][];
    return (
      <div className="overflow-x-auto">
        {title && <div className="text-sm text-gray-500 mb-2">{title}</div>}
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-2 whitespace-pre-wrap text-sm text-gray-900">{String(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 3) 行是对象的数组（自动收集所有 key 为表头）
  if (isRowObjectArray(data)) {
    const rows = data as Array<Record<string, any>>;
    const headers = uniqueKeys(rows);
    return (
      <div className="overflow-x-auto">
        {title && <div className="text-sm text-gray-500 mb-2">{title}</div>}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, idx) => (
              <tr key={idx}>
                {headers.map((h) => (
                  <td key={h} className="px-4 py-2 whitespace-pre-wrap text-sm text-gray-900">{String(row[h] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 4) 兜底：键值对
  if (data && typeof data === 'object') {
    const entries = Object.entries(data as Record<string, any>);
    return (
      <div className="overflow-x-auto">
        {title && <div className="text-sm text-gray-500 mb-2">{title}</div>}
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map(([k, v]) => (
              <tr key={k}>
                <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">{k}</td>
                <td className="px-4 py-2 text-sm text-gray-900 whitespace-pre-wrap break-words">{typeof v === 'string' ? v : JSON.stringify(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 原子类型直接显示
  return <div className="text-sm text-gray-900">{String(data)}</div>;
}

export default TableRenderer;


