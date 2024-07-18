
import { Link, useLocation } from "react-router-dom"; // Import Link from React Router
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    route: string; // Add the route property to each link
  }[];
  
}

export function Nav({ links, isCollapsed }: NavProps) {
    const location=useLocation()

  return (
    <TooltipProvider>
    <div
      data-collapsed={isCollapsed}
      className={`group flex flex-col gap-4 py-2 ${isCollapsed ? 'data-[collapsed=true]:py-2' : ''}`}
    >
      <nav className={`grid gap-1 px-2 ${isCollapsed ? 'group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2' : ''}`}>
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
               
                <Link
                  to={link.route} // Use the route specified in the link
                  className={cn(
                    buttonVariants({ variant: link.route===location.pathname?"default":"ghost", size: "icon" }),
                    "h-9 w-11",
                    
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to={link.route} // Use the route specified in the link
              className={cn( 
                buttonVariants({ variant: link.route===location.pathname?"default":"ghost", size: "sm" }), "flex justify-between ",
                
              )}
            >
              {/* <link.icon className="mr-2 h-4 w-4" />
              {link.title} */}
              
    <link.icon className="mr-2 h-4 w-4" />
    {link.title}
   

              {/* {link.label && (
                // <span
                //   className={cn(
                //     "ml-auto",
                //     link.variant === "default" &&
                //       "text-background dark:text-white"
                //   )}
                // >
                //   {link.label}
                // </span>
              )} */}
            </Link>
          )
        )}
      </nav>
    </div>
    </TooltipProvider>
  );
}
