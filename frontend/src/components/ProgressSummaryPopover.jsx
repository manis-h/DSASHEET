import { useEffect, useState } from "react";
import axios from "axios";

export default function ProgressSummary({ token,refresh }) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dsasheet-production.up.railway.app/api/dsa/progress", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProgress(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token, refresh]);

  if (loading)
    return <div className="text-center py-8">Loading progress...</div>;

  if (!progress)
    return <div className="text-center py-8 text-red-500">Failed to load progress</div>;

  const { completedCount, progressPercentage, overallPercentage } = progress;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-8 border border-yellow-400">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        Your Progress
      </h2>

      <div className="text-center mb-6">
        <span className="text-xl font-semibold text-gray-800">
          Overall: {overallPercentage}%
        </span>
      </div>

      <ul className="space-y-4">
        {/* Easy */}
        <li className="flex justify-between items-center">
          <span className="font-semibold text-green-700">Easy</span>
          <span className="text-lg">
            {completedCount.Easy || 0}/{progress.totalCount.Easy || 0} (
            {progressPercentage.Easy || 0}%)
          </span>
        </li>

        {/* Medium */}
        <li className="flex justify-between items-center">
          <span className="font-semibold text-yellow-600">Medium</span>
          <span className="text-lg">
            {completedCount.Medium || 0}/{progress.totalCount.Medium || 0} (
            {progressPercentage.Medium || 0}%)
          </span>
        </li>

        {/* Tough */}
        <li className="flex justify-between items-center">
          <span className="font-semibold text-red-600">Tough</span>
          <span className="text-lg">
            {completedCount.Tough || 0}/{progress.totalCount.Tough || 0} (
            {progressPercentage.Tough || 0}%)
          </span>
        </li>
      </ul>
    </div>
  );
}
