export interface Platform {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
  image: string;
  rating: number;
  totalRatings: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  username: string;
  content: string;
  rating: number;
  date: string;
}

export const platforms: Record<string, Platform> = {
  y8: {
    id: 'y8',
    name: 'Y8 Games',
    url: 'https://zh.y8.com/',
    icon: '🎮',
    description: 'Y8 Games is a well-known online gaming platform offering a large collection of free Flash and HTML5 games. It includes action, adventure, puzzle, and many other game categories.',
    image: 'https://img.y8.com/assets/y8/header_logo-8b1b7a02590aece9544ac73d523153f5c14bd9f69f6cc8e8177c09b5e895105a.png',
    rating: 4.7,
    totalRatings: 15234,
    comments: []
  },
  poki: {
    id: 'poki',
    name: 'Poki',
    url: 'https://poki.com/',
    icon: '🎯',
    description: 'Poki is a popular online gaming platform focused on providing high-quality HTML5 games. It features a diverse range of games with a clean, modern interface.',
    image: 'https://a.poki.com/static/img/share-img.png',
    rating: 4.8,
    totalRatings: 18456,
    comments: []
  },
  addicting: {
    id: 'addicting',
    name: 'Addicting Games',
    url: 'https://www.addictinggames.com/',
    icon: '🎲',
    description: 'Addicting Games provides a wide range of addictive casual games, making it a great choice for time-killing. Games are easy to pick up but challenging to master.',
    image: 'https://www.addictinggames.com/sites/default/files/ag-logo.png',
    rating: 4.6,
    totalRatings: 12567,
    comments: []
  },
  famobi: {
    id: 'famobi',
    name: 'Famobi',
    url: 'https://play.famobi.com/',
    icon: '🎪',
    description: 'Famobi specializes in providing high-quality HTML5 games with stunning graphics, smooth performance, and suitable for players of all ages.',
    image: 'https://play.famobi.com/assets/images/famobi_share.jpg',
    rating: 4.5,
    totalRatings: 9876,
    comments: []
  },
  armor: {
    id: 'armor',
    name: 'Armor Games',
    url: 'https://armorgames.com/',
    icon: '🛡️',
    description: 'Armor Games is a veteran gaming platform known for its unique games and active community.',
    image: 'https://armorgames.com/assets/img/armor_games_700x500.jpg',
    rating: 4.9,
    totalRatings: 21345,
    comments: []
  },
  fog: {
    id: 'fog',
    name: 'Free Online Games',
    url: 'https://www.freeonlinegames.com/',
    icon: '🎨',
    description: 'FOG gaming platform offers a massive collection of free online games, covering a wide range of genres from casual to competitive.',
    image: 'https://www.freeonlinegames.com/assets/fog/images/fog-logo.png',
    rating: 4.4,
    totalRatings: 8765,
    comments: []
  },
  kongregate: {
    id: 'kongregate',
    name: 'Kongregate',
    url: 'https://www.kongregate.com/',
    icon: '🎭',
    description: 'Kongregate is a well-known gaming community featuring a large collection of high-quality Flash and HTML5 games, with strong community interaction.',
    image: 'https://cdn1.kongcdn.com/assets/files/0002/7114/kong_share.png',
    rating: 4.7,
    totalRatings: 16789,
    comments: []
  },
  itch: {
    id: 'itch',
    name: 'Itch.io',
    url: 'https://itch.io/',
    icon: '🎱',
    description: 'Itch.io is a paradise for independent game developers, offering a wide range of innovative and unique games, supporting creators.',
    image: 'https://static.itch.io/images/logo-white-new.png',
    rating: 4.8,
    totalRatings: 14567,
    comments: []
  },
  games1: {
    id: 'games1',
    name: '1Games',
    url: 'https://1games.io/',
    icon: '🎳',
    description: '1Games provides handpicked HTML5 games, focusing on delivering smooth gameplay experiences and high-quality game content.',
    image: 'https://1games.io/images/logo.png',
    rating: 4.3,
    totalRatings: 6543,
    comments: []
  }
};

