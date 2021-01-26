import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
    YAxis,
    LabelList,
    CartesianGrid,
    ReferenceLine,
	Tooltip,
	Legend,
} from "recharts";
const ItterationperMonth = ({data}) => {
    let databymonths = data.reduce((r, a) => {
		r[a.Handshake_Month] = [...(r[a.Handshake_Month] || []), a];
		return r;
	}, {});
	let plotdata = [];

	for (const month in databymonths) {
        const sum = databymonths[month]
			.map((task) => Number(task.Current_ittr))
            .reduce((prev, curr) => prev + curr, 0);
            plotdata.push({
                month: month,
                Total_ittr : sum,
            });
    }

    return (
        <LineChart width={930} height={350} data={plotdata}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="month"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <ReferenceLine y={3} label="Benchmark" stroke="red"/>
       <Line type="monotone" dataKey="Total_ittr" stroke="#8884d8" >
       <LabelList dataKey="Total_ittr" position="top" />
       </Line>
      </LineChart>
    );
};

export default ItterationperMonth;