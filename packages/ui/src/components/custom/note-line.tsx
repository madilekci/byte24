import { Card, CardFooter, CardHeader } from '@byte24/ui';
import { Button } from '@byte24/ui/components/button';
import dayjs from 'dayjs';
import { Clock, Trash, User, X } from 'lucide-react';
import React from 'react';

export interface BaseNote {
  id: string | number;
  title?: string;
  content: string;
  createdAt?: Date | string | null;
  createdBy?: {
    firstName?: string;
    lastName?: string;
  };
  [key: string]: any; // Allow additional properties
}

export interface NoteLineProps<T extends BaseNote> {
  /**
   * The note data to display
   */
  note: T;

  /**
   * Callback function when edit button is clicked
   */
  onEdit?: (note: T) => void;

  /**
   * Callback function when delete button is clicked
   */
  onDelete?: (note: T) => void;

  /**
   * Callback function when cancel button is clicked
   */
  onCancelEdit?: (note: T) => void;

  /**
   * Reference for infinite scrolling
   */
  nextRef?: ((node?: Element | null) => void) | undefined;

  /**
   * Whether the note is being edited
   */
  beingEdited?: boolean;

  /**
   * Show or hide action buttons
   * @default true
   */
  showActions?: boolean;

  /**
   * Show or hide footer with creation info
   * @default true
   */
  showFooter?: boolean;

  /**
   * Additional class name for the card
   */
  className?: string;

  /**
   * Custom render function for note content
   */
  renderContent?: (note: T) => React.ReactNode;
}

export function NoteLine<T extends BaseNote>({
  note,
  nextRef,
  onEdit,
  onDelete,
  onCancelEdit,
  beingEdited = false,
  showActions = true,
  showFooter = true,
  className = '',
  renderContent,
}: NoteLineProps<T>) {
  return (
    <Card className={`group mr-4 mb-4 transition-all hover:shadow-md ${className}`} ref={nextRef}>
      <CardHeader className='flex flex-row items-start justify-between p-4'>
        {beingEdited === false ? (
          <div className='flex flex-col space-y-2'>
            {note.title && <h3 className='font-bold text-md text-slate-700'>{note.title}</h3>}

            {/* Render custom content if provided, otherwise show default content */}
            {renderContent ? (
              renderContent(note)
            ) : (
              <p
                className='text-card-foreground text-sm'
                dangerouslySetInnerHTML={{
                  __html: note.content?.replace(/\n/g, '<br />'),
                }}
              />
            )}
          </div>
        ) : (
          <div className='text-muted-foreground text-sm'>
            Note is being edited
            <br />
            <div
              className='flex cursor-pointer items-center space-x-2 text-blue-500'
              onClick={() => onCancelEdit?.(note)}
            >
              <X size={15} />
              <span className='text-xs'>Cancel</span>
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && beingEdited === false && (onEdit || onDelete) && (
          <div className='flex space-x-1'>
            {/* NOTE: ben removed due to the mentions component failing */}
            {/* {onEdit && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onEdit(note)}
                className='opacity-70 hover:opacity-100'
              >
                <Pencil size={18} className='text-slate-600' />
              </Button>
            )} */}
            {onDelete && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onDelete(note)}
                className='opacity-70 hover:opacity-100'
              >
                <Trash size={18} className='text-red-500' />
              </Button>
            )}
          </div>
        )}
      </CardHeader>

      {showFooter && note.createdAt && (
        <CardFooter className='bg-muted px-4 py-2 text-xs'>
          <div className='flex items-center space-x-3'>
            <div className='flex items-center'>
              <Clock size={12} className='mr-1' />
              <span>{dayjs(note.createdAt).format('DD-MM-YYYY, HH:mm')}</span>
            </div>

            {note.createdBy && (
              <div className='flex items-center'>
                <User size={12} className='mr-1' />
                <span>
                  {note.createdBy?.firstName} {note.createdBy?.lastName}
                </span>
              </div>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default NoteLine;
