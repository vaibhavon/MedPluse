export const createAnalytics = () => ({
  totalMessages: 0,
  userMessages: 0,
  botMessages: 0,
  lastActive: null,
});

export const updateAnalytics = (analytics, sender) => {
  analytics.totalMessages += 1;

  if (sender === "user") analytics.userMessages += 1;
  if (sender === "bot") analytics.botMessages += 1;

  analytics.lastActive = new Date().toLocaleTimeString();

  return { ...analytics };
};
