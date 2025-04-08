import { headers } from 'next/headers';

export async function getClientIp() {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0] || '127.0.0.1'; // fallback para localhost
    return ip;
}
