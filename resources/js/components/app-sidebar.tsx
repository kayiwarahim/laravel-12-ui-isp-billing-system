import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Router, Users, Package, CreditCard, Award, DollarSign, Megaphone, MessageSquare } from 'lucide-react';
import AppLogo from './app-logo';

// Define the combined list of navigation items
const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Routers', href: '/routers', icon: Router },
    { title: 'Active Users', href: '/users/active', icon: Users },
    { title: 'Users', href: '/users', icon: Users },
    { title: 'Packages', href: '/finance/packages', icon: Package },
    { title: 'Payments', href: '/finance/payments', icon: CreditCard },
    { title: 'Vouchers', href: '/finance/vouchers', icon: Award },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Render all main navigation items as a single list */}
                <SidebarMenu>
                    {mainNavItems.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild>
                                <Link href={item.href} prefetch={item.href.startsWith('/')} className="text-base">
                                    {item.icon && <item.icon className="h-5 w-5" />}
                                    {item.title}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
