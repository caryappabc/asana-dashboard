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

const HrsPerRegion = ({ data, month, type, po, assignee }) => {
	data = data
		.filter((d) => {
			return d.Project_status !== "On Hold";
		})
		.filter((d) => d.Project_status !== "Cancelled");

	if (month.length !== 0) {
		data = data.filter((d) => {
			return month.includes(d.Handshake_Month);
		});
	}

	if (type.length !== 0) {
		data = data.filter((d) => {
			return type.includes(d.Request_Type);
		});
	}

	if (po.length !== 0) {
		data = data.filter((d) => {
			return po.includes(d.po);
		});
	}

	if (assignee.length !== 0) {
		data = data.filter((d) => {
			return assignee.includes(d.assignee);
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
		let remaining = databyregion[reg].map((task) => {
			if (reg === "NAM") {
				return 678.2 * 12 - sum;
			} else if (reg === "LAM") {
				return 418.5 * 12 - sum;
			} else if (reg === "Europe") {
				return 781.1 * 12 - sum;
			} else if (reg === "CEN") {
				return 732.1 * 12 - sum;
			} else if (reg === "WCA") {
				return 438.1 * 12 - sum;
			} else if (reg === "APA") {
				return 767.3 * 12 - sum;
			} else if (reg === "Africa") {
				return 438.1 * 12 - sum;
			} else if (reg === "none") {
				return 426 * 12 - sum;
			}
		});
		remaining = parseFloat(remaining).toFixed(1);
		plotdata.push({
			region: reg,
			hours: sum,
			remaining: Number(remaining),
		});
	}

	return (
		<BarChart
			width={930}
			height={350}
			data={plotdata}
			stackOffset="sign"
			maxBarSize={80}
			margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="region" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="hours" stackId="a" name="Consumed Hours" fill="#111244">
				<LabelList dataKey="hours" position="inside" fill="#FFFFFF" />
			</Bar>
			<Bar
				dataKey="remaining"
				stackId="a"
				name="Remaining Hours"
				fill="#00B6BB"
			>
				<LabelList dataKey="remaining" position="outside" />
			</Bar>
		</BarChart>
	);
};

export default HrsPerRegion;
