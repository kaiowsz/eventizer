import IEvent from "@/@types/IEvent"
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirmation from "./DeleteConfirmation";

interface CardProps {
  event: IEvent;
  hasOrderLink: boolean;
  hidePrice: boolean;
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === (event.organizer._id).toString()


  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link href={`/events/${event._id}`} style={{backgroundImage: `url(${event.imageUrl})`}} className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500" />

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex rounded-xl bg-white p-3 shadow-sm transition-all flex-col gap-4">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="Edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <Link href={`/events/${event._id}`} className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">

        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-600">{event.isFree ? "FREE" : `$${event.price}`}</span>

            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 text-grey-500">{formatDateTime(event.startDateTime).dateTime}</p>

        <p className="p-medium-16 md:p-medium-20 lime-clamp-2 flex-1 text-black">{event.title}</p>          

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">{event.organizer.firstName} {event.organizer.lastName}</p>

          {hasOrderLink && (
            <Link href={`/orders/?eventId=${event._id}`}>
              <p className="text-primary-500">Order Details</p>
              <Image src="/assets/icons/arrow.svg" alt="Search" width={10} height={10} />
            </Link>
          )}
        </div>

      </Link>
    </div>
  )
}

export default Card