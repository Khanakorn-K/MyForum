"use client";
import { Home, Tag, ChevronDown, CardSim } from "lucide-react";
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

export function AppSidebar() {
  const { tags, category } = useGlobal();
  const setTag = useStoreTag((state) => state.setTag);
  const clearTag = useStoreTag((state) => state.clearTag);
  const setCategories = useStoreCategories((state) => state.setCategory);
  const clearCategory = useStoreCategories((state) => state.clearCategory);
  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Tags",
      icon: Tag,
      items: tags.map((tag) => ({
        title: tag.name,
        onClick: () => {
          setTag(tag);
          clearCategory();
        },
      })),
    },
    {
      title: "Category",
      icon: CardSim,
      items: category.map((cat) => ({
        title: cat.name,
        onClick: () => {
          setCategories(cat);
          clearTag();
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
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem, index) => (
                            <SidebarMenuSubItem
                              key={`${subItem.title}-${index}`}
                            >
                              <SidebarMenuSubButton asChild>
                                <Button
                                  variant="ghost"
                                  onClick={subItem.onClick}
                                  className="w-full justify-start"
                                >
                                  <span>{subItem.title}</span>
                                </Button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url || "#"}>
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
