import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

export const Orientation = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://corpsolutions.free.beeceptor.com/listacandidatos');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && (
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="PieChart"
          data={[
            ['Orientation', 'Count'],
            ...Object.entries(
              data.reduce((acc, curr) => {
                acc[curr.orientacaoSexual] = (acc[curr.orientacaoSexual] || 0) + 1;
                return acc;
              }, {})
            ),
          ]}
          options={{
            title: 'Candidatos por orientação sexual',
          }}
        />
      )}
    </div>
  );
};