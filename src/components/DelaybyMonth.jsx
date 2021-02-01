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

const DelaybyMonth = ({ data, type, region, po }) => {
	let delayed = data.filter((d) => {
		return d.Project_status === "Delay";
	});

	if (!(region.length === 0)) {
		delayed = delayed.filter((d) => {
			return region.includes(d.Region);
		});
	}

	if (!(type.length === 0)) {
		delayed = delayed.filter((d) => {
			return type.includes(d.Request_Type);
		});
	}

	if (!(po.length === 0)) {
		delayed = delayed.filter((d) => {
			return po.includes(d.assignee);
		});
	}

	let delaybymonth = delayed.reduce((r, a) => {
		r[a.Handshake_Month] = [...(r[a.Handshake_Month] || []), a];
		return r;
	}, {});

	let plotdata = [];

	for (const month in delaybymonth) {
		let count = delaybymonth[month].length;
		plotdata.push({
			month: month,
			Num_of_delays: count,
		});
	}

	return (
		<BarChart
			width={930}
			height={350}
			data={plotdata}
			maxBarSize={60}
			margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="Num_of_delays" fill="#2B4F69">
				<LabelList dataKey="Num_of_delays" position="top" />
			</Bar>
		</BarChart>
	);
};

export default DelaybyMonth;
