// Utility untuk mengelola localStorage user data

const STORAGE_KEYS = {
  USER_DATA: 'nusaexplore_user_data',
  THEME: 'nusaexplore_theme',
};

// Default user data
const DEFAULT_USER_DATA = {
  keys: 1, // User dapat 1 key di awal
  unlockedRegions: [], // Tidak ada region yang unlocked di awal
  quizScores: {},
  puzzleScores: {},
  totalScore: 0,
  gamesPlayed: 0,
  completedGames: {}, // { provinceId: ['quiz', 'puzzle'] }
  claimedRewards: [], // [provinceId]
};

// Get user data
export const getUserData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    
    if (!data) {
      console.log('💾 [getUserData] No data found, initializing default:', DEFAULT_USER_DATA);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(DEFAULT_USER_DATA));
      return { ...DEFAULT_USER_DATA };
    }
    
    const userData = JSON.parse(data);
    // Ensure all required fields exist
    const mergedData = { ...DEFAULT_USER_DATA, ...userData };
    console.log('📖 [getUserData] Data loaded:', mergedData);
    return mergedData;
  } catch (error) {
    console.error('❌ [getUserData] Error reading user data:', error);
    return { ...DEFAULT_USER_DATA };
  }
};

// Save user data
export const saveUserData = (userData) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    console.log('✅ [saveUserData] Data saved successfully:', userData);
    return true;
  } catch (error) {
    console.error('❌ [saveUserData] Error saving user data:', error);
    return false;
  }
};

// Update specific field
export const updateUserData = (updates) => {
  const currentData = getUserData();
  const newData = { ...currentData, ...updates };
  console.log('🔄 [updateUserData] Updating:', updates);
  console.log('🔄 [updateUserData] New data:', newData);
  return saveUserData(newData);
};

// Add keys
export const addKeys = (amount) => {
  const userData = getUserData();
  userData.keys += amount;
  console.log(`🔑 [addKeys] Added ${amount} keys. Total: ${userData.keys}`);
  return saveUserData(userData);
};

// Unlock region
export const unlockRegion = (regionId, cost) => {
  const userData = getUserData();
  console.log(`🗺️ [unlockRegion] Attempting to unlock ${regionId} for ${cost} keys`);
  console.log(`🗺️ [unlockRegion] Current keys: ${userData.keys}`);
  console.log(`🗺️ [unlockRegion] Already unlocked:`, userData.unlockedRegions);
  
  if (userData.keys >= cost && !userData.unlockedRegions.includes(regionId)) {
    userData.keys -= cost;
    userData.unlockedRegions.push(regionId);
    console.log(`✅ [unlockRegion] Success! Remaining keys: ${userData.keys}`);
    return saveUserData(userData);
  }
  
  console.log(`❌ [unlockRegion] Failed - Insufficient keys or already unlocked`);
  return false;
};

// Mark game as completed for a province
export const markGameCompleted = (provinceId, gameType) => {
  const userData = getUserData();
  if (!userData.completedGames) {
    userData.completedGames = {};
  }
  if (!userData.completedGames[provinceId]) {
    userData.completedGames[provinceId] = [];
  }
  if (!userData.completedGames[provinceId].includes(gameType)) {
    userData.completedGames[provinceId].push(gameType);
    console.log(`🎮 [markGameCompleted] ${gameType} completed for ${provinceId}`);
  }
  return saveUserData(userData);
};

// Check if user has completed any game for a province
export const hasCompletedAnyGame = (provinceId) => {
  const userData = getUserData();
  const completed = userData.completedGames && userData.completedGames[provinceId];
  return completed && completed.length > 0;
};

// Check if reward can be claimed (completed game + not claimed yet)
export const canClaimReward = (provinceId) => {
  const userData = getUserData();
  return hasCompletedAnyGame(provinceId) && !userData.claimedRewards.includes(provinceId);
};

// Claim province reward
export const claimProvinceReward = (provinceId, keyReward) => {
  const userData = getUserData();
  console.log(`🎁 [claimProvinceReward] Attempting to claim reward for ${provinceId}`);
  
  if (!canClaimReward(provinceId)) {
    console.log(`❌ [claimProvinceReward] Cannot claim - either not completed or already claimed`);
    return false;
  }
  
  userData.keys += keyReward;
  if (!userData.claimedRewards) {
    userData.claimedRewards = [];
  }
  userData.claimedRewards.push(provinceId);
  console.log(`✅ [claimProvinceReward] Reward claimed! Keys: ${userData.keys}`);
  return saveUserData(userData);
};

// Check if reward already claimed
export const hasClaimedReward = (provinceId) => {
  const userData = getUserData();
  return userData.claimedRewards && userData.claimedRewards.includes(provinceId);
};

// Save quiz score
export const saveQuizScore = (regionId, score) => {
  const userData = getUserData();
  userData.quizScores[regionId] = score;
  userData.gamesPlayed++;
  userData.totalScore += score;
  console.log(`🎯 [saveQuizScore] Quiz score saved for ${regionId}: ${score}`);
  return saveUserData(userData);
};

// Save puzzle score
export const savePuzzleScore = (regionId, score) => {
  const userData = getUserData();
  userData.puzzleScores[regionId] = score;
  userData.gamesPlayed++;
  userData.totalScore += score;
  console.log(`🧩 [savePuzzleScore] Puzzle score saved for ${regionId}: ${score}`);
  return saveUserData(userData);
};

// Get theme
export const getTheme = () => {
  const theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  console.log('🎨 [getTheme] Theme loaded:', theme);
  return theme;
};

// Save theme
export const saveTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  console.log('🎨 [saveTheme] Theme saved:', theme);
};

// Reset user data
export const resetUserData = () => {
  console.log('🔄 [resetUserData] Resetting to default data');
  return saveUserData(DEFAULT_USER_DATA);
};
