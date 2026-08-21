import { useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, Filter, Plus, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "./StatusBadge";

import { getLocalizedText } from "@/lib/utils";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
};

export function DataPage<T extends Record<string, any>>({
  title,
  description,
  data,
  columns,
  statusKey = "status",
  filters = [],
  kpis,
  primaryAction = "Add new",
  rowHref,
}: {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  statusKey?: string;
  filters?: string[];
  kpis?: { label: string; value: string; hint?: string }[];
  primaryAction?: string;
  rowHref?: (row: T) => string | undefined;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchQ = q
        ? Object.values(row).some((v) =>
            getLocalizedText(v).toLowerCase().includes(q.toLowerCase())
          )
        : true;
      const rowStatus = getLocalizedText(row[statusKey]).toLowerCase();
      const matchF = filter === "all" ? true : rowStatus === filter.toLowerCase();
      return matchQ && matchF;
    });
  }, [data, q, filter, statusKey]);

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm" className="gap-1.5 bg-gradient-to-br from-primary to-primary-glow">
              <Plus className="h-4 w-4" /> {primaryAction}
            </Button>
          </>
        }
      />

      {kpis && kpis.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((k) => (
            <Card key={k.label} className="p-4 rounded-2xl">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                {k.label}
              </div>
              <div className="mt-1 text-2xl font-bold">{k.value}</div>
              {k.hint && <div className="text-xs text-muted-foreground mt-1">{k.hint}</div>}
            </Card>
          ))}
        </div>
      )}

      <Card className="rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 border-b sm:flex sm:flex-wrap">
          <div className="relative min-w-0 sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0 sm:ml-auto">
            {filters.length > 0 && (
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-1.5" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {filters.map((f) => (
                    <SelectItem key={f} value={f.toLowerCase()}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                {columns.map((c) => (
                  <TableHead key={String(c.key)} className={c.className}>
                    {c.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row, i) => {
                const href = rowHref?.(row);
                return (
                  <TableRow
                    key={i}
                    className={href ? "cursor-pointer" : ""}
                    onClick={href ? (e) => {
                      const target = e.target as HTMLElement;
                      if (target.closest("a,button,input,select,[role=button]")) return;
                      navigate({ to: href });
                    } : undefined}
                  >
                    {columns.map((c) => (
                      <TableCell key={String(c.key)} className={c.className}>
                        {c.render
                          ? c.render(row)
                          : c.key === statusKey
                          ? <StatusBadge status={getLocalizedText(row[c.key])} />
                          : getLocalizedText(row[c.key as keyof T])}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center text-muted-foreground py-10"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
          <span>
            Showing <b className="text-foreground">{filtered.length}</b> of{" "}
            <b className="text-foreground">{data.length}</b>
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
