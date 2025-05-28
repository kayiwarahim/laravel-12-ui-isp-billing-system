import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

declare module '@/types' {
    export interface Router {
        id: number;
        name: string;
        host: string;
        username: string;
        password: string;
        port: number;
        is_active: boolean;
        description?: string;
        location?: string;
        last_connection_status?: string;
        last_connection_time?: string;
        created_at: string;
        updated_at: string;
    }

    export interface SystemResource {
        'cpu-load': string;
        'free-memory': string;
        'total-memory': string;
        'free-hdd-space': string;
        'total-hdd-space': string;
    }

    export interface Interface {
        name: string;
        type: string;
        'mac-address': string;
        running: boolean;
        disabled?: 'true' | 'false';
    }

    export interface PageProps {
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
            };
        };
    }
}
