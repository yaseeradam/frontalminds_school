// Avatar loader utility
// Place your custom avatar images in public/avatars/ folder

export const loadCustomAvatars = () => {
  // This will load avatars from public/avatars/ folder
  // Supported formats: .png, .jpg, .jpeg, .gif, .svg
  
  const avatarContext = require.context('../../public/avatars', false, /\.(png|jpe?g|gif|svg)$/);
  
  try {
    const avatars = avatarContext.keys().map(key => {
      return `/avatars/${key.replace('./', '')}`;
    });
    
    return avatars.length > 0 ? avatars : null;
  } catch (error) {
    console.log('No custom avatars found, using defaults');
    return null;
  }
};

// Default emoji avatars (fallback)
export const defaultAvatars = [
  '😊', '🤓', '😎', '🥳', '🤩', '😇', '🦸', '🧙',
  '🦄', '🐱', '🐶', '🐼', '🦊', '🐸', '🦋', '🌟',
  '🚀', '🎨', '🎮', '⚽', '🎸', '📚', '🌈', '⭐'
];