export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  rating: number;
  totalRatings: number;
  comments: Comment[];
  gameUrl: string;
  playTime?: string;
  plays?: number;
  features?: string[];
  howToPlay?: string;
  createdAt: string; // ISO date string
}

// Load comments from localStorage
const loadComments = (gameId: string): Comment[] => {
  const savedComments = localStorage.getItem(`game_${gameId}_comments`);
  return savedComments ? JSON.parse(savedComments) : [];
};

// Update game rating
export const updateGameRating = async (gameId: string, newRating: number): Promise<{ newRating: number; newTotalRatings: number }> => {
  // Calculate new average rating
  const game = games.find(g => g.id === gameId);
  if (!game) {
    throw new Error('Game not found');
  }

  const newTotalRatings = game.totalRatings + 1;
  const newAverageRating = ((game.rating * game.totalRatings) + newRating) / newTotalRatings;

  // Save rating to localStorage
  localStorage.setItem(`game-rating-${gameId}`, newAverageRating.toString());
  localStorage.setItem(`game-total-ratings-${gameId}`, newTotalRatings.toString());

  // Update game object
  game.rating = newAverageRating;
  game.totalRatings = newTotalRatings;

  return {
    newRating: newAverageRating,
    newTotalRatings
  };
};

// Save comment to localStorage
export const saveComment = (gameId: string, comment: Comment) => {
  const comments = loadComments(gameId);
  comments.push(comment);
  localStorage.setItem(`game_${gameId}_comments`, JSON.stringify(comments));
  
  // Update game comments
  const game = games.find(g => g.id === gameId);
  if (game) {
    game.comments = comments;
  }
};

// Load saved ratings and comments for a game
const loadGameData = (gameId: string) => {
  const savedRating = localStorage.getItem(`game-rating-${gameId}`);
  const savedTotalRatings = localStorage.getItem(`game-total-ratings-${gameId}`);
  const savedComments = localStorage.getItem(`game_${gameId}_comments`);
  const savedPlays = localStorage.getItem(`game-plays-${gameId}`);

  // Ensure comments data is parsed correctly
  let comments = [];
  try {
    comments = savedComments ? JSON.parse(savedComments) : [];
    console.log(`Loaded ${comments.length} comments for game ${gameId}`);
  } catch (error) {
    console.error('Error parsing comments:', error);
    comments = [];
  }

  return {
    rating: savedRating ? parseFloat(savedRating) : 0,
    totalRatings: savedTotalRatings ? parseInt(savedTotalRatings) : 0,
    comments: comments,
    plays: savedPlays ? parseInt(savedPlays) : 0
  };
};

// Initialize games with saved data
const initializeGames = (games: Game[]): Game[] => {
  console.log('\n=== Games Comments Count Statistics ===');
  const initializedGames = games.map(game => {
    const savedData = loadGameData(game.id);
    console.log(`${game.title}: ${savedData.comments.length} comments`);
    return {
      ...game,
      rating: savedData.rating,
      totalRatings: savedData.totalRatings,
      comments: savedData.comments,
      plays: savedData.plays
    };
  });
  console.log('========================\n');
  return initializedGames;
};

