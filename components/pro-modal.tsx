import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { DialogDescription } from "@radix-ui/react-dialog";

import {
  Code,
  LayoutDashboard,
  MessageSquare,
  ImageIcon,
  VideoIcon,
  Music,
  Settings,
  Check,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];

const ProModal = () => {
  const proModel = useProModal();

  const [loading , setLoading] = useState(false);


  const onSubscribe = async () => {
    try{
      setLoading(true);
      const response = await axios.get("api/stripe");

      window.location.href = await response.data.url;
    }
    catch(err){
      toast.error("Something went wrong.");
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
      <DialogContent className="sm:max-w-[425px] z-[999]">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Genius
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>

          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4 ">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className="w-full">
            Upgrade 
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
