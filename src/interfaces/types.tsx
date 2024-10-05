export interface Team {
    id: string;
    name: string;
    image?: string;
    balance?: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    captainId?: string;
    captain?: Captain;
    players: Player[];
}

export interface Player {
    id: string;
    name: string;
    email: string;
    age?: number;
    images: string[];
    battingOrder?: number;
    bowlingType?: BowlingType;
    auctionStatus: PlayerStatus;
    transactionNumber?: string;
    address?: string;
    playerCost?: number;
    contactNumber: string;
    isConfirmed: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    teamId?: string;
    userId: string;
}

export interface Captain {
    id: string;
    name: string;
    email: string;
    image?: string;
    contactNumber: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    team?: Team;
}

export interface Admin {
    id: string;
    name: string;
    email: string;
    image?: string;
    contactNumber: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export enum UserRole {
    SUPERADMIN = "SUPERADMIN",
    ADMIN = "ADMIN",
    CAPTAIN = "CAPTAIN",
    PLAYER = "PLAYER",
}

export enum BowlingType {
    SPIN = "SPIN",
    FAST = "FAST",
    MEDIUM = "MEDIUM",
    NONE = "NONE",
}

export enum PlayerStatus {
    AVAILABLE = "AVAILABLE",
    SOLD = "SOLD",
}
