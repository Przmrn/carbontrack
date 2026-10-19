// Table primitive: edge-to-edge data table, 1px bottom rules, numbers right.
import type { ReactNode, TableHTMLAttributes } from "react";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  caption?: string;
  children: ReactNode;
}

export default function Table({ caption, children, className, ...rest }: TableProps) {
  return (
    <div className="cm-table-wrap">
      <table className={className === undefined ? "cm-table" : `cm-table ${className}`} {...rest}>
        {caption === undefined ? null : (
          <caption className="cm-table-caption t-label-caps">{caption}</caption>
        )}
        {children}
      </table>
    </div>
  );
}