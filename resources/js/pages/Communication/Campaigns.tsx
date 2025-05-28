import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const Campaigns = () => {
    return (
        <AppLayout>
            <Head title="Campaigns" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
                {/* Content for Campaigns page */}
            </div>
        </AppLayout>
    );
};

export default Campaigns; 