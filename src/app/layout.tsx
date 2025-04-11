import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import './globals.css';
import Providers from '@/lib/providers';
import { NuqsAdapter } from 'nuqs/adapters/next';

const fontBarlow = Barlow({
    variable: '--font-barlow',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Hepta Weather Forecast',
    description: 'A weather forecast app for Hepta',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${fontBarlow.className} antialiased`}>
                <Providers>
                    <NuqsAdapter>{children}</NuqsAdapter>
                </Providers>
            </body>
        </html>
    );
}
