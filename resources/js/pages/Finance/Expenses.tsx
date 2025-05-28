import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const Expenses = () => {
    return (
        <AppLayout>
            <Head title="Expenses" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Expenses</h1>
                {/* Content for Expenses page */}
            </div>
        </AppLayout>
    );
};

export default Expenses; 