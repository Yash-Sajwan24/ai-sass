import { Avatar, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = () => {
  return (
    <>
      <Avatar className="h-8 w-8 m-3">
        <AvatarImage src="/logo.png" />
      </Avatar>
    </>
  );
};

export default BotAvatar;