export const games: Game[] = initializeGames([
  {
    id: '1',
    title: 'Light Academia vs Dark Academia',
    description: 'Explore the world of academia styles, choose between the bright and elegant Light Academia and the mysterious Dark Academia. Experience different academic cultures and aesthetic styles.',
    category: 'Simulation',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://bitent.com/html5/light_academia_vs_dark_academia/?key=y8&value=default',
    image: '/images/games/Light Academia vs Dark Academia.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Academic Style', 'Character Customization', 'Story Choices', 'Aesthetic Experience'],
    howToPlay: 'Click and drag to interact with the game, make your choices to explore different academic styles. Each choice will influence your character\'s development.',
    createdAt: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    title: 'TB World',
    description: 'Explore the cute teddy bear world in this warm and fun adventure game. Help teddy bears complete various tasks. Beautiful graphics and simple controls make it suitable for all ages.',
    category: 'Adventure',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://storage.y8.com/y8-studio/html5/Playgama/tb-world/?key=y8&value=default',
    image: '/images/games/TB World.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Cute Graphics', 'Puzzle Elements', 'Collection Tasks', 'Fun Story'],
    howToPlay: 'Use arrow keys to move, spacebar to interact. Collect items, solve puzzles, explore this warm teddy bear world.',
    createdAt: new Date('2024-01-02').toISOString()
  },
  {
    id: '3',
    title: 'Decor My Cabin',
    description: 'In this cozy cabin decoration game, unleash your creative talent to create a unique dream space. Choose various furniture, decorations, and color schemes to create your perfect cabin.',
    category: 'Simulation',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://storage.y8.com/y8-studio/html5/toni/decor_my_cabin_v2408211/?key=y8&value=default',
    image: '/images/games/Decor My Cabin.png',
    playTime: '10-20 minutes',
    plays: 0,
    features: ['Interior Design', 'Furniture Matching', 'Color Coordination', 'Free Creation'],
    howToPlay: 'Click to select different furniture and decorations, drag them to ideal positions. Try different combinations to create unique space atmosphere.',
    createdAt: new Date('2024-01-03').toISOString()
  },
  {
    id: '4',
    title: 'Fashion Repair',
    description: 'In this creative fashion game, become a clothing repair artist. Use your creativity and skills to repair various fashion items and make them shine again.',
    category: 'Simulation',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://storage.y8.com/y8-studio/html5/annu/fashion_repair/?key=y8&value=default',
    image: '/images/games/Fashion Repair.png',
    playTime: '5-10 minutes',
    plays: 0,
    features: ['Fashion Elements', 'Creative Design', 'Clothing Repair', 'Skill Challenge'],
    howToPlay: 'Click and drag to repair clothing. Choose appropriate tools and materials according to game prompts to give damaged clothes new life.',
    createdAt: new Date('2024-01-04').toISOString()
  },
  {
    id: '5',
    title: 'Expensive vs Cheap Fashion Challenge',
    description: 'In this fashion challenge game, face various fashion item choices. Choose between expensive designer pieces or affordable alternatives? Make your choices and create unique fashion styles.',
    category: 'Simulation',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://cdn.witchhut.com/html5/games/expensive-vs-cheap-fashion-challenge/263.html?key=y8&value=default',
    image: '/images/games/Expensive vs Cheap Fashion Challenge.png',
    playTime: '5-10 minutes',
    plays: 0,
    features: ['Fashion Matching', 'Budget Management', 'Style Selection', 'Trend Elements'],
    howToPlay: 'Click to select different fashion items, compare prices and styles, create your ideal look. Watch your budget and make smart fashion choices.',
    createdAt: new Date('2024-01-05').toISOString()
  },
  {
    id: '6',
    title: 'Melon Maker Fruit',
    description: 'In this fun fruit-making game, become a fruit artist. Use various fruits and tools to create unique fruit artworks.',
    category: 'Casual',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://storage.y8.com/y8-studio/unity_webgl/Playgama/melon_maker_fruit/?key=y8&value=default',
    image: '/images/games/Melon Maker Fruit.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Fruit Art', 'Creative Design', 'Tool Usage', 'Artwork Display'],
    howToPlay: 'Use mouse to select different fruits and tools, click and drag to cut and decorate fruits. Use creativity to make unique fruit artworks.',
    createdAt: new Date('2024-01-06').toISOString()
  },
  {
    id: '7',
    title: 'Luna and the Magic Maze',
    description: 'In this magical maze adventure game, help Luna through a maze filled with magic. Collect magical items, solve puzzles, and find the path to the end.',
    category: 'Adventure',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://storage.y8.com/y8-studio/html5/Playgama/luna_and_the_magic_maze/?key=y8&value=default',
    image: '/images/games/Luna and the Magic Maze.png',
    playTime: '10-20 minutes',
    plays: 0,
    features: ['Magic Elements', 'Puzzle Challenge', 'Maze Exploration', 'Collection Tasks'],
    howToPlay: 'Use arrow keys to move Luna, collect magical items, avoid obstacles. Use wisdom to solve puzzles in the maze and find the correct path.',
    createdAt: new Date('2024-01-07').toISOString()
  },
  {
    id: '8',
    title: 'Roxie Kitchen American Breakfast',
    description: 'In this delicious cooking game, become a breakfast chef. Prepare various American breakfasts for customers, from pancakes to waffles, creating delicious breakfast experiences.',
    category: 'Simulation',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://storage.y8.com/y8-studio/html5/annu/roxie_kitchen_american_breakfast/?key=y8&value=default',
    image: '/images/games/Roxie Kitchen American Breakfast.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Cooking Skills', 'Time Management', 'Customer Service', 'Recipe Collection'],
    howToPlay: 'Click to select ingredients and tools, prepare breakfast according to customer requirements. Pay attention to time management to ensure delicious food.',
    createdAt: new Date('2024-01-08').toISOString()
  },
  {
    id: '9',
    title: 'Bug Off Adventure',
    description: 'In this fun insect adventure game, help little insects complete various tasks. Explore the vibrant natural world and learn about insects.',
    category: 'Adventure',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://emea.iframed.cn.dmti.cloud/content/1952/bug-off/game/uk/efe-bugoff-250821-en.0617f1f2/index.html?key=y8&value=default',
    image: '/images/games/Bug Off Adventure.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Insect World', 'Nature Exploration', 'Fun Tasks', 'Educational Elements'],
    howToPlay: 'Use mouse to click and drag to help insects complete tasks. Collect items, solve puzzles, explore this vibrant insect world.',
    createdAt: new Date('2024-01-09').toISOString()
  },
  {
    id: '10',
    title: 'Paw Patrol Fun Games',
    description: 'Join the Paw Patrol adventure world! In this fun-filled game, complete various rescue missions with cute dogs.',
    category: 'Adventure',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://www.archive.play-games.com/games/swf/nick/PawPatrol/paw-patrol-fun-games/index.html?key=y8&value=default',
    image: '/images/games/Paw Patrol Fun Games.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Rescue Missions', 'Role Playing', 'Team Cooperation', 'Fun Challenges'],
    howToPlay: 'Choose your favorite Paw Patrol member, use arrow keys to move, complete various rescue missions. Help Adventure Bay residents solve problems.',
    createdAt: new Date('2024-01-10').toISOString()
  },
  {
    id: '11',
    title: 'Fun Adventure Quest',
    description: 'In this fun-filled adventure game, explore mysterious worlds, collect treasures, and solve puzzles. Beautiful graphics and simple controls make it suitable for all ages.',
    category: 'Adventure',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://html5.gamemonetize.co/ow2v99y6plh0nq6c7zsmrqahfq9avaam/?key=y8&value=default',
    image: '/images/games/Fun Adventure Quest.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Treasure Collection', 'Puzzle Elements', 'Adventure Exploration', 'Fun Levels'],
    howToPlay: 'Use arrow keys to move, spacebar to interact. Collect items, solve puzzles, explore this surprising adventure world.',
    createdAt: new Date('2024-01-11').toISOString()
  },
  {
    id: '12',
    title: '2048',
    description: 'Classic number merging puzzle game. Slide blocks to merge same numbers, aiming to reach 2048. Tests your strategic thinking and spatial imagination.',
    category: 'Puzzle',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://storage.y8.com/y8-studio/html5/akeemywka/2048/?key=y8&value=default',
    image: '/images/games/2048.png',
    playTime: '10-20 minutes',
    plays: 0,
    features: ['Number Merging', 'Strategic Thinking', 'Spatial Skills', 'Score System'],
    howToPlay: 'Use arrow keys to slide all blocks, blocks with same numbers will merge when they collide. Reach 2048 to win!',
    createdAt: new Date('2024-01-12').toISOString()
  },
  {
    id: '13',
    title: 'Tic Tac Toe',
    description: 'Classic Tic Tac Toe game. Take turns placing pieces on a 3x3 board, first to get three in a row wins. Simple and fun, tests your strategy.',
    category: 'Puzzle',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://storage.y8.com/y8-studio/html5/Gani/noughts_and_crosses_v5y817/?key=y8&value=default',
    image: '/images/games/Tic Tac Toe.png',
    playTime: '3-5 minutes',
    plays: 0,
    features: ['Two Player', 'Strategic Thinking', 'Simple Rules', 'Quick Game'],
    howToPlay: 'Click on empty spaces to place pieces, take turns until someone wins or it\'s a draw.',
    createdAt: new Date('2024-01-13').toISOString()
  },
  {
    id: '14',
    title: 'Jelly Crush',
    description: 'In this cute jelly-matching game, match same-colored jellies to eliminate them. Collect points and unlock new levels.',
    category: 'Puzzle',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://storage.y8.com/y8-studio/html5/akeemywka/jelly_crush_match/?key=y8&value=default',
    image: '/images/games/Jelly Crush.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Jelly Matching', 'Level System', 'Score Collection', 'Cute Graphics'],
    howToPlay: 'Click adjacent same-colored jellies to eliminate them, try to eliminate as many jellies as possible for high scores.',
    createdAt: new Date('2024-01-14').toISOString()
  },
  {
    id: '15',
    title: 'Candy Anime',
    description: 'In this sweet dress-up game, choose pretty candy-style clothes and accessories for cute anime characters. Create unique candy princess looks.',
    category: 'Simulation',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://static.dressupgames.com/leikir/2020/candy-anime/game.html?key=y8&value=default',
    image: '/images/games/Candy Anime.png',
    playTime: '5-10 minutes',
    plays: 0,
    features: ['Character Dress-up', 'Candy Style', 'Anime Elements', 'Creative Matching'],
    howToPlay: 'Click different clothes and accessories to dress up characters, create unique candy-style looks.',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '16',
    title: 'Eco Company',
    description: 'In this eco-themed management game, run an environmental company, develop sustainable energy, and protect the Earth\'s environment.',
    category: 'Simulation',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://html5.gamedistribution.com/e286d56c388a4e6bb7e1927796776319/?gd_sdk_referrer_url=https%3A%2F%2Fzh.y8.com%2Fgames%2Feco_inc_save_the_earth_planet&key=y8&value=default',
    image: '/images/games/Eco Company.png',
    playTime: '15-30 minutes',
    plays: 0,
    features: ['Eco Theme', 'Company Management', 'Energy Management', 'Environmental Protection'],
    howToPlay: 'Manage company resources, develop eco-friendly projects, balance economic benefits and environmental protection.',
    createdAt: new Date('2024-01-16').toISOString()
  },
  {
    id: '17',
    title: 'Bubble Shooter',
    description: 'In this classic bubble shooting game, shoot colored bubbles to eliminate matching ones. Test your aiming and strategic skills.',
    category: 'Casual',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://html5.gamedistribution.com/43dc8f80d5fc4f7b9564cdd37d9b74e1/?gd_sdk_referrer_url=https%3A%2F%2Fzh.y8.com%2Fgames%2Fbubble_shooter_pro&key=y8&value=default',
    image: '/images/games/Bubble Shooter.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Bubble Matching', 'Physics Effects', 'Level System', 'Score Collection'],
    howToPlay: 'Click screen to shoot bubbles, eliminate three or more same-colored bubbles.',
    createdAt: new Date('2024-01-17').toISOString()
  },
  {
    id: '18',
    title: 'Cursed Marbles',
    description: 'In this mysterious marble game, shoot magical marbles to break curses. Experience unique marble physics effects.',
    category: 'Casual',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://html5.gamedistribution.com/344ef038c9b94ae59307c5fa164044b3/?gd_sdk_referrer_url=https%3A%2F%2Fzh.y8.com%2Fgames%2Ftotemia_cursed_marbles&key=y8&value=default',
    image: '/images/games/Cursed Marbles.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Magic Marbles', 'Physics Effects', 'Puzzle Elements', 'Level System'],
    howToPlay: 'Shoot marbles, use physics effects and magical properties to break curses.',
    createdAt: new Date('2024-01-18').toISOString()
  },
  {
    id: '19',
    title: 'Golf Orbit',
    description: 'In this innovative golf game, control the ball rolling on tracks, avoid obstacles, and reach the finish line.',
    category: 'Casual',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://html5.gamedistribution.com/02ff01e6e9f7451ba28d889a2a55eec9/?gd_sdk_referrer_url=https%3A%2F%2Fzh.y8.com%2Fgames%2Fgolf_orbit&key=y8&value=default',
    image: '/images/games/Golf Orbit.png',
    playTime: '5-15 minutes',
    plays: 0,
    features: ['Track Rolling', 'Physics Effects', 'Level System', 'Time Challenge'],
    howToPlay: 'Control the ball rolling on tracks, avoid obstacles, reach the finish line quickly.',
    createdAt: new Date('2024-01-19').toISOString()
  },
  {
    id: '20',
    title: 'Tower Defense Master',
    description: 'In this strategic tower defense game, build defense towers, upgrade weapons, and repel enemy attacks. Test your strategic thinking.',
    category: 'Strategy',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://cdn2.addictinggames.com/addictinggames-content/ag-assets/content-items/html5-games/day-d-tower-rush/index.html?key=y8&ratio_tolerant=true&value=default',
    image: '/images/games/Tower Defense Master.png',
    playTime: '15-30 minutes',
    plays: 0,
    features: ['Tower Defense', 'Weapon Upgrade', 'Resource Management', 'Level Design'],
    howToPlay: 'Build defense towers, upgrade weapons, manage resources wisely, repel enemy attacks.',
    createdAt: new Date('2024-01-20').toISOString()
  },
  {
    id: '21',
    title: 'Cursed Treasure 2',
    description: 'In this pirate-themed strategy game, protect your treasure and repel invaders. Upgrade defense facilities to become the most powerful pirate.',
    category: 'Strategy',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://html5.gamedistribution.com/fd659a85ea0848c997c016e033b26799/?gd_sdk_referrer_url=https%3A%2F%2Fzh.y8.com%2Fgames%2Fcursed_treasure_2&key=y8&value=default',
    image: '/images/games/Cursed Treasure 2.png',
    playTime: '15-30 minutes',
    plays: 0,
    features: ['Pirate Theme', 'Defense System', 'Upgrade System', 'Resource Management'],
    howToPlay: 'Build defense facilities, upgrade weapons, protect treasure from invaders.',
    createdAt: new Date('2024-01-21').toISOString()
  },
  {
    id: '22',
    title: 'City Driver',
    description: 'In this realistic city driving simulation game, experience real driving sensations, follow traffic rules, and complete various driving missions.',
    category: 'Adventure',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://cdn2.addictinggames.com/addictinggames-content/ag-assets/content-items/html5-games/real-city-driver/index.html?key=y8&value=default',
    image: '/images/games/City Driver.png',
    playTime: '10-20 minutes',
    plays: 0,
    features: ['Realistic Driving', 'Traffic Rules', 'Mission System', 'Vehicle Selection'],
    howToPlay: 'Use arrow keys to control vehicle, follow traffic rules, complete various driving missions.',
    createdAt: new Date('2024-01-22').toISOString()
  },
  {
    id: '23',
    title: 'Ninja Hands',
    description: 'In this action adventure game, play as a ninja, use various ninjutsu and weapons to defeat enemies and complete missions.',
    category: 'Adventure',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://html5.gamedistribution.com/c8fe12a5e8a742c7b37b67d5b47c8794/?gd_sdk_referrer_url=https%3A%2F%2Fzh.y8.com%2Fgames%2Fninja_hands&key=y8&value=default',
    image: '/images/games/Ninja Hands.png',
    playTime: '10-20 minutes',
    plays: 0,
    features: ['Ninja Theme', 'Action Combat', 'Skill System', 'Level Challenge'],
    howToPlay: 'Use arrow keys to move, click screen to use ninjutsu, defeat enemies to complete missions.',
    createdAt: new Date('2024-01-23').toISOString()
  },
  {
    id: '24',
    title: 'Pirate Pillage',
    description: 'In this pirate adventure game, command your pirate ship, plunder resources, upgrade equipment, and become the most powerful pirate.',
    category: 'Adventure',
    rating: 0,
    totalRatings: 0,
    comments: [],
    gameUrl: 'https://html5.gamedistribution.com/aa5f214b87d24bdc96cb088d3960a7dd/?gd_sdk_referrer_url=https%3A%2F%2Fzh.y8.com%2Fgames%2Fsiege_hero_pirate_pillage&key=y8&value=default',
    image: '/images/games/Pirate Pillage.png',
    playTime: '15-30 minutes',
    plays: 0,
    features: ['Pirate Theme', 'Combat System', 'Equipment Upgrade', 'Resource Collection'],
    howToPlay: 'Command pirate ship, attack enemies, collect resources, upgrade equipment.',
    createdAt: new Date('2024-01-24').toISOString()
  }
]);

