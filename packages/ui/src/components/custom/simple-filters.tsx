import { useState } from "react";
import { DataTableFilter } from "@byte24/ui/components/data-table";

interface DataTableFilterProps {
  title?: string;
  options: {
    name: string;
    id: number;
    key?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  type?: "date" | "select" | "conditional";
  //   onFilterChange?: (filterId: string | number, values: any[]) => void;
  //   filterValue?: (string | number)[];
  filterId?: string | number;
  keyName: string;
  field?: {
    type: "text" | "number" | "date";
    prefix: string;
  };
}

interface SimpleFiltersProps {
  filters: DataTableFilterProps[];
  values: { [key: string]: any };
  onChange: (values: { [key: string]: any }) => void;
}

export const SimpleFilters = ({
  filters,
  values,
  onChange,
}: SimpleFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <DataTableFilter
          key={index}
          title={filter.title}
          options={filter?.options || []}
          type={filter?.type}
          onFilterChange={(filterId, newValues) => {
            const key = filter.keyName || filterId;
            onChange?.({
              ...values,
              [key]: newValues,
            });
          }}
          filterValue={values?.[filter.keyName]}
          filterId={filter.keyName}
          field={filter.field}
        />
      ))}
    </div>
  );
};
