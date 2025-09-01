import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProgressSummary from './ProgressSummaryPopover';

export default function DSASheet({ token }) {
  const [chapters, setChapters] = useState([]);
  const [openTopics, setOpenTopics] = useState({});
const [refreshKey, setRefreshKey] = useState(0);

  const fetchChapters = () => {
    axios.get('https://dsasheet-production.up.railway.app/api/dsa', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => setChapters(res.data));
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const markComplete = async (problemId) => {
    try {
      const res = await axios.post(
        `https://dsasheet-production.up.railway.app/api/dsa/complete/${problemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.data.success === true) {
        fetchChapters();
              setRefreshKey(prev => prev + 1);
              
        Swal.fire({
          title: 'Success',
          text: 'Marked as completed!',
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to mark as completed.',
          icon: 'error'
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to mark as completed.',
        icon: 'error'
      });
    }
  };

  const toggleTopic = (topicId) => {
    setOpenTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  return (
    <div className=' bg-gradient-to-br from-blue-50 to-blue-100 p-6'>
<ProgressSummary token={token} refresh={refreshKey} />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
        DSA Sheet
      </h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {chapters.map(ch => (
          <div
            key={ch._id}
            className="bg-white shadow-xl rounded-2xl p-6 border border-yellow-400"
          >
            <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-yellow-400 pb-2 mb-4">
              {ch.chapterName}
            </h2>
            {ch.topics.map(topic => (
              <div key={topic._id} className="mb-6">
                <h3
                  className="text-xl font-semibold text-gray-700 mb-3 cursor-pointer flex items-center"
                  onClick={() => toggleTopic(topic._id)}
                >
                  <span>{topic.topicName}</span>
                  <span className="ml-2 text-yellow-500">
                    {openTopics[topic._id] ? '▼' : '▶'}
                  </span>
                </h3>
                <div className={openTopics[topic._id] ? 'space-y-4 block' : 'space-y-4 hidden'}>
                  {topic.problems.map(problem => (
                    <div
                      key={problem._id}
                      className="flex items-center justify-between p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <div>
                        <p className="text-lg font-medium text-gray-800">
                          {problem.title}{' '}
                          <span
                            className={
                              "text-sm " +
                              (problem.level === "Tough"
                                ? "text-red-600"
                                : problem.level === "Medium"
                                ? "text-yellow-600"
                                : "text-green-600")
                            }
                          >
                            Level-({problem.level})
                          </span>
                        </p>
                        <div className="flex space-x-6 mt-2 items-center">
                          <a
                            href={problem.youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-blue-600 hover:text-yellow-500"
                          >
                            <span className="text-3xl">📺</span>
                            <span className="text-xs mt-1">YouTube</span>
                          </a>
                          <a
                            href={problem.leetcodeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-blue-600 hover:text-yellow-500"
                          >
                            <span className="text-3xl">💻</span>
                            <span className="text-xs mt-1">LeetCode</span>
                          </a>
                          <a
                            href={problem.articleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center text-blue-600 hover:text-yellow-500"
                          >
                            <span className="text-3xl">📖</span>
                            <span className="text-xs mt-1">Article</span>
                          </a>
                        </div>
                      </div>
                      <div>

                      <input
                        type="checkbox"
                        onChange={() => markComplete(problem._id)}
                        checked={problem.completed}
                        className="w-6 h-6 accent-yellow-500"
                        />
                        
                        </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
