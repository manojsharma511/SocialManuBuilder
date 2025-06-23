// Mock data for Instagram-like functionality
export const mockUsers = [
  {
    id: "default-user",
    username: "manojkumarsharma511",
    name: "Manoj Kumar Sharma",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "📱 App Developer | 🎯 Tech Enthusiast | 🌟 Default User",
    followers: 1250,
    following: 350,
    posts: 45,
    isVerified: true,
    isPrivate: false,
  },
  {
    id: "1",
    username: "sarah_adventures",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "🌍 Travel Blogger | 📸 Adventure Seeker | ✈️ 50+ Countries",
    followers: 12500,
    following: 450,
    posts: 120,
    isVerified: true,
    isPrivate: false,
  },
  {
    id: "2",
    username: "techguru_alex",
    name: "Alex Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "💻 Software Engineer | 🚀 Startup Founder | 🤖 AI Enthusiast",
    followers: 8900,
    following: 234,
    posts: 89,
    isVerified: true,
    isPrivate: false,
  },
  {
    id: "3",
    username: "foodie_maria",
    name: "Maria Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "🍕 Food Lover | 👩‍🍳 Chef | 📱 Recipe Creator",
    followers: 15600,
    following: 890,
    posts: 203,
    isVerified: true,
    isPrivate: false,
  },
  {
    id: "4",
    username: "fitness_jake",
    name: "Jake Thompson",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "💪 Personal Trainer | 🏋️‍♂️ Fitness Coach | 🥗 Nutrition Expert",
    followers: 9800,
    following: 567,
    posts: 145,
    isVerified: false,
    isPrivate: false,
  },
  {
    id: "5",
    username: "artist_emma",
    name: "Emma Wilson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "🎨 Digital Artist | 🖌️ Creative Soul | 🌈 Color Enthusiast",
    followers: 6700,
    following: 423,
    posts: 78,
    isVerified: false,
    isPrivate: false,
  },
  // ... Continue with more users (I'll generate 45 more)
];

// Generate additional users programmatically
const additionalUsers = Array.from({ length: 45 }, (_, index) => {
  const id = (index + 6).toString();
  const usernames = [
    "music_lover",
    "book_reader",
    "nature_photographer",
    "coffee_addict",
    "yoga_master",
    "gamer_pro",
    "fashion_style",
    "sports_fan",
    "movie_buff",
    "dance_queen",
    "pizza_expert",
    "cat_lover",
    "dog_person",
    "beach_vibes",
    "mountain_climber",
    "city_explorer",
    "sunset_chaser",
    "star_gazer",
    "ocean_soul",
    "forest_walker",
    "art_collector",
    "vintage_style",
    "modern_minimalist",
    "boho_chic",
    "street_style",
    "healthy_eating",
    "sweet_treats",
    "spicy_food",
    "comfort_meals",
    "exotic_cuisine",
    "weekend_warrior",
    "early_bird",
    "night_owl",
    "adventure_seeker",
    "home_comfort",
    "social_butterfly",
    "quiet_observer",
    "party_animal",
    "study_buddy",
    "work_enthusiast",
    "creative_mind",
    "logical_thinker",
    "free_spirit",
    "organized_life",
    "spontaneous_fun",
  ];

  const names = [
    "David Kim",
    "Lisa Brown",
    "Mike Davis",
    "Anna White",
    "Tom Garcia",
    "Sophie Martin",
    "Ryan Lee",
    "Grace Clark",
    "Kevin Wang",
    "Zoe Taylor",
    "Lucas Miller",
    "Chloe Anderson",
    "Ethan Moore",
    "Mia Jackson",
    "Noah Williams",
    "Ava Thompson",
    "Liam Wilson",
    "Isabella Martinez",
    "Mason Rodriguez",
    "Emma Lopez",
    "Oliver Hernandez",
    "Sophia Gonzalez",
    "William Perez",
    "Charlotte Sanchez",
    "James Rivera",
    "Amelia Torres",
    "Benjamin Flores",
    "Harper Ramirez",
    "Elijah Cook",
    "Evelyn Reed",
    "Logan Bailey",
    "Abigail Cooper",
    "Alexander Ward",
    "Emily Foster",
    "Sebastian Gray",
    "Elizabeth Hayes",
    "Mateo Howard",
    "Sofia Ross",
    "Daniel Wood",
    "Avery Barnes",
    "Henry Fisher",
    "Ella Henderson",
    "Jackson Coleman",
    "Scarlett Jenkins",
    "Samuel Perry",
  ];

  return {
    id,
    username: `${usernames[index % usernames.length]}_${id}`,
    name: names[index % names.length],
    avatar: `https://images.unsplash.com/photo-${1500000000000 + index * 1000000}?w=150&h=150&fit=crop&crop=face&auto=format`,
    bio: [
      "🌟 Living my best life",
      "📸 Capturing moments",
      "💫 Dream big",
      "🎯 Goal getter",
      "🌈 Positive vibes",
    ][index % 5],
    followers: Math.floor(Math.random() * 10000) + 500,
    following: Math.floor(Math.random() * 1000) + 100,
    posts: Math.floor(Math.random() * 100) + 20,
    isVerified: Math.random() > 0.8,
    isPrivate: Math.random() > 0.9,
  };
});

export const allUsers = [...mockUsers, ...additionalUsers];

