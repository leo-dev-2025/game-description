export interface Sport {
id: number;
name: string;
}

export interface Category {
    id: number;              // Assuming 'id' is of type number
    name: string;
    slug: string;            // Unique slug for the category
    description?: string;    // Optional description
    createdAt: string;       // ISO date string
    updatedAt: string;       // ISO date string
    gameTypes?: any[]; 
}
  
export interface GameType {
id: number;
sportId: number;
name: string;
category: Category;
slug: string;
}

export interface Provider {
id: number;
name: string;
contactInfo: string | null;
slug: string;
}

export interface Game {
id: number;
gameTypeId: number;
providerId: number;
name: string;
description: string;
popularity: number;
createdAt: string; // You might consider using Date if you plan to parse this into a Date object
gameType?: GameType;
provider?: Provider;
category?: Category;
slug: string;
image?: Image
}

// Define SpeechRecognition interfaces manually if not available
export interface SpeechRecognitionEvent {
results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionResultList {
[index: number]: SpeechRecognitionResult;
length: number;
}

export interface SpeechRecognitionResult {
isFinal: boolean;
[index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionAlternative {
transcript: string;
confidence: number;
}

// types/User.ts

export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // Consider hashing passwords
  phoneNumber?: string; // Optional field
  favoriteGames?: Game[]; // Relation to favorite games
  recentGames?: Game[]; // Relation to recent games
  preferences?: UserPreferences; // Relation to user preferences
  activityLogs?: ActivityLog[]; // Relation to activity logs
  image?: Image; // Optional relation to a single image
  referralCode?: string; // Optional unique referral code
  referredByCode?: string; // Optional referral code of the user who referred this user
  referrals?: Referral[]; // Relation to referrals made by this user
  referredUsers?: Referral[]; // Relation to referrals received by this user
  createdAt: Date;
  updatedAt: Date;
}


// types/UserPreferences.ts

export interface UserPreferences {
  id: number;
  userId: number; // Foreign key to User
  user: User; // Relation to User
  language?: string; // Optional field for language preference
  theme?: string; // Optional field for theme preference (light/dark)
  createdAt: Date;
  updatedAt: Date;
}

// types/ActivityLog.ts

export interface ActivityLog {
  id: number;
  userId: number; // Foreign key to User
  user: User; // Relation to User
  gameId: number; // Foreign key to Game
  game: Game; // Relation to Game
  action: string; // e.g., 'played', 'favorited'
  timestamp: Date;
}

export interface ProfileDetails {
  primaryNumber: number;
  alternateNumber: number;
  email: string;
  password: string;
  confirmPassword: string;
  accountName: string;
  accountNumber: number;
  ifscCode: string;
}

export interface Image {
  id: number;                      // Unique identifier for the image
  url: string;                     // URL of the image
  userId?: number | null;         // Unique relation to User (optional)
  providerId?: number | null;     // Unique relation to Provider (optional)
  gameId?: number | null;         // Unique relation to Game (optional)
  gameTypeId?: number | null;     // Unique relation to GameType (optional)
  categoryId?: number | null;     // Unique relation to Category (optional)
  user?: User | null;             // User relation (optional)
  provider?: Provider | null;      // Provider relation (optional)
  game?: Game | null;             // Game relation (optional)
  gameType?: GameType | null;     // GameType relation (optional)
  category?: Category | null;      // Category relation (optional)
  createdAt: Date;                // Date when the image was created
  updatedAt: Date;                // Date when the image was last updated
}


declare global {
interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}
}
  
export enum ReferralStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REWARDED = 'REWARDED',
}

export interface Referral {
  id: number;
  referrerId: number; // ID of the user who referred
  referredUserId: number; // ID of the user being referred
  status: ReferralStatus; // Status of the referral
  createdAt: Date; // Timestamp of when the referral was created
  updatedAt: Date; // Timestamp of when the referral was last updated
  referrer: User; // Relation to the user who referred
  referredUser?: User; // Optional relation to the user who was referred
}




  