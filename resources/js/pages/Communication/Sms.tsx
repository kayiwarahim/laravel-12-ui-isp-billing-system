import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const Sms = () => {
    return (
        <AppLayout>
            <Head title="Sms" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Sms</h1>
                {/* Content for Sms page */}
            </div>
        </AppLayout>
    );
};

export default Sms; 