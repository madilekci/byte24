"use client";

import { DataTableColumnHeader } from "@byte24/ui";
import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@ui/src/components/status-badge";
import dayjs from "dayjs";
import { SquareChevronRight } from "lucide-react";
import Link from "next/link";
import { FullCompany } from "../types";

interface IGetProjectsColumnsProps {}

export const getColumns =
  ({}: IGetProjectsColumnsProps): ColumnDef<FullCompany>[] => {
    return [
      {
        id: "id",
        accessorKey: "id",
        accessorFn: (row) => row?.id,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nr." />
        ),
        enableSorting: true,
        size: 20,
        meta: {
          columnVisibilityLabel: "Nr.",
        },
      },
      {
        id: "name",
        accessorKey: "name",
        accessorFn: (row) => row?.name,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Naam" />
        ),
        enableSorting: true,
        size: 100,
        meta: {
          columnVisibilityLabel: "Naam",
        },
      },
      {
        id: "country",
        accessorKey: "country",
        accessorFn: (row) => row?.country?.name,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Land" />
        ),
        enableSorting: true,
        size: 100,
        meta: {
          columnVisibilityLabel: "Land",
        },
      },
      {
        id: "city",
        accessorKey: "city",
        accessorFn: (row) => row?.city,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Stad" />
        ),
        enableSorting: true,
        size: 100,
        meta: {
          columnVisibilityLabel: "Stad",
        },
      },
      {
        id: "companyStatus",
        enableHiding: false,
        meta: {
          columnVisibilityLabel: "Status",
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const rowDetail = row.original;

          return (
            <StatusBadge color={rowDetail?.currentStatus?.status?.color}>
              {rowDetail?.currentStatus?.status?.name}
            </StatusBadge>
          );
        },
      },
      {
        id: "companyType",
        enableHiding: false,
        meta: {
          columnVisibilityLabel: "Type",
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => {
          const rowDetail = row.original;

          return (
            <StatusBadge color={rowDetail.type.color}>
              {rowDetail.type.name}
            </StatusBadge>
          );
        },
      },

      {
        id: "createdAt",
        accessorKey: "createdAt",
        accessorFn: (row) => dayjs(row?.createdAt).format("DD-MM-YYYY, HH:mm"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Aangemaakt op" />
        ),
        enableSorting: true,
        meta: {
          columnVisibilityLabel: "Aangemaakt op",
        },
      },
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        accessorFn: (row) =>
          row?.updatedAt
            ? dayjs(row?.updatedAt).format("DD-MM-YYYY, HH:mm")
            : "-",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Bijgewerkt op" />
        ),
        enableSorting: true,
        meta: {
          columnVisibilityLabel: "Bijgewerkt op",
        },
      },
      {
        size: 20,
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const rowDetail = row.original;

          return (
            <>
              <div className="float-right">
                <Link href={`/companies/${rowDetail.id}`}>
                  <SquareChevronRight className="mr-1 h-5 w-5 text-primary hover:text-accent" />
                </Link>
              </div>
            </>
          );
        },
      },
    ];
  };
