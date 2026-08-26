import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button/Button";

export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[var(--brand-border)] bg-white shadow-2xs">
      <table
        className={cn("w-full text-left border-collapse text-sm", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, children, ...props }) => {
  return (
    <thead
      className={cn("bg-slate-50/80 border-b border-[var(--brand-border)] text-xs uppercase font-semibold text-[var(--brand-muted)] tracking-wider", className)}
      {...props}
    >
      {children}
    </thead>
  );
};

export const TableBody: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, children, ...props }) => {
  return (
    <tbody
      className={cn("divide-y divide-slate-100 text-[var(--brand-text)]", className)}
      {...props}
    >
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <tr
      className={cn(
        "hover:bg-slate-50/60 transition-colors duration-100",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
};

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  onSort?: () => void;
}

export const TableHead: React.FC<TableHeadProps> = ({
  sortable = false,
  onSort,
  className,
  children,
  ...props
}) => {
  return (
    <th
      className={cn("px-4 py-3.5 whitespace-nowrap", sortable ? "cursor-pointer select-none hover:text-[var(--brand-primary)]" : "", className)}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <span>{children}</span>
        {sortable && <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />}
      </div>
    </th>
  );
};

export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ className, children, ...props }) => {
  return (
    <td
      className={cn("px-4 py-3.5 text-slate-700 whitespace-nowrap", className)}
      {...props}
    >
      {children}
    </td>
  );
};

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  onPageChange,
  className,
}) => {
  const startRecord = Math.min((currentPage - 1) * pageSize + 1, totalRecords);
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-[var(--brand-border)] bg-slate-50/50 text-xs text-[var(--brand-muted)]",
        className
      )}
    >
      <div>
        Showing <span className="font-semibold text-slate-900">{startRecord}</span> to{" "}
        <span className="font-semibold text-slate-900">{endRecord}</span> of{" "}
        <span className="font-semibold text-slate-900">{totalRecords}</span> entries
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Previous
        </Button>
        <span className="px-2 font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          rightIcon={<ChevronRight className="w-4 h-4" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export interface TableFilterBarProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const TableFilterBar: React.FC<TableFilterBarProps> = ({
  children,
  actions,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white border border-[var(--brand-border)] rounded-xl mb-4 shadow-2xs",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2.5 flex-1">{children}</div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
};
