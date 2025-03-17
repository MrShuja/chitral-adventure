// Blog post data management
const STORAGE_KEY = 'chitral_blog_posts';

// Blog categories
export const categories = [
  'History',
  'Culture',
  'Adventure',
  'Travel Tips',
  'Local Food',
  'Festivals',
  'Nature',
  'Photography'
];

// Initialize posts from localStorage
let posts = [];

try {
  const savedPosts = localStorage.getItem(STORAGE_KEY);
  if (savedPosts) {
    posts = JSON.parse(savedPosts);
  }
} catch (error) {
  console.error('Error loading blog posts:', error);
}

// Save posts to localStorage
const savePosts = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return true;
  } catch (error) {
    console.error('Error saving blog posts:', error);
    return false;
  }
};

// Generate URL-friendly slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Add or update a blog post
export const savePost = (post) => {
  const now = new Date().toISOString();
  
  // If post has an ID, it's an update
  if (post.id) {
    const index = posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts[index] = {
        ...post,
        updatedAt: now
      };
    }
  } else {
    // New post
    posts.push({
      ...post,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    });
  }

  return savePosts();
};

// Get all blog posts
export const getPosts = () => {
  return [...posts].sort((a, b) => 
    new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt)
  );
};

// Get a single post by ID
export const getPost = (id) => {
  return posts.find(post => post.id === id);
};

// Delete a post
export const deletePost = (id) => {
  posts = posts.filter(post => post.id !== id);
  return savePosts();
};

// Get posts by category
export const getPostsByCategory = (category) => {
  return posts.filter(post => post.category === category);
};

// Get posts by status
export const getPostsByStatus = (status) => {
  return posts.filter(post => post.status === status);
};

// Search posts
export const searchPosts = (query) => {
  const searchTerm = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};
