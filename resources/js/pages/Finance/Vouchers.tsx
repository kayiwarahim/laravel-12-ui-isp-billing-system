import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const Vouchers = () => {
    return (
        <AppLayout>
            <Head title="Vouchers" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Vouchers</h1>
                {/* Content for Vouchers page */}
            </div>
        </AppLayout>
    );
};

export default Vouchers; 