import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const Packages = () => {
    return (
        <AppLayout>
            <Head title="Packages" />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Packages</h1>
                {/* Content for Packages page */}
            </div>
        </AppLayout>
    );
};

export default Packages; 