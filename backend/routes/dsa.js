const express = require("express");
const DSASheet = require("../models/DSASheet");
const authenticate = require("../middleware/middleware");
const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  const userId = req.user.id;
  const sheets = await DSASheet.find();

  const result = sheets.map((chapter) => ({
    _id: chapter._id,
    chapterName: chapter.chapterName,
    topics: chapter.topics.map((topic) => ({
      _id: topic._id,
      topicName: topic.topicName,
      problems: topic.problems.map((problem) => ({
        _id: problem._id,
        title: problem.title,
        level: problem.level,
        youtubeLink: problem.youtubeLink,
        leetcodeLink: problem.leetcodeLink,
        articleLink: problem.articleLink,
        completed: problem.completedBy
          .map((id) => id?.toString())
          .includes(userId.toString()),
      })),
    })),
  }));

  res.json(result);
});

// Mark problem as completed
router.post("/complete/:problemId", authenticate, async (req, res) => {
  const userId = req.user.id;
  const sheet = await DSASheet.findOne({
    "topics.problems._id": req.params.problemId,
  });

  sheet.topics.forEach((topic) => {
    topic.problems.forEach((problem) => {
      if (problem._id.toString() === req.params.problemId) {
        if (!problem.completedBy.includes(userId)) {
          problem.completedBy.push(userId);
        }
      }
    });
  });

  await sheet.save();
  res.status(200).json({
    message: "Progress updated",
    success: true
  });
});

router.get("/progress", authenticate, async (req, res) => {
  const userId = req.user.id;
  const sheets = await DSASheet.find();

  let totalCount = { Easy: 0, Medium: 0, Tough: 0 };
  let completedCount = { Easy: 0, Medium: 0, Tough: 0 };

  sheets.forEach(chapter => {
    chapter.topics.forEach(topic => {
      topic.problems.forEach(problem => {
        totalCount[problem.level]++;

        if (problem.completedBy.map(id => id?.toString()).includes(userId.toString())) {
          completedCount[problem.level]++;
        }
      });
    });
  });

  
  const progressPercentage = {};
  for (let level in totalCount) {
    if (totalCount[level] > 0) {
      progressPercentage[level] = ((completedCount[level] / totalCount[level]) * 100).toFixed(2);
    } else {
      progressPercentage[level] = "0.00";
    }
  }

  const totalProblems = totalCount.Easy + totalCount.Medium + totalCount.Tough;
  const totalCompleted = completedCount.Easy + completedCount.Medium + completedCount.Tough;
  const overall = totalProblems > 0 ? ((totalCompleted / totalProblems) * 100).toFixed(2) : "0.00";

  res.json({
    userId,
    totalCount,
    completedCount,
    progressPercentage,
    overallPercentage: overall
  });
});

module.exports = router;
