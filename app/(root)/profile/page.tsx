import { SearchParamProps } from "@/@types";
import Collection from "@/components/Collection"
import { Button } from "@/components/ui/button"
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { auth } from "@clerk/nextjs";
import Link from "next/link"

const Profile = async ({ searchParams }: SearchParamProps) => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;

    const orders = await getOrdersByUser({userId, page: ordersPage})

    const orderedEvents = orders?.data.map((order: IOrder) => order.event) || []
    
    const organizedEvents = await getEventsByUser({userId, page: eventsPage})

    return (
    <>
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="flex items-center wrapper justify-center md:justify-between">
                <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
                <Button asChild>
                    <Link href="/#events" className="button hidden sm:flex">Explore More Events</Link>
                </Button>
            </div>
        </section>

        <section className="wrapper my-8">
            <Collection data={orderedEvents} emptyStateSubtext="No worries - plenty of exciting events to explore!" emptyTitle="No event tickets purchased yet." collectionType="My_Tickets" limit={3} page={ordersPage} urlParamName="ordersPage" totalPages={orders?.totalPages} />
        </section>

        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="flex items-center wrapper justify-center md:justify-between">
                <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
                <Button asChild>
                    <Link href="/events/create" className="button hidden sm:flex">Create new event</Link>
                </Button>
            </div>
        </section>

        <section className="wrapper my-8">
            <Collection data={organizedEvents?.data} emptyStateSubtext="Create some events now!" emptyTitle="No events have been created." collectionType="Events_Organized" limit={6} page={eventsPage} urlParamName="eventsPage" totalPages={organizedEvents?.totalPages} />
        </section>
    </>
    )   
}

export default Profile