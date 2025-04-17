export interface Comment {
  id: string;
  username: string;
  content: string;
  rating: number;
  date: string;
}

export interface AITool {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  rating: number;
  totalRatings: number;
  comments: Comment[];
  toolUrl: string;
  usageTime?: string;
  visits?: number;
  features?: string[];
  howToUse?: string;
  createdAt: string; // ISO date string
  isFree: boolean;
  pricing?: string;
  country?: string; // Tool origin country
}

// Categories for AI tools
export const categories = [
  'All',
  'Chatbots',
  'AI Drawing',
  'Video Generation',
  'Video Editing',
  'Audio Generation',
  'AI Programming',
  'Productivity',
  'AI Music',
  'Data Processing',
  'AI Design',
  'PPT Generation'
];

// Get category emoji
export const getCategoryEmoji = (category: string) => {
  switch (category) {
    case 'AI Drawing':
      return '🎨';
    case 'Audio Generation':
      return '🎵';
    case 'Video Generation':
      return '🎬';
    case 'Video Editing':
      return '✂️';
    case 'AI Programming':
      return '💻';
    case 'Productivity':
      return '⚡';
    case 'Chatbots':
      return '🤖';
    case 'AI Music':
      return '🎹';
    case 'Data Processing':
      return '📊';
    case 'AI Design':
      return '🎭';
    case 'PPT Generation':
      return '📊';
    default:
      return '🤖';
  }
};

// Load saved comments
const loadComments = (toolId: string): Comment[] => {
  const savedComments = localStorage.getItem(`tool_${toolId}_comments`);
  return savedComments ? JSON.parse(savedComments) : [];
};

// Update AI tool rating
export const updateToolRating = async (toolId: string, newRating: number): Promise<{ newRating: number; newTotalRatings: number }> => {
  // Calculate new average rating
  const tool = aiTools.find(t => t.id === toolId);
  if (!tool) {
    throw new Error('AI tool not found');
  }

  const newTotalRatings = tool.totalRatings + 1;
  const newAverageRating = ((tool.rating * tool.totalRatings) + newRating) / newTotalRatings;

  // Save rating to localStorage
  localStorage.setItem(`tool-rating-${toolId}`, newAverageRating.toString());
  localStorage.setItem(`tool-total-ratings-${toolId}`, newTotalRatings.toString());

  // Update tool object
  tool.rating = newAverageRating;
  tool.totalRatings = newTotalRatings;

  return {
    newRating: newAverageRating,
    newTotalRatings
  };
};

// Save comment to localStorage
export const saveComment = (toolId: string, comment: Comment) => {
  const comments = loadComments(toolId);
  comments.push(comment);
  localStorage.setItem(`tool_${toolId}_comments`, JSON.stringify(comments));
  
  // Update tool comments
  const tool = aiTools.find(t => t.id === toolId);
  if (tool) {
    tool.comments = comments;
  }
};

// Load saved data for a tool
const loadToolData = (toolId: string) => {
  const savedRating = localStorage.getItem(`tool-rating-${toolId}`);
  const savedTotalRatings = localStorage.getItem(`tool-total-ratings-${toolId}`);
  const savedComments = localStorage.getItem(`tool_${toolId}_comments`);
  const savedVisits = localStorage.getItem(`tool-visits-${toolId}`);

  // Parse comments data
  let comments = [];
  try {
    comments = savedComments ? JSON.parse(savedComments) : [];
    console.log(`Loaded ${comments.length} comments for tool ${toolId}`);
  } catch (error) {
    console.error('Error parsing comments:', error);
    comments = [];
  }

  return {
    rating: savedRating ? parseFloat(savedRating) : 0,
    totalRatings: savedTotalRatings ? parseInt(savedTotalRatings) : 0,
    comments: comments,
    visits: savedVisits ? parseInt(savedVisits) : 0
  };
};

// Initialize tools with saved data
const initializeTools = (tools: AITool[]): AITool[] => {
  console.log('\n=== AI Tools Comments Count ===');
  const initializedTools = tools.map(tool => {
    const savedData = loadToolData(tool.id);
    console.log(`${tool.title}: ${savedData.comments.length} comments`);
    return {
      ...tool,
      rating: savedData.rating || tool.rating,
      totalRatings: savedData.totalRatings || tool.totalRatings,
      comments: savedData.comments || tool.comments,
      visits: savedData.visits || tool.visits || 0
    };
  });
  console.log('==============================\n');
  return initializedTools;
};

