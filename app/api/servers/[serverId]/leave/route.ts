import { getCurrentProfile } from '@/lib';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const PATCH = async (req: Request, { params: { serverId } }: { params: { serverId: string } }) => {
    try {
        const profile = await getCurrentProfile();
        if (!profile) return new NextResponse('Unauthorized', { status: 401 });

        if (!serverId) return new NextResponse('Server ID not found', { status: 400 });

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });

        return NextResponse.json(server);

    } catch (error) {
        //TODO: Remove this console.log  before production
        console.log('SERVER_ID_POST]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
};
