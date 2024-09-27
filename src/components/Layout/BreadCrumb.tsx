import React from 'react';
import { useBreadcrumb } from '@/components/Provider/BreadCrumbContext';
import Link from 'next/link';

const Breadcrumb: React.FC = () => {
    const { breadcrumb } = useBreadcrumb();

    return (
        <nav className="bg-transparent py-3 px-5 rounded-md w-full">
            <ol className="list-reset flex text-gray-600">
                {breadcrumb.map((route, index) => (
                    <li key={index} className="flex items-center">
                        <Link href={route} className="text-blue-600 hover:text-blue-800 capitalize">
                            {route}
                        </Link>
                        {index < breadcrumb.length - 1 && (
                            <span className="mx-2">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
