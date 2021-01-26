import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	LabelList,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const TotalRequest = ({ data }) => {
	let databymonths = data.reduce((r, a) => {
		r[a.Handshake_Month] = [...(r[a.Handshake_Month] || []), a];
		return r;
	}, {});
	let plotdata = [];

	for (const month in databymonths) {
		const count = Object.keys(databymonths[month]).length;
		plotdata.push({
			month: month,
			numofreq: count,
		});
	}

	return (
		<LineChart width={930} height={350} data={plotdata}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line
				type="monotone"
				dataKey="numofreq"
				stroke="#8884d8"
				strokeWidth="2"
			>
			<LabelList dataKey="numofreq" position="top" />
			</Line>
		</LineChart>
	);
};

export default TotalRequest;
