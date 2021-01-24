import React from "react";
import {
	BarChart,
	Bar,
	Brush,
	ReferenceLine,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const BarGraphHrsPerMonth = ({ data }) => {
	let databyregion = data.reduce((r, a) => {
		r[a.Region] = [...(r[a.Region] || []), a];
		return r;
	}, {});

	let plotdata = [];

	for (const reg in databyregion) {
		const sum = databyregion[reg]
			.map((task) => task.Set_Hours)
			.reduce((prev, curr) => prev + curr, 0);
		const remaining = 426 * 12 - sum;
		plotdata.push({
			region: reg,
			hours: sum,
			remaining: remaining,
		});
	}

	return (
		<BarChart width={930} height={350} data={plotdata}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="region" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="hours" fill="#2B4F69" />
			<Bar dataKey="remaining" fill="#FF995B" />
		</BarChart>
	);
};

export default BarGraphHrsPerMonth;