export const mockPosts = [
  {
    id: "post1",
    userId: "1",
    user: mockUsers[1],
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format",
    caption:
      "Amazing sunset in Santorini! 🌅 Can't believe how beautiful this place is. #travel #sunset #greece",
    likes: 1250,
    comments: 89,
    shares: 23,
    timestamp: "2 hours ago",
    isLiked: false,
    location: "Santorini, Greece",
  },
  {
    id: "post2",
    userId: "2",
    user: mockUsers[2],
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&auto=format",
    caption:
      "Just launched my new app! 🚀 Built with React and love ❤️ #coding #react #startup",
    likes: 892,
    comments: 156,
    shares: 67,
    timestamp: "4 hours ago",
    isLiked: true,
    location: "San Francisco, CA",
  },
  {
    id: "post3",
    userId: "3",
    user: mockUsers[3],
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop&auto=format",
    caption:
      "Homemade pizza night! 🍕 Recipe in my bio link. Who wants the recipe? #food #pizza #homemade",
    likes: 2341,
    comments: 234,
    shares: 89,
    timestamp: "6 hours ago",
    isLiked: false,
    location: "New York, NY",
  },
  {
    id: "post4",
    userId: "4",
    user: mockUsers[4],
    mediaType: "video",
    mediaUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    caption:
      "Morning workout routine! 💪 Start your day with energy! #fitness #workout #motivation",
    likes: 1567,
    comments: 78,
    shares: 45,
    timestamp: "8 hours ago",
    isLiked: true,
    location: "Los Angeles, CA",
  },
  {
    id: "post5",
    userId: "5",
    user: mockUsers[5],
    mediaType: "image",
    mediaUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&auto=format",
    caption:
      "New digital art piece! 🎨 What do you think? #art #digital #creative",
    likes: 789,
    comments: 45,
    shares: 12,
    timestamp: "12 hours ago",
    isLiked: false,
    location: "London, UK",
  },
];

// Generate more posts
const additionalPosts = Array.from({ length: 95 }, (_, index) => {
  const postId = `post${index + 6}`;
  const userId = allUsers[Math.floor(Math.random() * allUsers.length)].id;
  const user = allUsers.find((u) => u.id === userId);

  const captions = [
    "Living my best life! ✨ #blessed #happy #life",
    "Amazing day with friends! 👫 #friendship #fun #memories",
    "New adventure awaits! 🌟 #adventure #explore #wanderlust",
    "Feeling grateful today 🙏 #gratitude #positive #vibes",
    "Coffee and good vibes ☕ #coffee #morning #mood",
    "Sunset therapy 🌅 #sunset #peace #nature",
    "Weekend vibes! 🎉 #weekend #relax #fun",
    "Making memories! 📸 #memories #moments #life",
    "Good food, good mood 🍽️ #food #delicious #yummy",
    "Chasing dreams! 💫 #dreams #goals #motivation",
  ];

  return {
    id: postId,
    userId,
    user,
    mediaType: Math.random() > 0.8 ? "video" : "image",
    mediaUrl: `https://images.unsplash.com/photo-${1500000000000 + index * 100000}?w=400&h=400&fit=crop&auto=format`,
    caption: captions[index % captions.length],
    likes: Math.floor(Math.random() * 5000) + 10,
    comments: Math.floor(Math.random() * 200) + 5,
    shares: Math.floor(Math.random() * 50) + 1,
    timestamp: `${Math.floor(Math.random() * 24) + 1} hours ago`,
    isLiked: Math.random() > 0.7,
    location: ["New York", "Los Angeles", "London", "Paris", "Tokyo", "Sydney"][
      Math.floor(Math.random() * 6)
    ],
  };
});

export const allPosts = [...mockPosts, ...additionalPosts];

export const mockStories = allUsers.slice(0, 20).map((user, index) => ({
  id: `story${index + 1}`,
  userId: user.id,
  user,
  mediaUrl: `https://images.unsplash.com/photo-${1600000000000 + index * 200000}?w=300&h=600&fit=crop&auto=format`,
  timestamp: `${Math.floor(Math.random() * 12) + 1}h`,
  isViewed: Math.random() > 0.6,
}));

export const mockReels = Array.from({ length: 30 }, (_, index) => {
  const user = allUsers[Math.floor(Math.random() * allUsers.length)];
  return {
    id: `reel${index + 1}`,
    userId: user.id,
    user,
    videoUrl: `https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_${(index % 5) + 1}mb.mp4`,
    thumbnail: `https://images.unsplash.com/photo-${1600000000000 + index * 300000}?w=300&h=600&fit=crop&auto=format`,
    caption: [
      "Viral dance trend! 💃 #dance #viral #trending",
      "Life hack that changed everything! 🤯 #lifehack #tips #viral",
      "Behind the scenes magic ✨ #bts #content #creator",
      "Quick recipe tutorial! 👨‍🍳 #cooking #recipe #food",
      "Fitness motivation! 💪 #fitness #motivation #workout",
    ][index % 5],
    likes: Math.floor(Math.random() * 50000) + 1000,
    comments: Math.floor(Math.random() * 1000) + 50,
    shares: Math.floor(Math.random() * 500) + 10,
    timestamp: `${Math.floor(Math.random() * 7) + 1} days ago`,
    isLiked: Math.random() > 0.5,
    music: "Original Audio",
  };
});

export const mockFollowing = allUsers.slice(1, 31).map((user) => user.id);
export const mockFollowers = allUsers.slice(5, 40).map((user) => user.id);

export const mockComments = [
  {
    id: "comment1",
    userId: "2",
    user: mockUsers[2],
    text: "Absolutely stunning! 😍",
    likes: 23,
    timestamp: "2h",
    replies: [],
  },
  {
    id: "comment2",
    userId: "3",
    user: mockUsers[3],
    text: "This is amazing! How did you capture this?",
    likes: 45,
    timestamp: "1h",
    replies: [
      {
        id: "reply1",
        userId: "1",
        user: mockUsers[1],
        text: "Thanks! I used my phone camera at golden hour ✨",
        likes: 12,
        timestamp: "45m",
      },
    ],
  },
];
