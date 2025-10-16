import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@byte24/ui/components/card";
import { Separator } from "@byte24/ui/components/separator";
import dayjs from "dayjs";
import type { LucideIcon } from "lucide-react";
import React from "react";

export interface BaseEvent {
  id: string | number;
  key: string;
  title: string;
  description?: string | null;
  createdAt?: Date | string | null;
  actionType?: string;
  [key: string]: any; // Allow additional properties
}

export interface EventsCardProps<T extends BaseEvent> {
  /**
   * Array of events to display
   */
  events: T[];

  /**
   * Whether the data is currently loading
   * @default false
   */
  isLoading?: boolean;

  /**
   * Title of the card
   * @default 'Events'
   */
  title?: string;

  /**
   * Description of the card
   * @default 'De 10 laatste acties'
   */
  description?: string;

  /**
   * Additional class name for the card
   */
  className?: string;

  /**
   * Action type to filter (useful when a mix of STANDARD and CUSTOM events)
   */
  filterActionType?: string;

  /**
   * Date format for the timestamps
   * @default 'DD/MM/YYYY H:mm'
   */
  dateFormat?: string;

  /**
   * Custom render function for an event
   */
  renderEvent?: (event: T) => React.ReactNode;

  /**
   * Function to translate action keys to icons and colors
   */
  actionTranslate?: (key: string) => {
    icon: LucideIcon | null;
    color: string;
  };
}

export function EventsCard<T extends BaseEvent>({
  events = [],
  isLoading = false,
  title = "Acties",
  description = "De 10 laatste acties",
  className = "",
  filterActionType = "STANDARD",
  dateFormat = "DD/MM/YYYY H:mm",
  renderEvent,
  actionTranslate,
}: EventsCardProps<T>) {
  // Filter events by actions type if a filter is specified
  const filteredEvents = events;

  // Default translation function if none provided
  const getIconAndColor = (key: string) => {
    if (!actionTranslate) {
      return { icon: null, color: "text-gray-500" };
    }
    return actionTranslate(key);
  };

  return (
    <Card className={`max-h-[600px] max-w-[350px] overflow-auto ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-2">
        <Separator className="mb-4" />

        {isLoading && <p>Loading...</p>}
        {filteredEvents.length === 0 && <p>Geen acties gevonden</p>}

        {renderEvent
          ? filteredEvents.map((event) => renderEvent(event))
          : filteredEvents.map((event) => {
              // Get icon and color from action translation
              const { icon: Icon, color } = getIconAndColor(event.key);

              return (
                <div key={event.id} className="mb-3 flex flex-row">
                  {/* Icon wrapper */}
                  <div className="mr-2 flex flex-col items-center">
                    {Icon !== null && (
                      <Icon size={40} className={`${color} z-10 mb-2`} />
                    )}
                    <Separator orientation="vertical" className="z-0 h-[60%]" />
                  </div>

                  {/* Info wrapper */}
                  <div className="mt-1 mb-4 flex flex-col px-1 pb-2">
                    <p className="py-1 font-semibold text-sm">{event.title}</p>
                    {event.description && (
                      <p className="py-1 text-gray-500 text-sm">
                        {event.description}
                      </p>
                    )}
                    {event.createdAt && (
                      <p className="py-1 font-bold text-gray-500 text-sm">
                        {dayjs(event.createdAt).format(dateFormat)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
      </CardContent>
    </Card>
  );
}

export default EventsCard;