export const aiTools: AITool[] = initializeTools([
  {
    id: '1',
    title: 'ChatGPT',
    description: 'An AI-powered chatbot developed by OpenAI, known for generating human-like text responses based on the input it receives.',
    category: 'Chatbots',
    image: '/images/ai-logos/chatgpt.png',
    rating: 4.8,
    totalRatings: 15632,
    comments: [],
    toolUrl: 'https://chat.openai.com/',
    usageTime: '5m',
    visits: 345678,
    features: ['Text Generation', 'Answering Questions', 'Creative Writing', 'Code Help'],
    howToUse: 'Go to chat.openai.com and start typing your questions or prompts in the chat box.',
    createdAt: new Date('2022-11-30').toISOString(),
    isFree: true,
    pricing: 'Free tier available, ChatGPT Plus at $20/month',
    country: 'US'
  },
  {
    id: '2',
    title: 'DALL-E 3',
    description: 'An AI system by OpenAI that creates realistic images and art from natural language descriptions.',
    category: 'AI Drawing',
    image: '/images/ai-logos/DALL-E 3.png',
    rating: 4.7,
    totalRatings: 12345,
    comments: [],
    toolUrl: 'https://openai.com/dall-e-3',
    usageTime: '8m',
    visits: 234567,
    features: ['Image Generation from Text', 'Art Creation', 'Design Concepts', 'Visual Storytelling'],
    howToUse: 'Describe the image you want in detail, including style, subjects, colors, and composition.',
    createdAt: new Date('2023-10-10').toISOString(),
    isFree: false,
    pricing: 'Available with ChatGPT Plus ($20/month) or API credits',
    country: 'US'
  },
  {
    id: '3',
    title: 'Claude',
    description: 'An AI assistant created by Anthropic, designed to be helpful, harmless, and honest, with a focus on safety and beneficial use.',
    category: 'Chatbots',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg',
    rating: 4.7,
    totalRatings: 9876,
    comments: [],
    toolUrl: 'https://claude.ai/',
    usageTime: '6m',
    visits: 198765,
    features: ['Conversation', 'Text Analysis', 'Content Creation', 'Problem Solving'],
    howToUse: 'Visit claude.ai, sign up for an account, and start chatting with Claude by typing your questions or requests.',
    createdAt: new Date('2023-03-15').toISOString(),
    isFree: true,
    pricing: 'Free tier available, Claude Pro at $20/month',
    country: 'US'
  },
  {
    id: '4',
    title: 'Midjourney',
    description: 'An independent research lab that produces an AI program that creates images from textual descriptions.',
    category: 'AI Drawing',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    rating: 4.6,
    totalRatings: 18765,
    comments: [],
    toolUrl: 'https://www.midjourney.com/',
    usageTime: '10m',
    visits: 287654,
    features: ['AI Art Generation', 'Creative Imagery', 'Concept Visualization', 'Style Adaptation'],
    howToUse: 'Join the Midjourney Discord server, go to a newbies channel, and use /imagine command followed by your prompt.',
    createdAt: new Date('2022-07-12').toISOString(),
    isFree: false,
    pricing: 'Basic plan $10/month, Standard plan $30/month, Pro plan $60/month',
    country: 'US'
  },
  {
    id: '5',
    title: 'GitHub Copilot',
    description: 'An AI pair programmer developed by GitHub and OpenAI that suggests code completions and entire functions in real-time.',
    category: 'AI Programming',
    image: 'https://github.githubassets.com/images/modules/site/copilot/copilot-logo.svg',
    rating: 4.5,
    totalRatings: 14532,
    comments: [],
    toolUrl: 'https://github.com/features/copilot',
    usageTime: '15m',
    visits: 176543,
    features: ['Code Completion', 'Function Suggestions', 'Documentation Help', 'Multiple Language Support'],
    howToUse: 'Install the GitHub Copilot extension in your code editor (VS Code, etc.), then start typing code to see suggestions.',
    createdAt: new Date('2021-06-29').toISOString(),
    isFree: false,
    pricing: '$10/month for individuals, $19/user/month for businesses',
    country: 'US'
  },
  {
    id: '6',
    title: 'Notion AI',
    description: 'An AI writing assistant integrated into Notion that helps draft, edit, summarize, and expand text, enhancing your productivity within your notes and documents.',
    category: 'Productivity',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
    rating: 4.5,
    totalRatings: 8765,
    comments: [],
    toolUrl: 'https://www.notion.so/product/ai',
    usageTime: 'Continuous use',
    visits: 145678,
    features: ['Writing Assistant', 'Summarization', 'Translation', 'Brainstorming'],
    howToUse: 'In any Notion page, type /ai to access AI features. You can ask it to draft content, summarize text, or help brainstorm ideas.',
    createdAt: new Date('2023-02-22').toISOString(),
    isFree: false,
    pricing: '$10/month add-on for Notion users',
    country: 'US'
  },
  {
    id: '7',
    title: 'Voice123',
    description: 'Professional marketplace for voice actors offering high-quality voice over services for commercials, explainer videos, and other content.',
    category: 'Audio Generation',
    image: '/images/ai-logos/voice123.png',
    rating: 4.7,
    totalRatings: 7654,
    comments: [],
    toolUrl: 'https://voice123.com/',
    usageTime: '1-2 days',
    visits: 98765,
    features: ['Professional Voice Actors', 'Multiple Languages', 'Custom Projects', 'Commercial Usage'],
    howToUse: 'Post your project details, listen to auditions from voice actors, select your preferred talent, and receive the completed audio files.',
    createdAt: new Date('2022-10-15').toISOString(),
    isFree: false,
    pricing: 'Pay per project, prices vary based on project scope',
    country: 'US'
  },
  {
    id: '9',
    title: 'Perplexity AI',
    description: 'An AI-powered search engine that provides direct answers to questions by browsing the web and citing sources, offering a more efficient research experience.',
    category: 'Productivity',
    image: '/images/ai-logos/Perplexity AI.png',
    rating: 4.7,
    totalRatings: 5432,
    comments: [],
    toolUrl: 'https://www.perplexity.ai/',
    usageTime: '7m',
    visits: 132456,
    features: ['AI Search', 'Real-time Information', 'Source Citations', 'Conversational Interface'],
    howToUse: 'Go to perplexity.ai and enter your question in the search box to get detailed answers with sources.',
    createdAt: new Date('2022-08-01').toISOString(),
    isFree: false,
    pricing: 'Free tier available, Pro plan at $20/month',
    country: 'US'
  },
  {
    id: '10',
    title: 'DeepSeek',
    description: 'An advanced AI language model focusing on programming and code understanding, capable of generating accurate code solutions and providing technical explanations.',
    category: 'AI Programming',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/DeepSeek_logo.svg',
    rating: 4.6,
    totalRatings: 5432,
    comments: [],
    toolUrl: 'https://deepseek.com/',
    usageTime: '10m',
    visits: 78000,
    features: ['Code Generation', 'Programming Assistance', 'Technical Documentation', 'Language Understanding'],
    howToUse: 'Access through the DeepSeek website or API to leverage its capabilities for code generation and language processing tasks.',
    createdAt: new Date('2023-10-05').toISOString(),
    isFree: true,
    pricing: 'Free tier available, premium plans for commercial use',
    country: 'CN'
  },
  {
    id: '11',
    title: 'Tongyi Qianwen',
    description: 'An advanced large language model developed by Alibaba, specializing in Chinese language understanding and processing various tasks and queries.',
    category: 'Chatbots',
    image: '/images/ai-logos/Tongyi Qianwen.png',
    rating: 4.5,
    totalRatings: 8756,
    comments: [],
    toolUrl: 'https://qianwen.aliyun.com',
    usageTime: '2-3 minutes',
    visits: 154000,
    features: ['Chinese Optimization', 'Knowledge Q&A', 'Content Creation', 'Logical Reasoning'],
    howToUse: 'Enter your question or instruction in the chat box, and Tongyi Qianwen will provide responses based on its knowledge and understanding capabilities.',
    createdAt: new Date('2023-04-07').toISOString(),
    isFree: true,
    pricing: 'Free usage quota available, customizable enterprise services',
    country: 'CN'
  },
  {
    id: '12',
    title: 'Doubao',
    description: 'An AI assistant launched by ByteDance, based on advanced large language model technology, supporting multi-turn dialogues and various creative content generation.',
    category: 'Chatbots',
    image: '/images/ai-logos/Doubao.png',
    rating: 4.4,
    totalRatings: 6541,
    comments: [],
    toolUrl: 'https://www.doubao.com',
    usageTime: '2-3 minutes',
    visits: 121000,
    features: ['Conversation', 'Text Creation', 'Content Summarization', 'Knowledge Q&A'],
    howToUse: 'Enter your question or instruction in the dialogue interface, and Doubao will provide intelligent responses based on your needs.',
    createdAt: new Date('2023-07-12').toISOString(),
    isFree: true,
    pricing: 'Basic features free to use, premium features may require payment',
    country: 'CN'
  },
  {
    id: '13',
    title: 'Kimi',
    description: 'A next-generation AI assistant developed by Moonshot AI, focused on providing accurate, natural conversational experiences and high-quality content generation.',
    category: 'Chatbots',
    image: '/images/ai-logos/kimi.png',
    rating: 4.6,
    totalRatings: 5439,
    comments: [],
    toolUrl: 'https://kimi.moonshot.cn',
    usageTime: '2-3 minutes',
    visits: 98700,
    features: ['Knowledge Retrieval', 'Multi-turn Dialogue', 'Content Creation', 'File Processing'],
    howToUse: 'Enter your questions, upload files, or provide creative requirements in the chat interface, and Kimi will generate answers or content accordingly.',
    createdAt: new Date('2023-08-28').toISOString(),
    isFree: true,
    pricing: 'Basic features free, advanced features may require subscription',
    country: 'CN'
  },
  {
    id: '14',
    title: 'Hailuo AI',
    description: 'A Chinese AI assistant focused on everyday conversations and practical problem solving, providing users with a convenient AI interaction experience.',
    category: 'Chatbots',
    image: '/images/ai-logos/hailuo AI.png',
    rating: 4.2,
    totalRatings: 3245,
    comments: [],
    toolUrl: 'https://hailuoai.com',
    usageTime: '1-2 minutes',
    visits: 67000,
    features: ['Daily Q&A', 'Simple Interaction', 'Practical Advice', 'Emotional Communication'],
    howToUse: 'Open the website and enter your question or request directly in the dialogue box, and Hailuo AI will respond quickly.',
    createdAt: new Date('2023-09-10').toISOString(),
    isFree: true,
    pricing: 'Main features free to use',
    country: 'CN'
  },
  {
    id: '15',
    title: 'AiPPT',
    description: 'A professional AI-powered presentation generator that automatically creates beautiful slideshows from topics and outlines.',
    category: 'PPT Generation',
    image: '/images/ai-logos/Aippt.png',
    rating: 4.5,
    totalRatings: 4328,
    comments: [],
    toolUrl: 'https://aippt.com',
    usageTime: '3-5 minutes',
    visits: 86000,
    features: ['One-click Generation', 'Multiple Templates', 'Intelligent Layout', 'Auto Chart Creation'],
    howToUse: 'Enter your presentation topic and content outline, select your preferred style, and the system will automatically generate a complete presentation.',
    createdAt: new Date('2023-01-15').toISOString(),
    isFree: false,
    pricing: 'Free trial, premium features require subscription',
    country: 'CN'
  },
  {
    id: '16',
    title: 'Beautiful AI',
    description: 'Intelligent presentation tool that uses AI to automatically format and design, helping users quickly create professional-level presentations.',
    category: 'PPT Generation',
    image: '/images/ai-logos/Beautiful AI.png',
    rating: 4.7,
    totalRatings: 6543,
    comments: [],
    toolUrl: 'https://www.beautiful.ai',
    usageTime: '5-10 minutes',
    visits: 121000,
    features: ['Intelligent Design', 'Automatic Layout', 'Team Collaboration', 'Real-time Editing'],
    howToUse: 'Choose a template, add content, and the AI will automatically adjust the design to keep it attractive and professional. Drag-and-drop editing makes creating presentations simple.',
    createdAt: new Date('2022-05-10').toISOString(),
    isFree: false,
    pricing: 'Free trial available, full features require subscription, personal plans start at $12/month',
    country: 'US'
  },
  {
    id: '17',
    title: 'Xinghuo Chat',
    description: 'A Chinese large language model developed by IDEA Research, specializing in multimodal understanding, logical reasoning, and knowledge services.',
    category: 'Chatbots',
    image: '/images/ai-logos/xinghuo.png',
    rating: 4.5,
    totalRatings: 11567,
    comments: [],
    toolUrl: 'https://xinghuo.xfyun.cn/spark',
    usageTime: '2-5 minutes',
    visits: 236000,
    features: ['Multimodal Understanding', 'Knowledge Services', 'Strong Reasoning', 'Continuous Learning'],
    howToUse: 'Enter a question or prompt in the chat window, and Xinghuo will respond accordingly. It can handle text, images, logical reasoning, and knowledge-based queries.',
    createdAt: new Date('2022-12-01').toISOString(),
    isFree: true,
    pricing: 'Basic features are free, advanced features may require payment',
    country: 'CN'
  },
  {
    id: '18',
    title: 'Baidu Wenxin Yiyan',
    description: 'An AI language model from Baidu that provides creative writing assistance, knowledge Q&A, and content generation services.',
    category: 'Chatbots',
    image: '/images/ai-logos/Baidu Wenxin Yiyan.png',
    rating: 4.5,
    totalRatings: 12567,
    comments: [],
    toolUrl: 'https://yiyan.baidu.com/',
    usageTime: '2-5 minutes',
    visits: 456000,
    features: ['Creative Writing', 'Knowledge Q&A', 'Content Generation', 'Chinese-optimized'],
    howToUse: 'Enter a prompt or question in the interface, and Wenxin Yiyan will generate appropriate responses or content based on your input.',
    createdAt: new Date('2022-08-15').toISOString(),
    isFree: true,
    pricing: 'Free basic tier, professional features require subscription',
    country: 'CN'
  },
  {
    id: '20',
    title: 'Jimeng',
    description: 'A video creation platform launched by Jianying that turns text descriptions into high-quality videos, supporting various styles and scenes, simplifying the video production process.',
    category: 'Video Generation',
    image: '/images/ai-logos/Jimeng.png',
    rating: 4.6,
    totalRatings: 5678,
    comments: [],
    toolUrl: 'https://jimeng.jianying.com/ai-tool/home',
    usageTime: '5-10 minutes',
    visits: 95000,
    features: ['Text-to-Video', 'Multiple Styles', 'Rich Scenes', 'Professional Quality'],
    howToUse: 'Enter a description of the video content you want, select style and length, and Jimeng AI will generate a professional quality video based on your description.',
    createdAt: new Date('2023-03-10').toISOString(),
    isFree: true,
    pricing: 'Basic features free, advanced features and more export options may require payment',
    country: 'CN'
  },
  {
    id: '21',
    title: 'Kling',
    description: 'An AI video generation tool launched by Kuaishou that creates creative video content through simple text descriptions, suitable for short video and marketing content creation.',
    category: 'Video Generation',
    image: '/images/ai-logos/Kling.png',
    rating: 4.4,
    totalRatings: 4321,
    comments: [],
    toolUrl: 'https://klingai.kuaishou.com',
    usageTime: '3-8 minutes',
    visits: 82000,
    features: ['Text-to-Video', 'Style Selection', 'Marketing Content Generation', 'Quick Production'],
    howToUse: 'Enter a text description on the platform, select your desired video style, and Kling AI will create corresponding video content for you.',
    createdAt: new Date('2023-06-18').toISOString(),
    isFree: true,
    pricing: 'Provides free quota, advanced features may require payment',
    country: 'CN'
  },
  {
    id: '22',
    title: 'Tencent Hunyuan',
    description: 'An advanced large language model by Tencent with excellent capabilities in Chinese language understanding, content generation, and multimodal interactions.',
    category: 'Chatbots',
    image: '/images/ai-logos/Tencent Hunyuan.png',
    rating: 4.7,
    totalRatings: 9876,
    comments: [],
    toolUrl: 'https://hunyuan.tencent.com/',
    usageTime: '2-5 minutes',
    visits: 187000,
    features: ['Chinese Optimization', 'Multimodal Understanding', 'Industry Solutions', 'Enterprise Integration'],
    howToUse: 'Enter your query or request in the chat interface. Hunyuan accepts text inputs and can process various tasks including answering questions, generating content, and more.',
    createdAt: new Date('2023-04-11').toISOString(),
    isFree: true,
    pricing: 'Basic access is free, enterprise solutions and advanced features require payment',
    country: 'CN'
  },
  {
    id: '23',
    title: 'CapCut Pro',
    description: 'A professional video editing tool from ByteDance with integrated AI features, including intelligent editing, one-click background removal, speech-to-text, and more.',
    category: 'Video Editing',
    image: '/images/ai-logos/CapCut Pro.png',
    rating: 4.7,
    totalRatings: 12567,
    comments: [],
    toolUrl: 'https://www.capcut.cn',
    usageTime: '10-30 minutes',
    visits: 286000,
    features: ['AI Smart Editing', 'One-click Background Removal', 'Speech-to-Text', 'Rich Effects Library'],
    howToUse: 'Import your materials, use the smart editing feature to automatically generate an initial version, then use the rich editing tools for fine adjustments.',
    createdAt: new Date('2021-06-15').toISOString(),
    isFree: true,
    pricing: 'Basic features free, some advanced features and materials may require payment',
    country: 'CN'
  },
  {
    id: '24',
    title: 'Miaojian',
    description: 'An AI-powered smart video editing tool from WeChat that supports one-click intelligent editing, multiple effects and transitions, suitable for quickly creating social media content.',
    category: 'Video Editing',
    image: '/images/ai-logos/miaojian.png',
    rating: 4.3,
    totalRatings: 8765,
    comments: [],
    toolUrl: 'https://miaojian.weixin.qq.com/',
    usageTime: '5-20 minutes',
    visits: 189000,
    features: ['Smart Editing', 'WeChat Ecosystem Integration', 'Rich Templates', 'Quick Export'],
    howToUse: 'Upload video materials, choose automatic editing or use templates, add effects and music, then share directly to the WeChat ecosystem when finished.',
    createdAt: new Date('2022-03-10').toISOString(),
    isFree: true,
    pricing: 'Completely free',
    country: 'CN'
  },
  {
    id: '25',
    title: 'Bcut',
    description: 'An official video editing tool from Bilibili with integrated AI features, optimized for Bilibili content creation, making it convenient for creators to quickly produce high-quality videos.',
    category: 'Video Editing',
    image: '/images/ai-logos/Bcut.png',
    rating: 4.4,
    totalRatings: 9543,
    comments: [],
    toolUrl: 'https://bcut.bilibili.cn/',
    usageTime: '10-25 minutes',
    visits: 165000,
    features: ['Bilibili Style Templates', 'AI Smart Editing', 'Auto Caption Generation', 'One-click Publishing'],
    howToUse: 'Import materials, choose smart editing or manual editing, use built-in templates and effects, then publish directly to the Bilibili platform when finished.',
    createdAt: new Date('2022-01-20').toISOString(),
    isFree: true,
    pricing: 'Free to use',
    country: 'CN'
  },
  {
    id: '26',
    title: 'Cursor',
    description: 'The next-generation AI code editor that integrates powerful code generation, interpretation, and debugging features, helping developers improve programming efficiency.',
    category: 'AI Programming',
    image: '/images/ai-logos/cursor.png',
    rating: 4.7,
    totalRatings: 8765,
    comments: [],
    toolUrl: 'https://cursor.sh',
    usageTime: 'Continuous use',
    visits: 143000,
    features: ['Code Generation', 'Code Interpretation', 'Intelligent Debugging', 'Multi-language Support'],
    howToUse: 'Download and install the Cursor editor, then use shortcuts or commands to invoke AI features to generate code or get explanations.',
    createdAt: new Date('2023-02-08').toISOString(),
    isFree: true,
    pricing: 'Basic features are free, professional features may require subscription',
    country: 'US'
  },
  {
    id: '27',
    title: 'CodeGeeX',
    description: 'An open-source AI programming assistant that supports code generation, completion, and conversion for multiple programming languages, improving programming efficiency.',
    category: 'AI Programming',
    image: '/images/ai-logos/CodeGeeX.png',
    rating: 4.4,
    totalRatings: 5432,
    comments: [],
    toolUrl: 'https://codegeex.cn',
    usageTime: 'Continuous use',
    visits: 87000,
    features: ['Code Auto-completion', 'Multi-language Support', 'Comment Generation', 'Code Conversion'],
    howToUse: 'Install the CodeGeeX plugin in your IDE, and as you write code, it will automatically provide code completion and suggestions.',
    createdAt: new Date('2022-11-12').toISOString(),
    isFree: true,
    pricing: 'Open-source and free',
    country: 'CN'
  },
  {
    id: '28',
    title: 'Bolt.new',
    description: 'Fast code creation and sharing AI programming tool that enables real-time code writing and running, simplifying team collaboration and technical sharing.',
    category: 'AI Programming',
    image: '/images/ai-logos/Bolt.new.png',
    rating: 4.3,
    totalRatings: 3245,
    comments: [],
    toolUrl: 'https://bolt.new',
    usageTime: '5-15 minutes',
    visits: 54000,
    features: ['Real-time Code Running', 'AI Code Generation', 'Code Sharing', 'Multi-language Support'],
    howToUse: 'Visit the website, create a new project, use AI to assist in writing code, run tests, and share with team members with one click.',
    createdAt: new Date('2023-07-20').toISOString(),
    isFree: true,
    pricing: 'Basic features are free, team features may require payment',
    country: 'US'
  },
  {
    id: '29',
    title: 'Devv.ai',
    description: 'AI search engine for developers, focusing on programming problem solving, providing code examples and technical documentation to help developers find solutions quickly.',
    category: 'AI Programming',
    image: '/images/ai-logos/Devv.ai.png',
    rating: 4.5,
    totalRatings: 4875,
    comments: [],
    toolUrl: 'https://devv.ai',
    usageTime: '2-5 minutes',
    visits: 92000,
    features: ['Professional Technical Search', 'Code Examples', 'Document Integration', 'Problem Troubleshooting'],
    howToUse: 'Enter your programming problem or requirement in the search box, and Devv.ai will return the most relevant code examples, documentation, and solutions.',
    createdAt: new Date('2023-05-15').toISOString(),
    isFree: true,
    pricing: 'Currently free to use',
    country: 'US'
  },
  {
    id: '30',
    title: 'Meta Search/Secret AI Search',
    description: 'AI search engine that provides high-quality, in-depth information retrieval services, integrating multiple resources and providing references and sources.',
    category: 'Productivity',
    image: '/images/ai-logos/MetaSearch.png',
    rating: 4.4,
    totalRatings: 6543,
    comments: [],
    toolUrl: 'https://metaso.cn',
    usageTime: '1-3 minutes',
    visits: 127000,
    features: ['Deep Search', 'Content Integration', 'Source Referencing', 'Knowledge Exploration'],
    howToUse: 'Enter your question or keywords, and Secret AI will integrate information from multiple sources to provide a comprehensive answer and mark the information sources.',
    createdAt: new Date('2023-04-18').toISOString(),
    isFree: true,
    pricing: 'Basic features are free',
    country: 'CN'
  },
  {
    id: '31',
    title: 'Get Note',
    description: 'Intelligent note-taking tool that combines AI search, content organization, and knowledge management features, helping users collect and organize information more effectively.',
    category: 'Productivity',
    image: '/images/ai-logos/getbiji.png',
    rating: 4.5,
    totalRatings: 5421,
    comments: [],
    toolUrl: 'https://www.biji.com',
    usageTime: '5-15 minutes',
    visits: 89000,
    features: ['Intelligent Note-taking', 'AI Search Integration', 'Knowledge Management', 'Content Recommendation'],
    howToUse: 'Create a new note, use the AI search feature to find relevant information, and the system will automatically organize the content and provide intelligent suggestions to help build a knowledge system.',
    createdAt: new Date('2022-12-10').toISOString(),
    isFree: true,
    pricing: 'Basic features are free, advanced features require subscription',
    country: 'CN'
  },
  {
    id: '32',
    title: 'Suno',
    description: 'An AI platform that generates complete songs with vocals, lyrics, and instrumentals from text prompts, allowing anyone to create original music without musical skills.',
    category: 'Music',
    image: '/images/ai-logos/suno.png',
    rating: 4.8,
    totalRatings: 12543,
    comments: [],
    toolUrl: 'https://suno.ai/',
    usageTime: '2-10 minutes',
    visits: 165400,
    features: ['Complete Song Generation', 'Vocals Synthesis', 'Multiple Genres', 'Audio Export'],
    howToUse: 'Enter a detailed description of the song you want to create, including style, mood, and lyrics ideas. Suno will generate a complete song with vocals and instrumentals that you can download.',
    createdAt: new Date('2023-05-17').toISOString(),
    isFree: true,
    pricing: 'Free tier with limited generations, premium plans starting at $10/month',
    country: 'US'
  },
  {
    id: '33',
    title: 'Mubert',
    description: 'An AI music generation platform that creates royalty-free, customizable, and dynamic music for various use cases including content creation, apps, and retail spaces.',
    category: 'Music',
    image: '/images/ai-logos/Mubert.png',
    rating: 4.4,
    totalRatings: 7321,
    comments: [],
    toolUrl: 'https://mubert.com/',
    usageTime: '3-15 minutes',
    visits: 108700,
    features: ['Dynamic Music Generation', 'Text-to-Music', 'API Integration', 'Commercial Licensing'],
    howToUse: 'Describe the music you need or choose from preset moods and genres. Mubert will generate unlimited unique tracks that you can use royalty-free.',
    createdAt: new Date('2022-03-05').toISOString(),
    isFree: true,
    pricing: 'Free personal use, subscription plans for commercial use starting at $12/month',
    country: 'US'
  },
  {
    id: '34',
    title: 'ElevenLabs',
    description: 'An advanced AI voice technology platform offering realistic text-to-speech and voice cloning capabilities for content creators, publishers, and developers.',
    category: 'Voice',
    image: '/images/ai-logos/ElevenLabs.png',
    rating: 4.9,
    totalRatings: 15321,
    comments: [],
    toolUrl: 'https://elevenlabs.io/',
    usageTime: '1-10 minutes',
    visits: 203500,
    features: ['Ultra-Realistic Voices', 'Voice Cloning', 'Multiple Languages', 'Emotion Control'],
    howToUse: 'Enter your text, select a voice from the library or upload samples to clone a voice, adjust settings like stability and clarity, then generate high-quality audio output.',
    createdAt: new Date('2022-12-08').toISOString(),
    isFree: true,
    pricing: 'Free tier with limited characters, premium plans start at $5/month',
    country: 'US'
  },
  {
    id: '35',
    title: 'BeyondWords',
    description: 'An AI-powered text-to-speech platform designed specifically for publishers and content creators to convert articles and written content into natural-sounding audio.',
    category: 'Voice',
    image: '/images/ai-logos/BeyondWords.png',
    rating: 4.5,
    totalRatings: 6432,
    comments: [],
    toolUrl: 'https://beyondwords.io/',
    usageTime: '5-20 minutes',
    visits: 87600,
    features: ['Publisher-Focused', 'Automatic Article Conversion', 'Embedded Audio Player', 'Analytics'],
    howToUse: 'Connect your content feed or paste your article, customize voice settings and pronunciations, then publish the audio version to your website or distribute via RSS.',
    createdAt: new Date('2022-08-17').toISOString(),
    isFree: false,
    pricing: 'Plans start at $99/month for publishers',
    country: 'UK'
  },
  {
    id: '36',
    title: 'Voice.ai',
    description: 'Real-time voice changing and voice cloning technology powered by AI that allows users to transform their voice during calls, streaming, and recordings.',
    category: 'Voice',
    image: '/images/ai-logos/Voice.ai.png',
    rating: 4.3,
    totalRatings: 5876,
    comments: [],
    toolUrl: 'https://voice.ai/',
    usageTime: '2-30 minutes',
    visits: 135400,
    features: ['Real-Time Voice Changing', 'Voice Cloning', 'Gaming Integration', 'Privacy Focus'],
    howToUse: 'Download the application, select a voice filter or create a custom voice, and use it in real-time during calls, streams, or any application that uses your microphone.',
    createdAt: new Date('2023-02-21').toISOString(),
    isFree: true,
    pricing: 'Free basic features, premium subscription for advanced capabilities',
    country: 'US'
  },
  {
    id: '37',
    title: 'Recraft',
    description: 'Professional AI vector graphic generation tool that quickly creates icons, illustrations, and graphic designs with various styles and customization options.',
    category: 'AI Drawing',
    image: '/images/ai-logos/Recraft.png',
    rating: 4.6,
    totalRatings: 5678,
    comments: [],
    toolUrl: 'https://recraft.ai',
    usageTime: '2-5 minutes',
    visits: 98000,
    features: ['Vector Graphic Generation', 'Multiple Style Selection', 'SVG Export', 'Editable Design'],
    howToUse: 'Describe the graphic or icon you need, select a style and parameters, and Recraft AI will generate an editable vector graphic that can be used directly in design projects.',
    createdAt: new Date('2023-05-16').toISOString(),
    isFree: true,
    pricing: 'Basic features are free, advanced features and more export options require subscription',
    country: 'US'
  },
  {
    id: '38',
    title: 'Chuangkit',
    description: 'Online platform for plane design that integrates AI design features, offering a vast library of templates and intelligent design capabilities for marketing materials and social media content creation.',
    category: 'AI Design',
    image: '/images/ai-logos/创客贴.png',
    rating: 4.5,
    totalRatings: 9876,
    comments: [],
    toolUrl: 'https://www.chuangkit.com',
    usageTime: '5-20 minutes',
    visits: 265000,
    features: ['AI Design Assistant', 'Vast Template Library', 'Multi-scene Design', 'One-click Generation'],
    howToUse: 'Select a design type, use the AI assistant to generate an initial design, or customize based on templates, then publish the final result in various formats.',
    createdAt: new Date('2021-05-10').toISOString(),
    isFree: true,
    pricing: 'Basic features are free, some premium assets and features may require payment',
    country: 'CN'
  },
  {
    id: '39',
    title: 'JiShuDesign',
    description: 'Professional UI/UX design tool powered by AI that creates interface designs, components, and interactive prototypes with enhanced design efficiency.',
    category: 'AI Design',
    image: '/images/ai-logos/即时设计.png',
    rating: 4.6,
    totalRatings: 7654,
    comments: [],
    toolUrl: 'https://js.design',
    usageTime: '10-30 minutes',
    visits: 187000,
    features: ['AI Interface Generation', 'Component Library', 'Team Collaboration', 'Interactive Prototyping'],
    howToUse: 'Describe the interface or functionality you need, and AI will generate an initial design. Then use professional tools to adjust and refine, and finally export the design or prototype.',
    createdAt: new Date('2022-03-18').toISOString(),
    isFree: true,
    pricing: 'Basic features are free, team and advanced features require subscription',
    country: 'US'
  },
  {
    id: '40',
    title: 'Canva AI',
    description: 'Canva\'s integrated AI design assistant that generates professional designs from text prompts, including images, copy, and overall layout.',
    category: 'AI Design',
    image: '/images/ai-logos/Canva AI.png',
    rating: 4.8,
    totalRatings: 15678,
    comments: [],
    toolUrl: 'https://www.canva.com',
    usageTime: '5-15 minutes',
    visits: 435000,
    features: ['Magic Design', 'Copy Generation', 'AI Image Creation', 'One-click Layout'],
    howToUse: 'Use the Magic Design feature in Canva, describe your design needs, and AI will automatically generate a complete design that you can further edit and customize.',
    createdAt: new Date('2022-09-12').toISOString(),
    isFree: true,
    pricing: 'Basic features are free, advanced features require Canva Pro subscription',
    country: 'US'
  },
  {
    id: '41',
    title: 'LibLibAI',
    description: 'AI character image creation and customization tool focused on creating character images for comics, games, and animations in various styles.',
    category: 'AI Design',
    image: '/images/ai-logos/LibLibAI.png',
    rating: 4.6,
    totalRatings: 7654,
    comments: [],
    toolUrl: 'https://liblib.ai',
    usageTime: '3-10 minutes',
    visits: 93000,
    features: ['Character Creation', 'Style Variety', 'Pose Customization', 'Scene Creation'],
    howToUse: 'Describe the character features and style you want, LibLibAI will create the corresponding character image, and you can adjust details and generate character images in different scenes.',
    createdAt: new Date('2023-04-25').toISOString(),
    isFree: true,
    pricing: 'Limited free usage, full features require payment or subscription',
    country: 'US'
  },
  {
    id: '42',
    title: 'Gaoding AI',
    description: 'Leading AI design platform in China that offers image generation, design assistant, and intelligent image enhancement features for various design and creative work.',
    category: 'AI Design',
    image: '/images/ai-logos/Gaoding AI.png',
    rating: 4.6,
    totalRatings: 11234,
    comments: [],
    toolUrl: 'https://www.gaoding.com',
    usageTime: '5-20 minutes',
    visits: 198000,
    features: ['AI Image Generation', 'Intelligent Design Tool', 'Creative Templates', 'Image Enhancement'],
    howToUse: 'Select the AI tool you need, input a description or upload materials, and the system will intelligently process and generate the corresponding design results, which can be further edited and exported.',
    createdAt: new Date('2022-05-20').toISOString(),
    isFree: true,
    pricing: 'Basic features are free, advanced features and more resources require payment',
    country: 'CN'
  },
  {
    id: '50',
    title: 'AIVA',
    description: 'An AI composer that creates original music for films, commercials, games, and other content, capable of generating high-quality compositions in various styles.',
    category: 'Music',
    image: '/images/ai-logos/AIVA.png',
    rating: 4.6,
    totalRatings: 8432,
    comments: [],
    toolUrl: 'https://www.aiva.ai/',
    usageTime: '5-15 minutes',
    visits: 123500,
    features: ['Original Composition', 'Multiple Genres', 'Adjustable Parameters', 'Commercial Licenses'],
    howToUse: 'Select a musical style, adjust parameters like tempo and mood, and AIVA will compose an original piece. You can further customize and export the result.',
    createdAt: new Date('2021-07-23').toISOString(),
    isFree: true,
    pricing: 'Free version available, premium plans start at $15/month',
    country: 'LU'
  },
  {
    id: '52',
    title: 'Musicfy',
    description: 'An AI music generation tool that creates personalized, copyright-free music tracks for content creators, marketers, and personal use.',
    category: 'Music',
    image: '/images/ai-logos/Musicfy.png',
    rating: 4.3,
    totalRatings: 5432,
    comments: [],
    toolUrl: 'https://musicfy.lol/',
    usageTime: '2-8 minutes',
    visits: 76500,
    features: ['Personalized Music', 'Royalty-Free', 'Multiple Export Formats', 'Browser-Based'],
    howToUse: 'Select a music genre, customize parameters like mood and tempo, and let the AI generate your track. Preview, adjust, and download when satisfied.',
    createdAt: new Date('2023-01-10').toISOString(),
    isFree: true,
    pricing: 'Free tier with limited exports, premium plans for more features',
    country: 'US'
  },
  {
    id: '54',
    title: 'Soundraw',
    description: 'An AI music generation platform that creates original, royalty-free music for videos, podcasts, and other content based on mood and style selections.',
    category: 'Music',
    image: '/images/ai-logos/Soundraw.png',
    rating: 4.5,
    totalRatings: 6543,
    comments: [],
    toolUrl: 'https://soundraw.io/',
    usageTime: '5-15 minutes',
    visits: 89700,
    features: ['Mood-based Generation', 'Full Tracks', 'Customizable Length', 'Commercial Usage'],
    howToUse: 'Choose the mood, genre, and length for your track, then let the AI create matching music. You can adjust and customize the result before downloading.',
    createdAt: new Date('2022-06-14').toISOString(),
    isFree: false,
    pricing: '$16.99/month for unlimited downloads, or $9.99 for single track',
    country: 'JP'
  },
  {
    id: '60',
    title: 'Gemini',
    description: "Google's most advanced AI model, capable of understanding and generating text, code, images, and audio across multiple domains with strong reasoning abilities.",
    category: 'Chatbots',
    image: '/images/ai-logos/Gemini.png',
    rating: 4.7,
    totalRatings: 14532,
    comments: [],
    toolUrl: 'https://gemini.google.com/',
    usageTime: '2-5 minutes',
    visits: 278000,
    features: ['Multimodal Understanding', 'Advanced Reasoning', 'Code Generation', 'Content Creation'],
    howToUse: 'Visit gemini.google.com, sign in with your Google account, and start asking questions or uploading images for analysis.',
    createdAt: new Date('2023-12-06').toISOString(),
    isFree: true,
    pricing: 'Free version available, Gemini Advanced at $19.99/month',
    country: 'US'
  },
  {
    id: '61',
    title: 'Stable Diffusion',
    description: 'An open-source AI image generator capable of creating highly detailed images from text descriptions, supporting a variety of styles and concepts.',
    category: 'AI Drawing',
    image: '/images/ai-logos/stable difusion.png',
    rating: 4.6,
    totalRatings: 13652,
    comments: [],
    toolUrl: 'https://stablediffusionweb.com/',
    usageTime: '8m',
    visits: 245000,
    features: ['Text-to-Image Generation', 'Image Editing', 'Style Transfer', 'Concept Visualization'],
    howToUse: 'Use through platforms like Stability.ai, DreamStudio, or install locally if you have the technical expertise.',
    createdAt: new Date('2022-08-22').toISOString(),
    isFree: true,
    pricing: 'Free and open-source, with paid hosting options available',
    country: 'UK'
  },
  {
    id: '63',
    title: 'Adobe Firefly',
    description: 'A family of creative generative AI models by Adobe that allows users to generate and edit images, vectors, and text effects using natural language.',
    category: 'AI Drawing',
    image: '/images/ai-logos/Adobe Firefly.png',
    rating: 4.5,
    totalRatings: 11234,
    comments: [],
    toolUrl: 'https://firefly.adobe.com/',
    usageTime: '9m',
    visits: 198000,
    features: ['Text-to-Image', 'Image Editing', 'Vector Creation', 'Text Effects'],
    howToUse: 'Access through Adobe Creative Cloud, then use the text prompt field to describe the image you want to generate.',
    createdAt: new Date('2023-03-21').toISOString(),
    isFree: true,
    pricing: 'Limited free tier, full access with Creative Cloud subscription',
    country: 'US'
  },
  {
    id: '64',
    title: 'Anthropic Claude 3',
    description: 'Anthropic\'s most capable AI assistant family featuring Opus, Sonnet, and Haiku models with improved reasoning, reduced hallucinations, and better instruction following.',
    category: 'Chatbots',
    image: '/images/ai-logos/Claude.png',
    rating: 4.8,
    totalRatings: 13567,
    comments: [],
    toolUrl: 'https://claude.ai/',
    usageTime: '2-5 minutes',
    visits: 245000,
    features: ['Advanced Reasoning', 'Document Analysis', 'Long-context Understanding', 'Reduced Hallucinations'],
    howToUse: 'Type your question or upload documents for Claude to analyze. It excels at complex reasoning tasks and understanding nuanced instructions.',
    createdAt: new Date('2024-03-04').toISOString(),
    isFree: true,
    pricing: 'Free tier available, Claude Pro at $20/month, Team and Enterprise plans available',
    country: 'US'
  },
  {
    id: '65',
    title: 'Jasper AI',
    description: 'An AI content platform that helps businesses create marketing copy, social media posts, and long-form content with brand consistency and strategic focus.',
    category: 'Productivity',
    image: '/images/ai-logos/jasper.png',
    rating: 4.5,
    totalRatings: 9876,
    comments: [],
    toolUrl: 'https://www.jasper.ai/',
    usageTime: '5-20 minutes',
    visits: 156000,
    features: ['Marketing Copy Generation', 'Brand Voice Customization', 'SEO Optimization', 'Team Collaboration'],
    howToUse: 'Define your brand voice, select a content type, provide some context about what you want to create, and Jasper will generate professional marketing content.',
    createdAt: new Date('2021-02-15').toISOString(),
    isFree: false,
    pricing: 'Plans start at $49/month for Creator, $125/month for Teams',
    country: 'US'
  },
  {
    id: '66',
    title: 'Runway Gen-3',
    description: 'The next generation of Runway\'s video generation AI with improved quality, longer sequences, better visual continuity, and enhanced prompt following.',
    category: 'Video Generation',
    image: '/images/ai-logos/runway.png',
    rating: 4.8,
    totalRatings: 7843,
    comments: [],
    toolUrl: 'https://runwayml.com/',
    usageTime: '3-10 minutes',
    visits: 143000,
    features: ['High-quality Video Generation', 'Text-to-Video', 'Motion Brush', 'Director Mode'],
    howToUse: 'Enter a detailed text prompt describing the video you want to create, or use images as a starting point. Adjust settings for length, style, and motion to get your desired result.',
    createdAt: new Date('2024-04-23').toISOString(),
    isFree: false,
    pricing: 'Pro plan at $15/month, Unlimited at $35/month with higher resolution and more generations',
    country: 'US'
  },
  {
    id: '67',
    title: 'Mixtral',
    description: 'An advanced open-source large language model offering strong performance across multiple domains with impressive reasoning capabilities.',
    category: 'Chatbots',
    image: '/images/ai-logos/Mixtral.png',
    rating: 4.6,
    totalRatings: 8765,
    comments: [],
    toolUrl: 'https://mistral.ai/',
    usageTime: '2-5 minutes',
    visits: 132000,
    features: ['Open Weights', 'Efficient Computing', 'Strong Performance', 'Multilingual Support'],
    howToUse: 'Use through the Mistral AI platform Le Chat, or integrate into your applications using the available API. Can be accessed through various third-party platforms as well.',
    createdAt: new Date('2023-12-12').toISOString(),
    isFree: true,
    pricing: 'Open source weights available, with paid API access for commercial applications',
    country: 'FR'
  },
  {
    id: '68',
    title: 'Pi by Inflection',
    description: 'A personal AI assistant focused on helpfulness, harmlessness, and honesty, designed to build personal relationships with users and provide empathetic responses.',
    category: 'Chatbots',
    image: '/images/ai-logos/Pi by Inflection.png',
    rating: 4.7,
    totalRatings: 6543,
    comments: [],
    toolUrl: 'https://pi.ai/',
    usageTime: '2-5 minutes',
    visits: 110000,
    features: ['Personalized Relationship', 'Emotional Intelligence', 'Conversations with Context', 'Voice Interaction'],
    howToUse: 'Engage in natural conversations with Pi through text or voice. Pi remembers your past interactions and adapts its responses to build a relationship over time.',
    createdAt: new Date('2023-09-18').toISOString(),
    isFree: true,
    pricing: 'Free to use, with premium features planned for the future',
    country: 'US'
  },
  {
    id: '70',
    title: 'Character.AI',
    description: 'A platform for creating and conversing with AI characters based on real or fictional personalities, offering immersive and engaging interactions.',
    category: 'Chatbots',
    image: '/images/ai-logos/Character.AI.png',
    rating: 4.8,
    totalRatings: 14567,
    comments: [],
    toolUrl: 'https://character.ai/',
    usageTime: '5-20 minutes',
    visits: 195000,
    features: ['Character Creation', 'Role-playing', 'Custom Personalities', 'Community Sharing'],
    howToUse: 'Browse existing characters or create your own by defining their personality, knowledge, and speech patterns. Then start conversations with them in various scenarios.',
    createdAt: new Date('2022-09-21').toISOString(),
    isFree: true,
    pricing: 'Free tier available, C+ subscription at $9.99/month for premium features',
    country: 'US'
  },
  {
    id: '71',
    title: 'Tome',
    description: 'An AI-powered storytelling and presentation tool that transforms ideas into visually compelling narratives with minimal effort.',
    category: 'Productivity',
    image: '/images/ai-logos/tome.png',
    rating: 4.6,
    totalRatings: 9876,
    comments: [],
    toolUrl: 'https://tome.app/',
    usageTime: '5-15 minutes',
    visits: 143000,
    features: ['AI-Generated Presentations', 'Responsive Design', 'Rich Media Integration', 'Collaborative Editing'],
    howToUse: 'Enter a brief description of your presentation topic, and Tome will generate a complete narrative with text, images, and layout. You can then edit and refine as needed.',
    createdAt: new Date('2022-11-15').toISOString(),
    isFree: true,
    pricing: 'Free tier available, Pro plan at $10/month for advanced features',
    country: 'US'
  },
  {
    id: '72',
    title: 'Xiaohuanxiong',
    description: 'A specialized data processing platform that helps users analyze and visualize complex datasets with AI assistance, optimized for efficiency and accuracy.',
    category: 'Data Processing',
    image: '/images/ai-logos/xiaohuanxiong.png',
    rating: 4.5,
    totalRatings: 4321,
    comments: [],
    toolUrl: 'https://xiaohuanxiong.com/',
    usageTime: '5-15 minutes',
    visits: 87500,
    features: ['Data Analysis', 'Visualization Tools', 'AI-Assisted Processing', 'Pattern Recognition'],
    howToUse: 'Upload your dataset, select the analysis type you need, and let the AI process and generate insights. Adjust parameters for more specific analysis as needed.',
    createdAt: new Date('2023-04-15').toISOString(),
    isFree: true,
    pricing: 'Basic features free, premium features with subscription',
    country: 'CN'
  },
  {
    id: '73',
    title: 'DataChat',
    description: 'A conversational data analysis platform that allows users to interact with their data using natural language queries, making data science accessible to everyone.',
    category: 'Data Processing',
    image: '/images/ai-logos/datachat.png',
    rating: 4.6,
    totalRatings: 5678,
    comments: [],
    toolUrl: 'https://datachat.ai',
    usageTime: '3-10 minutes',
    visits: 92000,
    features: ['Natural Language Queries', 'Automated Analysis', 'Interactive Dashboards', 'Data Storytelling'],
    howToUse: 'Connect your data source, then ask questions in natural language about your data. DataChat will analyze and present answers with visualizations and insights.',
    createdAt: new Date('2022-09-20').toISOString(),
    isFree: false,
    pricing: 'Free trial available, business pricing based on data volume',
    country: 'US'
  },
  {
    id: '74',
    title: 'Haimian',
    description: 'An AI music generation platform that specializes in creating original compositions across various genres, allowing users to adjust style, mood, and instruments.',
    category: 'AI Music',
    image: '/images/ai-logos/haimian.png',
    rating: 4.7,
    totalRatings: 6789,
    comments: [],
    toolUrl: 'https://haimian.com',
    usageTime: '3-8 minutes',
    visits: 105000,
    features: ['Original Music Creation', 'Multiple Genre Support', 'Instrument Selection', 'Commercial Usage Rights'],
    howToUse: 'Select your preferred genre and mood, adjust instrument settings if desired, and let the AI generate a unique music piece tailored to your specifications.',
    createdAt: new Date('2023-02-10').toISOString(),
    isFree: true,
    pricing: 'Free tier with basic features, premium subscription for high-quality exports',
    country: 'CN'
  },
  {
    id: '75',
    title: 'ChordMate',
    description: 'A chord progression and melody generator that helps musicians and composers create harmonically rich music quickly using AI technology.',
    category: 'AI Music',
    image: '/images/ai-logos/chordmate.png',
    rating: 4.5,
    totalRatings: 4523,
    comments: [],
    toolUrl: 'https://chordmate.lazycomposer.com/',
    usageTime: '2-5 minutes',
    visits: 78000,
    features: ['Chord Progression Generator', 'Melody Creation', 'Style Adaptation', 'Export to DAW'],
    howToUse: 'Choose your desired key and style, generate chord progressions, and then add melodies. Adjust parameters to refine the music until you get the perfect result.',
    createdAt: new Date('2022-11-05').toISOString(),
    isFree: true,
    pricing: 'Free version with limited exports, premium starting at $9.99/month',
    country: 'US'
  },
  {
    id: '76',
    title: 'PixVerse',
    description: 'An advanced video generation platform that creates high-quality, customizable videos from text prompts, suitable for marketing, education, and entertainment.',
    category: 'Video Generation',
    image: '/images/ai-logos/pixverse.png',
    rating: 4.6,
    totalRatings: 7654,
    comments: [],
    toolUrl: 'https://pixverse.ai',
    usageTime: '5-12 minutes',
    visits: 125000,
    features: ['Text-to-Video', 'Scene Customization', 'Character Animation', 'Commercial Quality Output'],
    howToUse: 'Describe the video you want to create in detail, including characters, scenes, and actions. Adjust style and length settings, then let PixVerse generate your video.',
    createdAt: new Date('2023-05-18').toISOString(),
    isFree: false,
    pricing: 'Free trial with watermark, plans starting at $19.99/month',
    country: 'US'
  },
  {
    id: '77',
    title: 'Gamma',
    description: 'A presentation platform powered by AI that transforms simple text prompts into polished, visually stunning presentations with minimal effort.',
    category: 'PPT Generation',
    image: '/images/ai-logos/gamma.png',
    rating: 4.8,
    totalRatings: 9876,
    comments: [],
    toolUrl: 'https://gamma.app',
    usageTime: '3-8 minutes',
    visits: 187000,
    features: ['One-click Generation', 'Beautiful Templates', 'Web-based Presentations', 'Collaborative Editing'],
    howToUse: 'Enter your topic or outline, and Gamma will automatically create a well-structured presentation with appropriate visuals and formatting that you can further customize.',
    createdAt: new Date('2022-08-10').toISOString(),
    isFree: true,
    pricing: 'Free tier available, Pro plan at $8/month, Team plan at $16/user/month',
    country: 'US'
  },
  {
    id: '78',
    title: 'LivePPT',
    description: 'A real-time AI presentation creator that converts outlines and ideas into professionally designed slides with dynamic content and animations.',
    category: 'PPT Generation',
    image: '/images/ai-logos/liveppt.png',
    rating: 4.6,
    totalRatings: 5432,
    comments: [],
    toolUrl: 'https://www.designkit.com/ppt/',
    usageTime: '4-10 minutes',
    visits: 92000,
    features: ['Real-time Generation', 'Smart Layout', 'Data Visualization', 'Interactive Elements'],
    howToUse: 'Input your presentation content as bullet points or paragraphs, select a theme, and watch as LivePPT creates slides with appropriate images, charts, and formatting.',
    createdAt: new Date('2023-01-25').toISOString(),
    isFree: false,
    pricing: '7-day free trial, then $12.99/month for unlimited presentations',
    country: 'US'
  },
  {
    id: '79',
    title: 'Napkin',
    description: 'An innovative AI presentation tool that turns rough ideas into polished presentations, focusing on simplicity and effective visual storytelling.',
    category: 'PPT Generation',
    image: '/images/ai-logos/napkin.png',
    rating: 4.5,
    totalRatings: 4321,
    comments: [],
    toolUrl: 'https://napkin.ai',
    usageTime: '2-7 minutes',
    visits: 76000,
    features: ['Sketch-to-Slide', 'Minimalist Design', 'Quick Generation', 'Easy Sharing'],
    howToUse: 'Sketch your ideas or type a brief outline, and Napkin will transform them into clean, professional slides that communicate your message effectively.',
    createdAt: new Date('2023-03-12').toISOString(),
    isFree: true,
    pricing: 'Free for basic use, Premium at $10/month for advanced features',
    country: 'US'
  },
  {
    id: '80',
    title: 'Lovable',
    description: 'An AI-powered platform that transforms ideas into functional web applications without writing code, acting as your superhuman full stack engineer.',
    category: 'AI Programming',
    image: '/images/ai-logos/lovable.png',
    rating: 4.8,
    totalRatings: 12430,
    comments: [],
    toolUrl: 'https://lovable.dev/',
    usageTime: '5-20 minutes',
    visits: 190000,
    features: ['No-Code App Development', 'Instant Rendering', 'GitHub Integration', 'Beautiful Design'],
    howToUse: 'Describe what you want to build, and Lovable creates your first version. Improve it by asking for changes, then publish your project or sync your code via GitHub.',
    createdAt: new Date('2023-08-18').toISOString(),
    isFree: true,
    pricing: 'Free tier available, paid plans for more advanced features',
    country: 'US'
  },
  {
    id: '81',
    title: 'Linear',
    description: 'A purpose-built tool for planning and building products that streamlines issues, sprints, projects, and product roadmaps for modern software teams.',
    category: 'AI Programming',
    image: '/images/ai-logos/linear.png',
    rating: 4.7,
    totalRatings: 9870,
    comments: [],
    toolUrl: 'https://linear.app/',
    usageTime: 'Continuous use',
    visits: 215000,
    features: ['Project Planning', 'Issue Tracking', 'Roadmaps', 'Cycle Management'],
    howToUse: 'Set up your team, create projects and roadmaps, then track issues through customizable workflows. Linear helps your team build momentum with cycles and provides insights on progress.',
    createdAt: new Date('2019-05-22').toISOString(),
    isFree: true,
    pricing: 'Free tier for small teams, paid plans starting at $8/user/month',
    country: 'US'
  },
  {
    id: '82',
    title: 'Replit',
    description: 'A collaborative browser-based IDE with built-in AI capabilities that helps you turn ideas into apps fast, supporting all programming languages.',
    category: 'AI Programming',
    image: '/images/ai-logos/replit.png',
    rating: 4.9,
    totalRatings: 14560,
    comments: [],
    toolUrl: 'https://replit.com/',
    usageTime: '10-30 minutes',
    visits: 325000,
    features: ['Replit Agent AI', 'Collaborative Development', 'Cloud IDE', 'One-Click Deployments'],
    howToUse: 'Describe the app or site you want to create and let Replit Agent generate a build plan. Refine through feedback and launch your creation to a live URL in minutes.',
    createdAt: new Date('2016-03-15').toISOString(),
    isFree: true,
    pricing: 'Free tier with basic features, paid plans starting at $7/month',
    country: 'US'
  },
  {
    id: '83',
    title: 'Superhuman',
    description: 'The most productive email app ever made, designed to help you collaborate faster and get more done with AI-powered email management.',
    category: 'Productivity',
    image: '/images/ai-logos/superhuman.png',
    rating: 4.7,
    totalRatings: 8650,
    comments: [],
    toolUrl: 'https://superhuman.com/',
    usageTime: 'Daily use',
    visits: 185000,
    features: ['AI Email Writing', 'Split Inbox', 'Keyboard Shortcuts', 'Follow-up Reminders'],
    howToUse: 'Connect your email account and use Superhuman\'s intuitive interface and keyboard shortcuts to process emails quickly. The AI helps you write emails and manages your inbox efficiently.',
    createdAt: new Date('2017-10-01').toISOString(),
    isFree: false,
    pricing: '$30/month per user',
    country: 'US'
  },
  {
    id: '84',
    title: 'Granola',
    description: 'An AI productivity assistant that helps you manage your calendar, schedule meetings, and optimize your time automatically.',
    category: 'Productivity',
    image: '/images/ai-logos/granola.png',
    rating: 4.6,
    totalRatings: 5430,
    comments: [],
    toolUrl: 'https://www.granola.ai/',
    usageTime: 'Daily use',
    visits: 92000,
    features: ['Smart Scheduling', 'Calendar Management', 'Meeting Optimization', 'Time Analytics'],
    howToUse: 'Connect your calendar and email, then let Granola analyze your schedule and help you optimize your time. It schedules meetings automatically and ensures you have time for deep work.',
    createdAt: new Date('2022-11-15').toISOString(),
    isFree: true,
    pricing: 'Free tier available, premium features with subscription',
    country: 'US'
  },
  {
    id: '85',
    title: 'Grok',
    description: 'An AI assistant created by xAI that combines real-time knowledge with a witty personality, designed to answer questions with humor and provide practical information.',
    category: 'Chatbots',
    image: '/images/ai-logos/grok.png',
    rating: 4.7,
    totalRatings: 9840,
    comments: [],
    toolUrl: 'https://grok.com/',
    usageTime: '5-15 minutes',
    visits: 274000,
    features: ['Real-time Knowledge', 'Witty Responses', 'Internet Browsing', 'Complex Problem Solving'],
    howToUse: 'Ask Grok any question through the chat interface, and it will provide informative and often humorous responses. It can access real-time information from the internet to give you the latest answers.',
    createdAt: new Date('2023-11-04').toISOString(),
    isFree: false,
    pricing: 'Available as part of X Premium+ subscription at $16/month',
    country: 'US'
  }
]);

