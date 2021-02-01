import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	LabelList,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const HrsPerRegion = ({ data, month, type, po }) => {
	data = data
		.filter((d) => {
			return d.Project_status !== "On Hold";
		})
		.filter((d) => d.Project_status !== "Cancelled");

	if (!(month.length === 0)) {
		data = data.filter((d) => {
			return month.includes(d.Handshake_Month);
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
		<BarChart
			width={930}
			height={350}
			data={plotdata}
			maxBarSize={80}
			margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="region" />
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

export default HrsPerRegion;
