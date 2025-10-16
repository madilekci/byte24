import { Card, CardContent, CardHeader, CardTitle } from '@byte24/ui/components/card';
import { Separator } from '@byte24/ui/components/separator';
import dayjs from 'dayjs';
import React from 'react';

interface User {
  id: string | number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  [key: string]: any; // Allow additional properties
}

export interface HistoryCardProps {
  /**
   * Title of the card
   * @default 'History'
   */
  title?: string;

  /**
   * Creator user object
   */
  createdBy?: User | null;

  /**
   * Creation date
   */
  createdAt?: Date | string | null;

  /**
   * Last updater user object
   */
  updatedBy?: User | null;

  /**
   * Last update date
   */
  updatedAt?: Date | string | null;

  /**
   * Date format for the timestamps
   * @default 'DD/MM/YYYY H:mm'
   */
  dateFormat?: string;

  /**
   * Additional class name for the card
   */
  className?: string;

  /**
   * Additional content to display in the card
   */
  children?: React.ReactNode;
}

export function HistoryCard({
  title = 'History',
  createdBy,
  createdAt,
  updatedBy,
  updatedAt,
  dateFormat = 'DD/MM/YYYY H:mm',
  className = '',
  children,
}: HistoryCardProps) {
  // Helper function to format name
  const formatName = (user?: User | null) => {
    if (!user) return 'Unknown';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return firstName || lastName ? `${firstName} ${lastName}`.trim() : user.email || 'Unknown';
  };

  const isUpdated = updatedAt && updatedBy;

  return (
    <Card className={`min-w-[350px] ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Separator className='mb-4' />

        {/* Created information */}
        {createdBy && createdAt && (
          <div className='flex flex-col py-2'>
            <p className='font-medium text-sm'>Created by {formatName(createdBy)}</p>
            <p className='text-gray-500 text-sm'>{dayjs(createdAt).format(dateFormat)}</p>
          </div>
        )}

        {/* Updated information */}
        {isUpdated && (
          <div className='flex flex-col py-2'>
            <p className='font-medium text-sm'>Updated by {formatName(updatedBy)}</p>
            <p className='text-gray-500 text-sm'>{dayjs(updatedAt).format(dateFormat)}</p>
          </div>
        )}

        {/* Additional content */}
        {children && (
          <>
            <Separator className='my-4' />
            {children}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default HistoryCard;
