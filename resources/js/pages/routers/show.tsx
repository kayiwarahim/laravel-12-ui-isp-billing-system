import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Router, SystemResource, Interface, PageProps, BreadcrumbItem } from '../../types';

interface Props extends PageProps {
    router: Router;
    systemResource: SystemResource[];
    interfaces: Interface[];
    connected: boolean;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Routers',
        href: '/routers',
    },
];

export default function Show({ router, systemResource, interfaces, connected }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={router.name} />

            <div className="overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{router.name}</h2>
                        <div>
                            <Link
                                href={route('routers.edit', router.id)}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Edit
                            </Link>
                            <Link
                                href={route('routers.index')}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Back to List
                            </Link>
                        </div>
                    </div>

                    <div className=" bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Router Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Router Information</h3>
                            <dl className="grid grid-cols-1 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Host</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{router.host}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{router.username}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Port</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{router.port}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{router.location || 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                                    <dd className="mt-1">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {connected ? 'Online' : 'Offline'}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* System Resources */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">System Resources</h3>
                            {systemResource[0] ? (
                                <dl className="grid grid-cols-1 gap-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">CPU Load</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{systemResource[0]['cpu-load'] || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Free Memory</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{systemResource[0]['free-memory'] || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Total Memory</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{systemResource[0]['total-memory'] || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Free HDD Space</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{systemResource[0]['free-hdd-space'] || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Total HDD Space</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{systemResource[0]['total-hdd-space'] || 'N/A'}</dd>
                                    </div>
                                </dl>
                            ) : (
                                <p className="text-sm text-gray-500">Unable to fetch system resources</p>
                            )}
                        </div>
                    </div>

                    {/* Interfaces */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">Network Interfaces</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAC Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {interfaces.map((interface_, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interface_.name || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interface_.type || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{interface_['mac-address'] || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    interface_.running ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {interface_.running ? 'Running' : 'Disabled'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}