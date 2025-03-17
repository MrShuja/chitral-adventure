// Website content
export const heroContent = {
  title: "Discover the Magic of Chitral",
  description: "Experience the untouched beauty, rich culture, and warm hospitality of Pakistan's most enchanting valley.",
  features: [
    "Stunning Landscapes",
    "Rich Cultural Heritage",
    "Adventure Activities",
    "Local Cuisine",
    "Historical Sites",
    "Traditional Festivals"
  ]
};

// Navigation items
export const navItems = [
  {
    id: 1,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    title: 'About Chitral',
    submenu: [
      {
        id: 'history',
        title: 'History',
        link: '/about/history',
      },
      {
        id: 'culture',
        title: 'Culture',
        link: '/about/culture',
      },
      {
        id: 'geography',
        title: 'Geography',
        link: '/about/geography',
      },
    ],
  },
  {
    id: 3,
    title: 'Blogs',
    link: '/blogs',
  },
  {
    id: 4,
    title: 'Gallery',
    link: '/gallery',
  },
  {
    id: 5,
    title: 'Contact',
    link: '/contact',
  },
];

// Blog posts data
export const blogPosts = [
  {
    id: "1",
    title: "A Journey Through Chitral's Ancient Traditions",
    slug: "journey-through-chitral-ancient-traditions",
    author: "Admin",
    publishDate: "2025-03-16T10:00:00.000Z",
    category: "Culture",
    tags: ["traditions", "culture", "history"],
    content: "<p>Discover the rich cultural heritage of Chitral...</p>",
    excerpt: "Explore the fascinating traditions that have shaped Chitral's identity over centuries.",
    featuredImage: "/images/blog/traditions.jpg",
    status: "published",
    seoTitle: "Ancient Traditions of Chitral - Cultural Heritage Guide",
    seoDescription: "Explore the rich cultural traditions of Chitral, from ancient customs to modern celebrations.",
    allowComments: true
  }
];

// Save blog post to content.js
export const savePost = async (post) => {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    // Read current content.js
    const contentPath = path.join(process.cwd(), 'src', 'data', 'content.js');
    let content = await fs.readFile(contentPath, 'utf-8');
    
    // Update or add new post
    if (post.id) {
      const index = blogPosts.findIndex(p => p.id === post.id);
      if (index !== -1) {
        blogPosts[index] = { ...post };
      }
    } else {
      post.id = crypto.randomUUID();
      blogPosts.push(post);
    }
    
    // Update content.js file
    const updatedContent = `${content.split('export const blogPosts = [')[0]}export const blogPosts = ${JSON.stringify(blogPosts, null, 2)};`;
    
    await fs.writeFile(contentPath, updatedContent, 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving blog post:', error);
    return false;
  }
};

// Get all blog posts
export const getPosts = () => {
  return [...blogPosts].sort((a, b) => 
    new Date(b.publishDate) - new Date(a.publishDate)
  );
};

// Get a single post by slug
export const getPost = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

// Delete a post
export const deletePost = async (id) => {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const index = blogPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      blogPosts.splice(index, 1);
      
      // Update content.js file
      const contentPath = path.join(process.cwd(), 'src', 'data', 'content.js');
      let content = await fs.readFile(contentPath, 'utf-8');
      const updatedContent = `${content.split('export const blogPosts = [')[0]}export const blogPosts = ${JSON.stringify(blogPosts, null, 2)};`;
      
      await fs.writeFile(contentPath, updatedContent, 'utf-8');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};

// About Chitral content
export const aboutChitral = {
  history: {
    title: 'History of Chitral',
    content: 'Chitral, historically known as Qashqar, was a princely state until 1969. The region has a rich history dating back to ancient times, serving as a crucial crossroad of various civilizations and trade routes along the historic Silk Road.',
    highlights: [
      'Ancient Buddhist Heritage',
      'Former Princely State',
      'Strategic Silk Road Location'
    ]
  },
  culture: {
    title: 'Cultural Heritage',
    content: 'Chitral\'s culture is a unique blend of various ethnic influences, including Kho, Kalash, and Islamic traditions. The region is famous for its distinctive music, festivals, and traditional crafts.',
    highlights: [
      'Kalash Valley Festivals',
      'Traditional Chitrali Music',
      'Local Arts and Crafts'
    ]
  },
  geography: {
    title: 'Geographic Features',
    content: 'Situated in the Hindu Kush mountain range, Chitral is home to some of the world\'s highest peaks and most spectacular landscapes. The region features diverse terrain from snow-capped mountains to lush valleys.',
    highlights: [
      'Tirich Mir Peak (7,708m)',
      'Chitral River Valley',
      'Alpine Meadows and Glaciers'
    ]
  },
};
