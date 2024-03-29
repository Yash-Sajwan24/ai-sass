import { auth, currentUser } from "@clerk/nextjs";

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
        success_url : settingUrl, 
        cancel_url : settingUrl, 
        payment_method_types: ['card'], 
        mode : 'subscription', 
        billing_address_collection: 'auto', 
        customer_email: user.emailAddresses[0].emailAddress, 
        line_items : [
            {
                price_data : {
                    currency : "USD", 
                    product_data: {
                        name: "Genius Pro", 
                        description : "Unlimited AI Generations", 
                        images: ["https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg"]
                    }, 
                    unit_amount : 2000, 
                    recurring : {
                        interval : "month"
                    }
                }, 
                quantity : 1
            }
        ], 
        metadata : {
            userId, 
        }
    });

    return new NextResponse(JSON.stringify({url :stripeSession.url }));


  } catch (err) {
    console.log("[STRIPE_ERROR]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
