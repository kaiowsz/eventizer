import { RemoveUrlQueryParams, UrlQueryParams } from "@/@types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateString: Date) {

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // ('Mon')
    month: 'short', // (e.g., 'Oct')
    day: 'numeric', // (e.g., '25')
    hour: 'numeric', // (e.g., '8')
    minute: 'numeric', // (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }
  
  const formattedDateTime: string = new Date(dateString).toLocaleDateString("en-US", dateTimeOptions);
  const formattedDate: string = new Date(dateString).toLocaleDateString("en-US", dateOptions);
  const formattedTime: string = new Date(dateString).toLocaleDateString("en-US", timeOptions);

  return {
    formattedDateTime,
    formattedDate,
    formattedTime
  }
}

export function convertFileToUrl(file: File) {
  return URL.createObjectURL(file);
}

export function formatPrice(price: string) {
  const amount = parseFloat(price);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount)

  return formattedPrice;
}

export function fromUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  }, { skipNull: true });
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  }, { skipNull: true })
}

export function handleError(error: unknown) {
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
}