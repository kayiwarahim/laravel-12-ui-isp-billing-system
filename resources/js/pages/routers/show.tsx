import { Head, useForm, router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Router, SystemResource, Interface, PageProps, BreadcrumbItem } from '@/types';

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

export default function Show({ router: routerData, systemResource, interfaces, connected }: Props) {
    const { data: bridgeData, setData: setBridgeData, post: postBridge, processing: processingBridge, errors: bridgeErrors, reset: resetBridge } = useForm({
        name: '',
    });

    const { data: ipAddressData, setData: setIpAddressData, post: postIpAddress, processing: processingIpAddress, errors: ipAddressErrors, reset: resetIpAddress } = useForm({
        address: '',
        interface: '',
    });

    const submitBridge = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postBridge(route('routers.createBridge', routerData.id), {
            onSuccess: () => resetBridge(),
        });
    };

    const submitIpAddress = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postIpAddress(route('routers.addIpAddress', routerData.id), {
            onSuccess: () => resetIpAddress(),
        });
    };

    // Helper function to convert bytes to MB and format
    const formatBytesToMB = (bytes: string | number | undefined): string => {
        if (bytes === undefined || bytes === null || isNaN(Number(bytes))) {
            return 'N/A';
        }
        const megabytes = Number(bytes) / (1024 * 1024);
        return `${megabytes.toFixed(2)} MB`; // Format to 2 decimal places
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={routerData.name} />

            <div className="overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{routerData.name}</h2>
                        <div>
                            <Link
                                href={route('routers.edit', routerData.id)}
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

                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Router Information */}
                        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Router Information</h3>
                            <dl className="grid grid-cols-1 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Host</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{routerData.host}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Username</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{routerData.username}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Port</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{routerData.port}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Location</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{routerData.location || 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Status</dt>
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
                        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">System Resources</h3>
                            {systemResource[0] ? (
                                <dl className="grid grid-cols-1 gap-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">CPU Load</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{systemResource[0]['cpu-load'] || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Free Memory</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{formatBytesToMB(systemResource[0]['free-memory'])}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Total Memory</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{formatBytesToMB(systemResource[0]['total-memory'])}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Free HDD Space</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{formatBytesToMB(systemResource[0]['free-hdd-space'])}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Total HDD Space</dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{formatBytesToMB(systemResource[0]['total-hdd-space'])}</dd>
                                    </div>
                                </dl>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-300">Unable to fetch system resources</p>
                            )}
                        </div>
                    </div>

                    {/* Interfaces */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Network Interfaces</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">MAC Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {interfaces.map((interface_: any, index) => {
                                        const isBridge = interface_.type === 'bridge';
                                        const isAdministrativelyEnabled = interface_.disabled !== 'true';
                                        const statusText = isBridge ? (isAdministrativelyEnabled ? 'Active' : 'Inactive') : (interface_.running ? 'Running' : 'Disabled');
                                        const statusColorClass = isBridge ? (isAdministrativelyEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800') : (interface_.running ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800');

                                        return (
                                            <tr key={index} className="bg-white dark:bg-gray-800">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{interface_.name || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{interface_.type || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{interface_['mac-address'] || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorClass}`}>
                                                        {statusText}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {isBridge && (
                                                        <div className="flex space-x-2">
                                                            {isAdministrativelyEnabled ? (
                                                                <button
                                                                    onClick={() => router.post(route('routers.disableBridge', [routerData.id, interface_.name]))}
                                                                    className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                                >
                                                                    Disable
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => router.post(route('routers.enableBridge', [routerData.id, interface_.name]))}
                                                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                                >
                                                                    Enable
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => {
                                                                    if (confirm('Are you sure you want to remove this bridge?')) {
                                                                        router.delete(route('routers.removeBridge', [routerData.id, interface_.name]));
                                                                    }
                                                                }}
                                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Create Bridge Form */}
                    <div className="mt-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Create New Bridge</h3>
                        <form onSubmit={submitBridge} className="flex items-center gap-4">
                            <div>
                                <label htmlFor="bridgeName" className="sr-only text-gray-700 dark:text-gray-300">Bridge Name</label>
                                <input
                                    id="bridgeName"
                                    type="text"
                                    value={bridgeData.name}
                                    onChange={(e) => setBridgeData('name', e.target.value)}
                                    placeholder="Bridge Name"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-700"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                disabled={processingBridge}
                            >
                                {processingBridge ? 'Creating...' : 'Create Bridge'}
                            </button>
                        </form>
                        {bridgeErrors.name && <div className="text-red-500 text-sm mt-2">{bridgeErrors.name}</div>}
                    </div>

                    {/* Add IP Address Form */}
                    <div className="mt-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add IP Address</h3>
                        <form onSubmit={submitIpAddress} className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">IP Address (e.g., 192.168.1.1/24)</label>
                                <input
                                    id="ipAddress"
                                    type="text"
                                    value={ipAddressData.address}
                                    onChange={(e) => setIpAddressData('address', e.target.value)}
                                    placeholder="e.g., 192.168.1.1/24"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-700"
                                />
                                {ipAddressErrors.address && <div className="text-red-500 text-sm mt-2">{ipAddressErrors.address}</div>}
                            </div>
                            <div>
                                <label htmlFor="interface" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Interface</label>
                                {/* This could be a select input populated with interfaces from the 'interfaces' prop */}
                                <input
                                    id="interface"
                                    type="text"
                                    value={ipAddressData.interface}
                                    onChange={(e) => setIpAddressData('interface', e.target.value)}
                                    placeholder="e.g., ether1 or bridge1"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-700"
                                />
                                {ipAddressErrors.interface && <div className="text-red-500 text-sm mt-2">{ipAddressErrors.interface}</div>}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    disabled={processingIpAddress}
                                >
                                    {processingIpAddress ? 'Adding...' : 'Add IP Address'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}