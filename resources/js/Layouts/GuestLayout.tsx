import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center  pt-6 sm:justify-center sm:pt-0 bg-gray-900 " >
            <div>
            <Link href="/" className="text-5xl font-bold">B<span className="text-[#FDED00] font-[Electrolize]">Wave</span></Link>
            </div>

            <div className="md:mt-6 mt-14 md:w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
