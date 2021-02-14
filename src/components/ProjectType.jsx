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

const ProjectType = ({ data, month }) => {
	if (month.length !== 0) {
		data = data.filter((d) => {
			return month.includes(d.Handshake_Month);
		});
	}

	let databypo = data.reduce((r, a) => {
		r[a.po] = [...(r[a.po] || []), a];
		return r;
	}, {});

	let typeofproj = [];
	let plotdata = [];
	for (const po in databypo) {
		let poname = po.split(" ", 2);
		let projbytype = databypo[po].reduce((r, a) => {
			r[a.Request_Type] = [...(r[a.Request_Type] || []), a];
			return r;
		}, {});
		let types = { po: poname[0] };
		for (const type in projbytype) {
			types[type] = projbytype[type].length;
		}
		plotdata.push(types);
		typeofproj.push(Object.keys(projbytype));
	}
	let typesofproj = [...new Set([].concat.apply([], typeofproj))];
	let getcolor = (type) => {
		switch (type) {
			case "Local Campaign":
				return "#CA2E55";
			case "Adapt translation":
				return "#773344";
			case "Long Form Content":
				return "#E3B5A4";
			case "Adapt":
				return "#A0A083";
			case "none":
				return "#4D6A6D";
			case "Video (new request)":
				return "#86BAA1";
			case "Tactical Brief":
				return "#656256";
			case "Global Campaign":
				return "#896A67";
			case "Global Campaign + Co-creation":
				return "#6B4D57";
			case "Video (minor tweaks)":
				return "#A63A50";
			case "Local Campaign - Adapt":
				return "#391C77";
			default:
				return "#0B0014";
		}
	};
	return (
		<BarChart
			width={1000}
			height={800}
			data={plotdata}
			layout="vertical"
			maxBarSize={40}
			margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis type="number" orientation="top" />
			<YAxis type="category" dataKey="po" />
			<Tooltip />
			<Legend
				verticalAlign="middle"
				align="left"
				layout="vertical"
				iconType="rect"
				iconSize={18}
			/>
			{typesofproj.map((type) => (
				<Bar key={type} dataKey={type} stackId="a" fill={getcolor(type)}>
					<LabelList dataKey={type} position="outside" fill="#FFF" />
				</Bar>
			))}
		</BarChart>
	);
};

export default ProjectType;
