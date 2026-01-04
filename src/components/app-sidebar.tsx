"use client";
import { Home, Tag, CardSim, BrushCleaning } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useGlobal } from "@/hooks/globalHook";
import Link from "next/link";
import useStoreTag from "@/store/useStoreTag";
import { Button } from "./ui/Button";
import useStoreCategories from "@/store/useStoreCategories";
import { resetAllStores } from "@/store/restAllStore";

export function AppSidebar() {
  const { tags, category } = useGlobal();

  const setTag = useStoreTag((state) => state.setTag);
  const selectTag = useStoreTag((state) => state.selectTag);

  const setCategories = useStoreCategories((state) => state.setCategory);
  const selectCategory = useStoreCategories((state) => state.selectCategory);

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "ClearFilter",
      url: "/",
      icon: BrushCleaning,
      onClick: () => resetAllStores(),
    },
    {
      title: "Tags",
      url: "/",
      icon: Tag,
      items: tags.map((tag) => ({
        title: tag.name,
        isActive: tag.name === selectTag.name,
        onClick: () => {
          setTag(tag);
        },
      })),
    },
    {
      title: "Category",
      icon: CardSim,
      items: category.map((cat) => ({
        title: cat.name,
        isActive: cat.name === selectCategory.name,
        onClick: () => {
          setCategories(cat);
        },
      })),
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items && item.items.length > 0 ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <div className="cursor-pointer">
                            <item.icon />
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem, index) => (
                            <SidebarMenuSubItem key={`${subItem.title}-${index}`}>
                              <SidebarMenuSubButton asChild>
                                <Button
                                  variant="ghost"
                                  onClick={subItem.onClick}
                                  className="w-full justify-start"
                                >
                                  <span
                                    className={`${subItem.isActive
                                      ? "text-green-500 font-bold"
                                      : "text-foreground"
                                      }`}
                                  >
                                    {subItem.title}
                                  </span>
                                </Button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url || "#"} onClick={item.onClick}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}