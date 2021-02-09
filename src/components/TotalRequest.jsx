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

const TotalRequest = ({ data, type, region, po }) => {
	if (!(type.length === 0)) {
		data = data.filter((d) => {
			return type.includes(d.Request_Type);
		});
	}

	if (!(region.length === 0)) {
		data = data.filter((d) => {
			return region.includes(d.Region);
		});
	}

	if (!(po.length === 0)) {
		data = data.filter((d) => {
			return po.includes(d.po);
		});
	}

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
		<LineChart
			width={930}
			height={350}
			data={plotdata}
			margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey="numofreq" stroke="#8884d8" strokeWidth="2">
				<LabelList dataKey="numofreq" position="top" />
			</Line>
		</LineChart>
	);
};

export default TotalRequest;
