import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") as string;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      const userEmail = session.customer_details.email;
      const priceId = session.line_items?.[0]?.price?.id || session.metadata?.priceId;

      let tier = "gold";
      if (priceId === process.env.STRIPE_PLATINUM_PRICE_ID) tier = "platinum";

      // 🔑 Update DB (pseudo-code, replace with your DB call)
      // await db.user.update({ where: { email: userEmail }, data: { tier } });
      console.log(`✅ Updated ${userEmail} to ${tier}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
