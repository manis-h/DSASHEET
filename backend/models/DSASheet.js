const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: String,
  level: { type: String, enum: ['Easy', 'Medium', 'Tough'] },
  youtubeLink: String,
  leetcodeLink: String,
  articleLink: String,
  completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const TopicSchema = new mongoose.Schema({
  topicName: String,
  problems: [ProblemSchema]
});

const ChapterSchema = new mongoose.Schema({
  chapterName: String,
  topics: [TopicSchema]
});

module.exports = mongoose.model('DSASheet', ChapterSchema);
