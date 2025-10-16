'use client';
import { ISidebarGroup } from '@byte24/ui/layout';
import { BuildingIcon, Component } from 'lucide-react';

export const SIDEBAR_GROUPS: ISidebarGroup<any>[] = [
  {
    title: '',

    items: [
      {
        title: 'Overzicht',
        icon: Component,
        href: '/',
      },
    ],
  },
  {
    title: "Pagina's",
    items: [
      {
        href: '/companies',
        title: 'Bedrijven',
        icon: BuildingIcon,
      },
    ],
  },
];
