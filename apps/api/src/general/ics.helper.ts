import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateICSFileDto } from "./dto/create-ics.dto";
import ical, {
  ICalCalendarMethod,
  ICalEventData,
  ICalEventStatus,
} from "ical-generator";
import { v4 as uuidv4 } from "uuid";
import { UpdateICSFileDto } from "./dto/update-ics.dto";
import { ICSFile } from "@/types/ics";
import { CancelICSFileDto } from "./dto/cancel-ics.dto";


@Injectable()
export class ICSHelper {
  constructor(private prisma: PrismaService) {}

  private getHeaders(method: ICalCalendarMethod, fileName: string) {
    return {
      contentType: `text/calendar; method=${method}; charset=UTF-8`,
      contentDisposition: `attachment; filename="${fileName?.endsWith('.ics') ? fileName : `${fileName}.ics`}"`,
      headers: {
        'Content-Class': 'urn:content-classes:calendarmessage',
        'Content-Transfer-Encoding': '8bit',
      },
    }
  }

  private defaultOrganizer = {
    name: process.env.MAIL_FROM_NAME,
    email: process.env.MAIL_FROM_ADDRESS,
  }

  createICSFile(data: CreateICSFileDto): ICSFile {
    const {
      summary,
      description,
      location,
      url,
      start,
      end,
      organizer,
      attendees,
    } = data;

    const calendar = ical({
      name: process.env.MAIL_FROM_NAME,
      method: ICalCalendarMethod.REQUEST,
    });

    const icsData: ICalEventData = {
      summary,
      description,
      organizer: organizer ?? this.defaultOrganizer,
      attendees,
      start,
      end,
      url,
      location,
      id: `${uuidv4()}_${process.env.APP_NAME}`,
    };

    const event = calendar.createEvent(icsData);

    const filename = `invite-${uuidv4()}_${process.env.APP_NAME}.ics`;

    return {
      content: calendar.toString(),
      id: event?.id(),
      filename,
      ...this.getHeaders(ICalCalendarMethod.REQUEST, filename),
    };
  }

  updateICSFile(id: string, data: UpdateICSFileDto) {
    const {
      summary,
      description,
      location,
      url,
      organizer,
      attendees,
      start,
      end,
      sequence,
    } = data;

    const calendar = ical({
      name: process.env.MAIL_FROM_NAME,
      method: ICalCalendarMethod.REQUEST,
    });

    const icsData: ICalEventData = {
      summary,
      description,
      organizer: organizer ?? this.defaultOrganizer,
      attendees,
      start,
      end,
      url,
      location,
      id,
      sequence: sequence ?? 1,
      lastModified: new Date(),
    };

    const event = calendar.createEvent(icsData);

    const filename = `update-${id}.ics`;

    return {
      content: calendar.toString(),
      id: event?.id(),
      filename,
      ...this.getHeaders(ICalCalendarMethod.REQUEST, filename),
    };
  }

  cancelICSFile(id: string, data: CancelICSFileDto) {
    const { summary, sequence } = data;

    const calendar = ical({
      name: process.env.MAIL_FROM_NAME,
      method: ICalCalendarMethod.CANCEL, 
    });

    const icsData: ICalEventData = {
      id, 
      summary,
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      status: ICalEventStatus.CANCELLED,
      sequence,
      lastModified: new Date(),
    }

    const event = calendar.createEvent(icsData);

    const filename = `cancel-${id}.ics`;

    return {
      content: calendar.toString(),
      id: event?.id(),
      filename,
      ...this.getHeaders(ICalCalendarMethod.CANCEL, filename),
    };
  }
}
