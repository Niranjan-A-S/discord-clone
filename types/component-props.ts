import { MemberRole, Server } from '@prisma/client';
import { ReactNode } from 'react';
import { ServerWithMembersAndProfiles } from '.';

export interface IServerIdLayoutProps {
    children: ReactNode;
    params: { serverId: string }
}

export interface INavigationItemProps extends Pick<Server, 'id' | 'name' | 'imageUrl'> {
}


export interface IServerHeaderProps {
    server: ServerWithMembersAndProfiles;
    role?: MemberRole;
}

export interface IServerSidebarProps {
    serverId: string;
}

export interface IActionToolTipProps {
    children: ReactNode;
    label: string;
    align: 'start' | 'center' | 'end';
    side: 'top' | 'right' | 'bottom' | 'left';
}

export interface IFileUploadProps {
    onChange(url: string): void;
    value: string;
    endpoint: 'serverImage' | 'messageFile'
}

