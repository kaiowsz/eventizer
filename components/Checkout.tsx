import IEvent from "@/@types/IEvent";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js"
import { useEffect } from "react";
import { checkoutOrder } from "@/lib/actions/order.actions";

interface CheckoutProps {
  event: IEvent;
  userId: string;
}

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Checkout = ({ event, userId }: CheckoutProps) => {
  
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if(query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.")
    }

    if(query.get("canceled")) {
      console.log("Order canceled.")
    }
  }, [])


  async function onCheckout() {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    }

    await checkoutOrder(order);
  }

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg"  className="button sm:w-fit">
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  )
}

export default Checkout