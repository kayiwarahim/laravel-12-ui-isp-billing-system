import { LucideIcon } from 'lucide-react';

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

export interface BreadcrumbItem {
    title: string;
    href: string;
} 

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}