export type SortMethod = 'visits' | 'date' | 'alphabetical';

export const sortTools = (tools: AITool[], method: SortMethod): AITool[] => {
  const toolsCopy = [...tools];
  
  switch (method) {
    case 'visits':
      return toolsCopy.sort((a, b) => (b.visits || 0) - (a.visits || 0));
    case 'date':
      return toolsCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'alphabetical':
      return toolsCopy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return toolsCopy;
  }
};

export const getToolsByCategory = (category: string, sortMethod: SortMethod = 'visits'): AITool[] => {
  const filteredTools = category === 'All' ? aiTools : aiTools.filter(tool => tool.category === category);
  return sortTools(filteredTools, sortMethod);
};

export const searchTools = (query: string): AITool[] => {
  const lowerQuery = query.toLowerCase();
  return aiTools.filter(tool => 
    tool.title.toLowerCase().includes(lowerQuery) || 
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.category.toLowerCase().includes(lowerQuery)
  );
};

export const getToolById = (id: string): AITool | undefined => {
  return aiTools.find(tool => tool.id === id);
};

export const updateToolVisits = async (toolId: string): Promise<void> => {
  // Find the tool
  const tool = aiTools.find(t => t.id === toolId);
  if (!tool) {
    throw new Error('Tool not found');
  }

  // Get current visits from localStorage or default to 0
  const currentVisits = localStorage.getItem(`tool-visits-${toolId}`);
  const visits = currentVisits ? parseInt(currentVisits) : 0;
  
  // Update visits count
  const newVisits = visits + 1;
  localStorage.setItem(`tool-visits-${toolId}`, newVisits.toString());
  
  // Update tool object
  tool.visits = newVisits;
  
  console.log(`Updated visits for tool ${toolId} to ${newVisits}`);
};

