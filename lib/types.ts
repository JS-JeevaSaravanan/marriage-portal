// User and profile related types
export interface User {
  id: string;
  name: string;
  email: string;
  profileId?: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  location: string;
  bio: string;
  occupation: string;
  education: string;
  religion?: string;
  height?: number; // in cm
  photos: string[];
  interests: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartnerPreference {
  profileId: string;
  minAge: number;
  maxAge: number;
  gender: 'male' | 'female' | 'other' | 'any';
  location?: string[];
  religion?: string[];
  minHeight?: number; // in cm
  maxHeight?: number; // in cm
  education?: string[];
  occupation?: string[];
}

export interface Interest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}