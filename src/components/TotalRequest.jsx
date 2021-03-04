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

const TotalRequest = ({ data, type, region, po, assignee, copy , art}) => {
	if (type.length !== 0) {
		data = data.filter((d) => {
			return type.includes(d.Request_Type);
		});
	}

	if (region.length !== 0) {
		data = data.filter((d) => {
			return region.includes(d.Region);
		});
	}

	if (po.length !== 0) {
		data = data.filter((d) => {
			return po.includes(d.po);
		});
	}

	if (art.length !== 0) {
		data = data.filter((d) => {
			return d.art.length === 2 ? art.includes(d.art[0]) || art.includes(d.art[1]) : art.includes(d.art[0]);
		});
	}


	if (copy.length !== 0) {
		data = data.filter((d) => {
			return copy.includes(d.copy);
		});
	}
	let databymonths = data.reduce((r, a) => {
		r[a.Handshake_Month] = [...(r[a.Handshake_Month] || []), a];
		return r;
	}, {});
	let plotdata = [];

	for (const month in databymonths) {
		const count = Object.keys(databymonths[month]).length;
		const projects_names = databymonths[month].map((d) => {
			return { Name: d.Name , Type: d.Request_Type, Region: d.Region };
		});
		plotdata.push({
			projectde : projects_names,
			month: month,
			numofreq: count,
		});
	}
	return (
		<React.Fragment>
		<LineChart
			width={1000}
			height={350}
			data={plotdata}
			margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line
				type="monotone"
				dataKey="numofreq"
				name="No of Projects"
				stroke="#8884d8"
				strokeWidth="3"
			>
				<LabelList dataKey="numofreq" position="top" />
			</Line>
		</LineChart>

		</React.Fragment>
	);
};

export default TotalRequest;