export const printToolCommentsCount = () => {
  console.log('\n=== AI Tools Comments Count ===');
  aiTools.forEach(tool => {
    console.log(`${tool.title}: ${tool.comments?.length || 0} comments`);
  });
  console.log('==============================\n');
};

// Record and retrieve user's recently visited tools
const MAX_RECENT_VISITS = 8;

// Add tool to recently visited list
export const addToRecentVisits = (toolId: string) => {
  // Get existing recent visits record
  const recentVisits = localStorage.getItem('recent_visits') || '[]';
  let recentVisitsArray: string[] = JSON.parse(recentVisits);
  
  // If the tool is already in the list, remove it (it will be added to the top of the list in the next step)
  recentVisitsArray = recentVisitsArray.filter(id => id !== toolId);
  
  // Add current tool ID to the beginning of the list
  recentVisitsArray.unshift(toolId);
  
  // Keep only the most recent MAX_RECENT_VISITS records
  recentVisitsArray = recentVisitsArray.slice(0, MAX_RECENT_VISITS);
  
  // Save the updated list
  localStorage.setItem('recent_visits', JSON.stringify(recentVisitsArray));
};

// Get user's recently visited tools
export const getRecentlyVisitedTools = (): AITool[] => {
  try {
    const recentVisitsJson = localStorage.getItem('recent_visits') || '[]';
    const recentVisitIds = JSON.parse(recentVisitsJson) as string[];
    
    // If there are no visits, return the tools with the highest visits
    if (recentVisitIds.length === 0) {
      return sortTools([...aiTools], 'visits').slice(0, MAX_RECENT_VISITS);
    }
    
    // Find tools by visit ID and maintain order
    const recentTools: AITool[] = [];
    recentVisitIds.forEach(id => {
      const tool = aiTools.find(t => t.id === id);
      if (tool) {
        recentTools.push(tool);
      }
    });
    
    return recentTools;
  } catch (error) {
    console.error('Error getting recent visits:', error);
    return sortTools([...aiTools], 'visits').slice(0, MAX_RECENT_VISITS);
  }
}; 