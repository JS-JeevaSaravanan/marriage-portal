import { Profile, Interest, Message, PartnerPreference } from './types';

// Mock profiles data
export const profiles: Profile[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Sophia Williams',
    age: 28,
    gender: 'female',
    location: 'New York, USA',
    bio: 'I love traveling, reading books, and exploring new cuisines. Looking for someone who shares similar interests and values family.',
    occupation: 'Marketing Manager',
    education: 'MBA in Marketing',
    religion: 'Christian',
    height: 165,
    photos: [
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    interests: ['Travel', 'Cooking', 'Reading', 'Hiking'],
    isVerified: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-03-20')
  },
  {
    id: '2',
    userId: 'user2',
    name: 'James Peterson',
    age: 32,
    gender: 'male',
    location: 'San Francisco, USA',
    bio: 'Software engineer who enjoys outdoor activities. Looking for someone who is kind, intelligent and has a good sense of humor.',
    occupation: 'Software Engineer',
    education: 'MSc in Computer Science',
    religion: 'Hindu',
    height: 183,
    photos: [
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    interests: ['Hiking', 'Technology', 'Photography', 'Travel'],
    isVerified: true,
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-04-05')
  },
  {
    id: '3',
    userId: 'user3',
    name: 'Emily Johnson',
    age: 26,
    gender: 'female',
    location: 'Chicago, USA',
    bio: 'Elementary school teacher who loves children. Passionate about education and making a difference in the world.',
    occupation: 'Teacher',
    education: 'Bachelor in Education',
    religion: 'Christian',
    height: 170,
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    interests: ['Teaching', 'Reading', 'Painting', 'Volunteering'],
    isVerified: true,
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2023-03-15')
  },
  {
    id: '4',
    userId: 'user4',
    name: 'Michael Chen',
    age: 30,
    gender: 'male',
    location: 'Boston, USA',
    bio: 'Doctor who is passionate about healthcare. Enjoys playing tennis and piano in free time.',
    occupation: 'Physician',
    education: 'MD from Harvard Medical School',
    religion: 'Buddhist',
    height: 178,
    photos: [
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    interests: ['Medicine', 'Tennis', 'Piano', 'Travel'],
    isVerified: true,
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-04-12')
  },
  {
    id: '5',
    userId: 'user5',
    name: 'Jessica Patel',
    age: 27,
    gender: 'female',
    location: 'Seattle, USA',
    bio: 'UX designer who loves creating beautiful and functional interfaces. Looking for someone creative and kind.',
    occupation: 'UX Designer',
    education: 'Bachelor in Design',
    religion: 'Hindu',
    height: 163,
    photos: [
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    interests: ['Design', 'Art', 'Movies', 'Yoga'],
    isVerified: true,
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-04-20')
  },
  {
    id: '6',
    userId: 'user6',
    name: 'Robert Wilson',
    age: 34,
    gender: 'male',
    location: 'Austin, USA',
    bio: 'Entrepreneur who values hard work and integrity. Enjoys fitness and good food.',
    occupation: 'Entrepreneur',
    education: 'MBA',
    religion: 'Christian',
    height: 188,
    photos: [
      'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    interests: ['Business', 'Fitness', 'Cooking', 'Travel'],
    isVerified: true,
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-03-25')
  }
];

// Mock partner preferences
export const partnerPreferences: PartnerPreference[] = [
  {
    profileId: '1',
    minAge: 28,
    maxAge: 38,
    gender: 'male',
    location: ['New York, USA', 'Boston, USA'],
    religion: ['Christian', 'Catholic'],
    minHeight: 175,
    education: ['Bachelor', 'Master', 'PhD']
  },
  {
    profileId: '2',
    minAge: 25,
    maxAge: 35,
    gender: 'female',
    location: ['San Francisco, USA', 'Los Angeles, USA'],
    religion: ['Hindu', 'Buddhist', 'Christian'],
    education: ['Bachelor', 'Master']
  },
  {
    profileId: '3',
    minAge: 26,
    maxAge: 36,
    gender: 'male',
    location: ['Chicago, USA', 'New York, USA'],
    religion: ['Christian'],
    minHeight: 175,
    education: ['Bachelor', 'Master']
  }
];

// Mock interests data
export const interests: Interest[] = [
  {
    id: 'int1',
    senderId: '1',
    receiverId: '2',
    status: 'pending',
    createdAt: new Date('2023-04-10')
  },
  {
    id: 'int2',
    senderId: '3',
    receiverId: '2',
    status: 'accepted',
    createdAt: new Date('2023-04-08')
  },
  {
    id: 'int3',
    senderId: '4',
    receiverId: '5',
    status: 'rejected',
    createdAt: new Date('2023-04-05')
  },
  {
    id: 'int4',
    senderId: '6',
    receiverId: '1',
    status: 'pending',
    createdAt: new Date('2023-04-12')
  }
];

// Mock messages data
export const messages: Message[] = [
  {
    id: 'msg1',
    senderId: '2',
    receiverId: '3',
    content: 'Hi Emily, I liked your profile. Would like to know more about your interests in education.',
    read: true,
    createdAt: new Date('2023-04-09 10:30:00')
  },
  {
    id: 'msg2',
    senderId: '3',
    receiverId: '2',
    content: 'Hello James, thank you for your message. I\'m passionate about early childhood education and innovative teaching methods.',
    read: true,
    createdAt: new Date('2023-04-09 11:45:00')
  },
  {
    id: 'msg3',
    senderId: '2',
    receiverId: '3',
    content: 'That\'s fascinating! I\'ve always admired teachers for their dedication. Would you like to chat more?',
    read: false,
    createdAt: new Date('2023-04-09 14:20:00')
  }
];