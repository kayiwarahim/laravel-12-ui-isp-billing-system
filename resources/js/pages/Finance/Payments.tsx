import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const Payments = () => {
    return (
        <AppLayout>
            <Head title="Payments" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Payments</h1>
                {/* Content for Payments page */}
            </div>
        </AppLayout>
    );
};

export default Payments; 