export type SortMethod = 'rating' | 'plays' | 'date' | 'comments';

export const sortGames = (games: Game[], method: SortMethod): Game[] => {
  return [...games].sort((a, b) => {
    switch (method) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'plays':
        return (b.plays || 0) - (a.plays || 0);
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'comments':
        // Reload comment data to ensure accuracy
        const aData = loadGameData(a.id);
        const bData = loadGameData(b.id);
        const aComments = aData.comments.length;
        const bComments = bData.comments.length;
        console.log(`Sorting by comments - ${a.title}: ${aComments} comments, ${b.title}: ${bComments} comments`);
        return bComments - aComments;
      default:
        return 0;
    }
  });
};

export const getGamesByCategory = (category: string, sortMethod: SortMethod = 'rating'): Game[] => {
  let filteredGames = category === 'All' ? games : games.filter(game => game.category === category);
  return sortGames(filteredGames, sortMethod);
};

export const searchGames = (query: string): Game[] => {
  const lowercaseQuery = query.toLowerCase();
  return games.filter(game => 
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.description.toLowerCase().includes(lowercaseQuery) ||
    game.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

// Update game play count
export const updateGamePlays = async (gameId: string): Promise<void> => {
  const game = games.find(g => g.id === gameId);
  if (game) {
    // Get current play count from localStorage
    const savedPlays = localStorage.getItem(`game-plays-${gameId}`);
    const currentPlays = savedPlays ? parseInt(savedPlays) : 0;
    
    // Increment play count
    const newPlays = currentPlays + 1;
    
    // Update localStorage
    localStorage.setItem(`game-plays-${gameId}`, newPlays.toString());
    
    // Update game object
    game.plays = newPlays;
    
    console.log(`Game ${game.title}: ${currentPlays} -> ${newPlays} plays`);
  }
};

// Print comment count for all games
export const printGameCommentsCount = () => {
  console.log('\n=== Games Comments Count Statistics ===');
  games.forEach(game => {
    const gameData = loadGameData(game.id);
    console.log(`${game.title}: ${gameData.comments.length} comments`);
  });
  console.log('========================\n');
}; 