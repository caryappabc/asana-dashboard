import React from "react";
import {
	BarChart,
	Bar,
	Brush,
	ReferenceLine,
	LabelList,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const SummaryofIMS = ({ data }) => {
	let databymonths = data.reduce((r, a) => {
		r[a.Handshake_Month] = [...(r[a.Handshake_Month] || []), a];
		return r;
	}, {});

	let plotdata = [];

	for (const month in databymonths) {
		const sum = databymonths[month]
			.map((task) => task.Set_Hours)
			.reduce((prev, curr) => prev + curr, 0);
		const remaining = 426 * 12 - sum;
		plotdata.push({
			month: month,
			hours: sum,
			remaining: remaining,
		});
	}

	return (
		<BarChart width={930} height={350} data={plotdata}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="hours" fill="#2B4F69">
				<LabelList dataKey="months" position="top" />
			</Bar>
			<Bar dataKey="remaining" fill="#FF995B" />
		</BarChart>
	);
};

export default SummaryofIMS;
