import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="w-full bg-white/40 h-40 flex items-center justify-center py-4 relative shadow-md">
      <Avatar className="h-40 w-40 border-2 border-white absolute -bottom-20">
        <AvatarImage src="/avatar.jpg" alt="avatar" />
        <AvatarFallback>HK</AvatarFallback>
      </Avatar>
    </header>
  );
}