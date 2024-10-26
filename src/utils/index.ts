import titles from './titles';
import environment from '@/config/environment';
import { UploadFile } from 'antd';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
   ApiRoutesWithoutPrefix,
   AppCookies,
   DATE_FORMAT,
   MERCURE_NOTIFICATION_TYPE,
   mercureUrl,
} from '@/config/constant';

import localizedFormat from 'dayjs/plugin/localizedFormat'; // Import the localizedFormat plugin
import { defaultLocale, Locale } from '@/config/language';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCallback } from 'react';
import dayjs from '@/utils/dayjs';
import { ConfigType } from 'dayjs';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const isLocationMatch = (targetLocation: string, locationName: string) => {
   return (
      locationName === targetLocation || locationName.startsWith(`${targetLocation}/`)
   );
};

export const RGBToHex = (r: number, g: number, b: number) => {
   const componentToHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
   };

   const redHex = componentToHex(r);
   const greenHex = componentToHex(g);
   const blueHex = componentToHex(b);

   return '#' + redHex + greenHex + blueHex;
};

export function hslToHex(hsl: string) {
   // Remove "hsla(" and ")" from the HSL string
   hsl = hsl.replace('hsla(', '').replace(')', '');

   // Split the HSL string into an array of H, S, and L values
   const [h, s, l] = hsl.split(' ').map((value: string) => {
      if (value.endsWith('%')) {
         // Remove the "%" sign and parse as a float
         return parseFloat(value.slice(0, -1));
      } else {
         // Parse as an integer
         return parseInt(value);
      }
   });

   // Function to convert HSL to RGB
   function hslToRgb(h: number, s: number, l: number) {
      h /= 360;
      s /= 100;
      l /= 100;

      let r, g, b;

      if (s === 0) {
         r = g = b = l;
      } else {
         const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
         };

         const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
         const p = 2 * l - q;
         r = hue2rgb(p, q, h + 1 / 3);
         g = hue2rgb(p, q, h);
         b = hue2rgb(p, q, h - 1 / 3);
      }

      // Convert RGB values to integers
      const rInt = Math.round(r * 255);
      const gInt = Math.round(g * 255);
      const bInt = Math.round(b * 255);

      // Convert RGB values to a hex color code
      const rgbToHex = (value: number) => {
         const hex = value.toString(16);
         return hex.length === 1 ? '0' + hex : hex;
      };

      return `#${rgbToHex(rInt)}${rgbToHex(gInt)}${rgbToHex(bInt)}`;
   }

   // Call the hslToRgb function and return the hex color code
   return hslToRgb(h, s, l);
}

export const retrieveAuthTokenName = (type: 'access' | 'refresh') => {
   if (type === 'access') {
      return `${AppCookies.ACCESS_TOKEN}`;
   } else {
      return `${AppCookies.REFRESH_TOKEN}`;
   }
};

export const hexToRGB = (hex: string, alpha: number) => {
   var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

   if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
   } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
   }
};

export const formatTime = (time: number | string | Date) => {
   if (!time) return '';

   const date = new Date(time);
   const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Add this option to display AM/PM
   });

   return formattedTime;
};

// object check
export function isObjectNotEmpty(obj: object) {
   if (typeof obj !== 'object' || obj === null) {
      return false;
   }
   return Object.keys(obj).length > 0;
}

// random word
export function getWords(inputString: string) {
   // Remove spaces from the input string
   const stringWithoutSpaces = inputString.replace(/\s/g, '');

   // Extract the first three characters
   return stringWithoutSpaces.substring(0, 3);
}

export const normalizeFile = (e: any) => {
   if (Array.isArray(e)) {
      return e;
   }
   return e && e.fileList;
};

export function cleanObj(obj: any) {
   for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
         delete obj[propName];
      }
   }
   return obj;
}

export const objectToArray = (obj: Object) =>
   Object.entries(obj).map(([key, value]) => ({
      key,
      value,
   }));

/**
 * Converts an `UploadFile` object to a native `File` object.
 * @param uploadFile - The `UploadFile` object from `antd`.
 * @returns A `File` object.
 */
export const convertUploadFileToFile = (uploadFile: UploadFile): File | undefined => {
   const { uid, name, type, size, originFileObj } = uploadFile;

   if (!originFileObj) {
      return undefined;
   }

   // Creating a new File object
   return new File([originFileObj as Blob], name, {
      type,
      lastModified: new Date().getTime(),
   });
};

export const primaryColor: string = environment?.primaryColor || '#060485';

export { titles };

export const extractIntegerFromIRI = (iri: string): number | null => {
   // Regular expression to find a single number in the IRI
   const iriRegex = /\/(\d+)\//;
   const match = iri.match(iriRegex);
   if (!match) return null;

   // Extracted substring containing the number
   const extractedNumber = match[1];

   // Convert the extracted substring to an integer
   return parseInt(extractedNumber, 10);
};

