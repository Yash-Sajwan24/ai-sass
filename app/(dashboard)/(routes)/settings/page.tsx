import Heading from "@/components/heading";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";
import SubscriptionButton from "@/components/subscription-button";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  return (
    <>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />

      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
            {
                isPro ? "You are currently on a Pro Plan." : "You are currently on a Free Plan."
            }
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </>
  );
};

export default SettingsPage;
