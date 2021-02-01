import React from "react";
import {
	BarChart,
	Bar,
	LabelList,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const SummaryofIMS = ({ data, region, type, po }) => {
	data = data
		.filter((d) => {
			return d.Project_status !== "On Hold";
		})
		.filter((d) => d.Project_status !== "Cancelled");

	if (!(region.length === 0)) {
		data = data.filter((d) => {
			return region.includes(d.Region);
		});
	}

	if (!(type.length === 0)) {
		data = data.filter((d) => {
			return type.includes(d.Request_Type);
		});
	}

	if (!(po.length === 0)) {
		data = data.filter((d) => {
			return po.includes(d.assignee);
		});
	}

	let databymonths = data.reduce((r, a) => {
		r[a.Handshake_Month] = [...(r[a.Handshake_Month] || []), a];
		return r;
	}, {});

	let plotdata = [];

	for (const month in databymonths) {
		const sum = databymonths[month]
			.map((task) => task.Set_Hours)
			.reduce((prev, curr) => prev + curr, 0);

		const remaining = 2982 - sum;
		plotdata.push({
			month: month,
			hours: sum,
			remaining: remaining,
		});
	}

	return (
		<BarChart
			width={930}
			height={350}
			data={plotdata}
			maxBarSize={80}
			margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="hours" stackId="a" fill="#2B4F69">
				<LabelList dataKey="hours" position="inside" />
			</Bar>
			<Bar dataKey="remaining" stackId="a" fill="#FF995B">
				<LabelList dataKey="remaining" position="outside" />
			</Bar>
		</BarChart>
	);
};

export default SummaryofIMS;
