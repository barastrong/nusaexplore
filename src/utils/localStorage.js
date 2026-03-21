const STORAGE_KEY = 'nusaexplore_game';

const DEFAULT_DATA = {
  keys: 1,
  unlockedRegions: [],
  claimedRewards: [],
  completed: [],
  currentProvince: null,
  onboardingDone: false,
};

export const getUserData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
      return { ...DEFAULT_DATA };
    }
    return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_DATA };
  }
};

const save = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
};

export const updateUserData = (updates) => {
  const data = getUserData();
  return save({ ...data, ...updates });
};

export const unlockRegion = (regionId, cost) => {
  const data = getUserData();
  if (data.keys < cost || data.unlockedRegions.includes(regionId)) return false;
  data.keys -= cost;
  data.unlockedRegions.push(regionId);
  return save(data);
};

export const setCurrentProvince = (regionId) => {
  const data = getUserData();
  data.currentProvince = regionId;
  return save(data);
};

export const completeGame = (regionId, keyReward) => {
  const data = getUserData();
  if (!data.completed.includes(regionId)) {
    data.completed.push(regionId);
    data.keys += keyReward;
  }
  return save(data);
};

export const claimProvinceReward = (regionId, amount) => {
  const data = getUserData();
  if (data.claimedRewards.includes(regionId)) return false;
  data.keys += amount;
  data.claimedRewards.push(regionId);
  return save(data);
};

export const hasClaimedReward = (regionId) => {
  const data = getUserData();
  return data.claimedRewards.includes(regionId);
};

export const setOnboardingDone = () => {
  const data = getUserData();
  data.onboardingDone = true;
  save(data);
};

export const getTheme = () => localStorage.getItem('nusaexplore_theme') || 'dark';
export const saveTheme = (theme) => localStorage.setItem('nusaexplore_theme', theme);
