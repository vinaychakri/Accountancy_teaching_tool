import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getAllComments } from "../router/apis";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    getAllComments().then((res) => {
      const topicAndRating = {};
      for (let i = 0; i < res.data.length; i++) {
        const comment = res.data[i];
        if (!topicAndRating[comment.title]) {
          topicAndRating[comment.title] = [];
        }
        topicAndRating[comment.title].push(parseFloat(comment.rating));
      }

      const data = Object.keys(topicAndRating).map((name) => ({
        topicName: name,
        averageRating:
          topicAndRating[name].reduce((sum, rating) => sum + rating, 0) /
          topicAndRating[name].length,
        averageRatingWithPercentage: `${
          topicAndRating[name].reduce((sum, rating) => sum + rating, 0) /
          topicAndRating[name].length
        }%`,
      }));

      setAnalytics(data);
    });
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 3; i++) {
      const darkValue = Math.floor(Math.random() * 10); // Adjusted range for darker colors
      color += letters[darkValue];
    }

    return color;
  };

  return (
    <div className='analytics-container'>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-lg-8 col-md-10'>
            <div className='card mt-3'>
              <div className='card-body'>
                <h2 className='card-title text-center'>Analytics</h2>
                <div className='pie-chart-container'>
                  <ResponsiveContainer
                    width='100%'
                    height={460}
                    className='mt-1'
                  >
                    <PieChart>
                      <Tooltip
                        formatter={(value, name, props) => [
                          props.payload.topicName,
                          props.payload.averageRatingWithPercentage,
                        ]}
                      />
                      <Legend
                        formatter={(value, entry) =>
                          `${entry.payload.topicName}`
                        }
                      />
                      <Pie
                        data={analytics}
                        dataKey='averageRating'
                        cx='50%'
                        cy='50%'
                        outerRadius={`${
                          window.innerWidth > 768
                            ? "70%"
                            : window.innerWidth > 500
                            ? "60%"
                            : "50%"
                        }`}
                        fill='#8884d8'
                        label
                      >
                        {analytics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getRandomColor()} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
