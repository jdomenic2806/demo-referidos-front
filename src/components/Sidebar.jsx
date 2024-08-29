import { LinkIcon, Home, Settings, HelpCircle, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const Sidebar = ({ className }) => {
  return (
    <div className={`flex flex-col h-full p-4 bg-secondary ${className}`}>
      <div className="flex items-center space-x-2 mb-8">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold">Carlos Nombre</span>
      </div>
      <nav className="space-y-2 flex-grow">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Home className="mr-2 h-4 w-4" />
          Inicio
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <LinkIcon className="mr-2 h-4 w-4" />
          Enlaces
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Settings className="mr-2 h-4 w-4" />
          Configuración
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Ayuda
        </Button>
      </nav>
      <Button
        variant="ghost"
        className="w-full justify-start mt-auto hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Cerrar sesión
      </Button>
    </div>
  );
};
