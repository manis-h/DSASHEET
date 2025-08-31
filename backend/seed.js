const mongoose = require('mongoose');
const DSASheet = require('./models/DSASheet');

mongoose.connect('mongodb://localhost:27017/dsa-sheet');

const levels = ['Easy', 'Medium', 'Tough'];

const generateProblems = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    title: `Problem ${i + 1}`,
    level: levels[Math.floor(Math.random() * levels.length)],
    youtubeLink: `https://youtube.com/fake-tutorial-${i + 1}`,
    leetcodeLink: `https://leetcode.com/problem-${i + 1}`,
    articleLink: `https://geeksforgeeks.org/fake-article-${i + 1}`,
    completedBy: []
  }));
};

const generateTopics = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    topicName: `Topic ${i + 1}`,
    problems: generateProblems(5)
  }));
};

const chapters = [
  { chapterName: 'Arrays', topics: generateTopics(3) },
  { chapterName: 'Strings', topics: generateTopics(2) },
  { chapterName: 'Linked Lists', topics: generateTopics(4) },
  { chapterName: 'Trees', topics: generateTopics(3) },
  { chapterName: 'Graphs', topics: generateTopics(2) }
];

seedData = async () => {
  await DSASheet.deleteMany({});
  await DSASheet.insertMany(chapters);
  console.log('✅ DSA Sheet data seeded');
  mongoose.disconnect();
};

// seedData();
// module.exports = { seedData };