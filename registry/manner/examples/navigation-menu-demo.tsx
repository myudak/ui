import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/registry/manner/ui/navigation-menu"

const links = [
  { title: "Foundations", description: "Color, type, space, and motion." },
  { title: "Components", description: "Live previews and installable source." },
  { title: "Blocks", description: "Complete product compositions." },
]

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-1 p-1">
              {links.map((link) => (
                <li key={link.title}>
                  <NavigationMenuLink href="#" className="flex-col items-start gap-0.5">
                    <span className="font-medium">{link.title}</span>
                    <span className="text-muted-foreground">{link.description}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Blocks</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
