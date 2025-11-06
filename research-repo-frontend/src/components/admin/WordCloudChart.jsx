import React from "react";
import ReactWordcloud from "react-d3-cloud";

const WordCloudChart = ({ words }) => {
  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [15, 50],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">Keyword Cloud</h2>
      <div style={{ height: 300 }}>
        {/* <Wordcloud words={words} options={options} /> */}
      </div>
    </div>
  );
  console.log(words);
};

export default WordCloudChart;
