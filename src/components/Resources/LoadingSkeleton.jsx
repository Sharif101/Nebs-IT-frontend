import React from "react";

export default function LoadingSkeleton({ rows = 5, cols = 5, widths = [] }) {
  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(cols)].map((_, colIndex) => (
            <td key={colIndex} className="py-3 px-4">
              <div
                className="h-4 bg-gray-200 rounded animate-pulse"
                style={{
                  width: widths[colIndex] || "100px",
                }}
              ></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
