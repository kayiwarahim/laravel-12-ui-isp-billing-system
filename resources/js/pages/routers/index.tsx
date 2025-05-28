import { Head } from '@inertiajs/react';
import { Router, PageProps, BreadcrumbItem } from '../../types';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

interface Props extends PageProps {
    routers: Router[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Routers',
        href: '/routers',
    },
];

export default function Index({ routers }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Routers" />
            <div className="overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Mikrotik Routers</h2>
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                    {breadcrumbs.map((item, index) => (
                                        <li key={index} className="inline-flex items-center">
                                            {index > 0 && (
                                                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                                </svg>
                                            )}
                                            <Link
                                                href={item.href}
                                                className={`inline-flex items-center text-sm font-medium ${
                                                    index === breadcrumbs.length - 1
                                                        ? 'text-gray-500'
                                                        : 'text-gray-700 hover:text-blue-600'
                                                }`}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </div>
                        <Link href={route('routers.create')} className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add New Router
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {routers.map((router) => (
                                    <tr key={router.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{router.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{router.host}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{router.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                router.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {router.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link
                                                href={route('routers.show', router.id)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={route('routers.edit', router.id)}
                                                className="text-yellow-600 hover:text-yellow-900 mr-3"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('routers.destroy', router.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900"
                                                preserveScroll
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}