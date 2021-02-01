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

const DelaybyRegion = ({ data, type, month, po }) => {
	let delayed = data.filter((d) => {
		return d.Project_status === "Delay";
	});

	if (!(type.length === 0)) {
		delayed = delayed.filter((d) => {
			return type.includes(d.Request_Type);
		});
	}

	if (!(month.length === 0)) {
		delayed = delayed.filter((d) => {
			return month.includes(d.Handshake_Month);
		});
	}

	if (!(po.length === 0)) {
		delayed = delayed.filter((d) => {
			return po.includes(d.assignee);
		});
	}

	let delaybyregion = delayed.reduce((r, a) => {
		r[a.Region] = [...(r[a.Region] || []), a];
		return r;
	}, {});

	let plotdata = [];

	for (const region in delaybyregion) {
		let count = delaybyregion[region].length;
		plotdata.push({
			region: region,
			Num_of_delays: count,
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
			<Bar dataKey="Num_of_delays" fill="#2B4F69">
				<LabelList dataKey="Num_of_delays" position="top" />
			</Bar>
		</BarChart>
	);
};

export default DelaybyRegion;