// Function to check if a string is a valid UUID
const isUUID = (str: string): boolean => {
   const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/i;

   return uuidRegex.test(str);
};

export const generateIRI = (
   baseString: ApiRoutesWithoutPrefix,
   id: number | string | object,
   prefix: string = '/api',
): string | object => {
   if (typeof id === 'object') {
      return id;
   }
   let lastPart = '';
   // If the id is a string, try to extract the number from it
   if (typeof id === 'string') {
      // Extract the last part of the path
      const parts = id.split('/');
      lastPart = parts[parts.length - 1];

      // Check if it matches UUID format
      if (isUUID(lastPart)) {
         lastPart = lastPart;
      } else {
         const extractedNumber = parseInt(id.split('/').pop() || '');
         if (!isNaN(extractedNumber)) {
            // If a valid number is extracted from the string, use it as the ID
            lastPart = extractedNumber as unknown as string;
         }
      }
   }
   if (typeof id === 'number') {
      lastPart = id as unknown as string;
   }
   // Remove trailing slashes from the base string
   const trimmedBaseString = baseString.replace(/\/+$/, '');
   // Append the ID to the base string to create the IRI
   const iri = `${prefix}${trimmedBaseString}/${lastPart}`;
   return iri;
};

export const capitalizeFirstLetter = (word?: string) => {
   if (typeof word !== 'string') {
      return '';
   }
   return word.charAt(0).toUpperCase() + word.slice(1);
};
export const formatDate = (
   date: ConfigType,
   locale: Locale = defaultLocale,
   withHour = true,
) => {
   // This function should be used for converting ISO formatted dates to
   // the 'DD/MM/YYYY' or 'DD/MM/YYYY hh:mm:ss' format used everywhere on the project.
   if (!date || !dayjs(date).isValid()) {
      return '-';
   }

   const formatedDate = dayjs(date)
      .locale(locale)
      .format(withHour ? DATE_FORMAT.DATETIME : DATE_FORMAT.DATE);
   return locale == defaultLocale ? capitalizeFirstLetter(formatedDate) : formatedDate;
};

export const parseDate = (date: string, locale: Locale = defaultLocale) => {
   let parsedDate = dayjs(date);
   parsedDate = parsedDate.locale(locale);

   return parsedDate.isValid() ? parsedDate : dayjs(date);
};

type MercureNotification<T> = {
   type: string;
   data: T;
};

export const useMercureSubscriber = <T extends { id: string }>() => {
   return useCallback(
      (
         apiRoutesWithoutPrefix: any, // Replace 'any' with the correct type for 'apiRoutesWithoutPrefix'
         setData: React.Dispatch<React.SetStateAction<T[]>>,
      ) => {
         const url = new URL(`${mercureUrl}/.well-known/mercure`);
         url.searchParams.append('topic', getApiRoutesWithPrefix(apiRoutesWithoutPrefix));
         const eventSource = new EventSource(url);

         eventSource.onmessage = (e: MessageEvent) => {
            if (e.data) {
               const notification: MercureNotification<T> = JSON.parse(e.data);
               if (notification.data?.id) {
                  setData((data: T[]) => {
                     if (notification.type === MERCURE_NOTIFICATION_TYPE.NEW) {
                        const find = data?.find(
                           (item) => item.id === notification.data?.id,
                        );
                        if (!find) {
                           return [notification.data, ...data];
                        }
                     } else if (notification.type === MERCURE_NOTIFICATION_TYPE.UPDATE) {
                        return data.map((item) => {
                           if (item.id === notification.data.id) {
                              return notification.data;
                           }
                           return item;
                        });
                     } else if (notification.type === MERCURE_NOTIFICATION_TYPE.DELETE) {
                        return data.filter((item) => item.id !== notification.data.id);
                     }
                     return data;
                  });
               }
            }
         };

         return () => {
            eventSource.close();
         };
      },
      [],
   );
};

export const getReservationStatusLabel = (status: string): string => {
   switch (status) {
      case 'new':
         return 'Nouveau';
      case 'planned':
         return 'Planifié';
      case 'modified':
         return 'Modifié';
      case 'sent':
         return 'Envoyé';
      case 'confirmed':
         return 'Confirmé';
      case 'completed':
         return 'Terminé';
      case 'draft':
         return 'Brouillon';
      case 'canceled':
         return 'Annulé';
      case 'acknowledged':
         return 'Accusé de réception';
      default:
         return 'Statut inconnu';
   }
};

export const getApiRoutesWithPrefix = (prefix: ApiRoutesWithoutPrefix) => {
   return '/api' + prefix;
};
export * from '@/utils/useGetUserByToken';
export * from './getErrorMessage';
export * from './truncate';
export * from './generateUrl';
