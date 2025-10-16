import { Card, CardContent, CardHeader } from '@byte24/ui';
import { Button } from '@byte24/ui/components/button';
import { ArrowDownToLine, File, Pencil, Trash } from 'lucide-react';
import React from 'react';

export interface BaseDocument {
  id: string | number;
  name: string;
  key: string;
  extension?: string;
  mimeType?: string;
  [key: string]: any; // Allow additional properties
}

export interface DocumentLineProps<T extends BaseDocument> {
  /**
   * The document data to display
   */
  document: T;

  /**
   * Callback function when edit button is clicked
   */
  onEdit?: (document: T) => void;

  /**
   * Callback function when delete button is clicked
   */
  onDelete?: (document: T) => void;

  /**
   * Reference for infinite scrolling
   */
  nextRef?: ((node?: Element | null) => void) | undefined;

  /**
   * Show or hide action buttons
   * @default true
   */
  showActions?: boolean;

  /**
   * Additional class name for the card
   */
  className?: string;

  /**
   * Custom render function for document icon
   */
  renderIcon?: (document: T) => React.ReactNode;

  /**
   * Cloud front URL for document downloads
   * @default process.env.NEXT_PUBLIC_CLOUDFRONT_URL
   */
  cloudFrontUrl?: string;
}

export function DocumentLine<T extends BaseDocument>({
  document,
  nextRef,
  onEdit,
  onDelete,
  showActions = true,
  className = '',
  renderIcon,
  cloudFrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL,
}: DocumentLineProps<T>) {
  const documentDownloadUrl = `${cloudFrontUrl}documents/${document.key}`;

  return (
    <Card
      className={`group mr-4 min-w-[300px] px-3 py-1 transition-all hover:shadow-md ${className}`}
      ref={nextRef}
    >
      <CardHeader className='relative flex flex-col justify-between p-0'>
        {/* actions */}
        {showActions && (onEdit || onDelete) && (
          <div className='absolute top-0 right-3 w-fit'>
            {onEdit && (
              <Button
                className='mr-3 p-0 hover:bg-transparent'
                variant='transparent'
                onClick={() => onEdit(document)}
              >
                <Pencil size={20} className='text-slate-600' />
              </Button>
            )}
            <Button className='mr-3 p-0 hover:bg-transparent' variant='transparent'>
              <a
                href={documentDownloadUrl}
                download={`${document?.name}${document?.extension ? '.' + document?.extension : ''}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <ArrowDownToLine size={20} className='text-slate-600' />
              </a>
            </Button>
            {onDelete && (
              <Button
                className='p-0 hover:bg-transparent'
                variant='transparent'
                onClick={() => onDelete(document)}
              >
                <Trash size={20} className='text-slate-600' />
              </Button>
            )}
          </div>
        )}

        <h1 className='w-full overflow-hidden text-ellipsis text-nowrap pt-5 font-bold text-lg'>
          {document?.name}
        </h1>
      </CardHeader>
      <CardContent className='flex min-h-[200px] items-center justify-center rounded-br-md rounded-bl-md p-0'>
        {renderIcon ? renderIcon(document) : <File size={80} className='text-slate-500' />}
      </CardContent>
    </Card>
  );
}

export default DocumentLine;
