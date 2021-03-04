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
import { Typography } from "@material-ui/core";

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

	let databycopy = data.reduce((r, a) => {
		r[a.copy] = [...(r[a.copy] || []), a];
		return r;
	}, {});

	let databyart = data.reduce((r, a) => {
		r[a.art] = [...(r[a.art] || []), a];
		return r;
	}, {});
	
	let databyregion = data.reduce((r, a) => {
		r[a.Region] = [...(r[a.Region] || []), a];
		return r;
	}, {});


	let typeofproj = [];
	let plotdata = [];
	let plotdata2 = [];
	let plotdata3 = [];
	let plotdata4 = [];
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

	for (const copy in databycopy) {
		let copyname = copy.split(" ", 2);
		let projbytype = databycopy[copy].reduce((r, a) => {
			r[a.Request_Type] = [...(r[a.Request_Type] || []), a];
			return r;
		}, {});
		let types = { copy: copyname[0] };
		for (const type in projbytype) {
			types[type] = projbytype[type].length;
		}
		plotdata2.push(types);
		typeofproj.push(Object.keys(projbytype));
	}
	for (const art in databyart) {
			let artname = art.split(" ", 2);
			let projbytype = databyart[art].reduce((r, a) => {
				r[a.Request_Type] = [...(r[a.Request_Type] || []), a];
				return r;
			}, {});
			let types = { art: artname[0] };
			for (const type in projbytype) {
				types[type] = projbytype[type].length;
			}
			plotdata3.push(types);
			typeofproj.push(Object.keys(projbytype));
		}

		for (const region in databyregion) {
			let projbytype = databyregion[region].reduce((r, a) => {
				r[a.Request_Type] = [...(r[a.Request_Type] || []), a];
				return r;
			}, {});
			let types = { region: region };
			for (const type in projbytype) {
				types[type] = projbytype[type].length;
			}
			plotdata4.push(types);
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
		<React.Fragment>
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
		<Typography>Project type per PO</Typography>

		<BarChart
			width={1000}
			height={800}
			data={plotdata2}
			layout="vertical"
			maxBarSize={40}
			margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis type="number" orientation="top" />
			<YAxis type="category" dataKey="copy" />
			<Tooltip />
			<Legend
				verticalAlign="middle"
				align="left"
				layout="vertical"
				iconType="rect"
				iconSize={18}
			/>
			{typesofproj.map((type) => (
				<Bar key={type} dataKey={type} stackId="b" fill={getcolor(type)}>
					<LabelList dataKey={type} position="outside" fill="#FFF" />
				</Bar>
			))}
		</BarChart>
		<Typography>Project type per Copy</Typography>

		<BarChart
			width={1000}
			height={800}
			data={plotdata3}
			layout="vertical"
			maxBarSize={40}
			margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis type="number" orientation="top" />
			<YAxis type="category" dataKey="art" />
			<Tooltip />
			<Legend
				verticalAlign="middle"
				align="left"
				layout="vertical"
				iconType="rect"
				iconSize={18}
			/>
			{typesofproj.map((type) => (
				<Bar key={type} dataKey={type} stackId="c" fill={getcolor(type)}>
					<LabelList dataKey={type} position="outside" fill="#FFF" />
				</Bar>
			))}
		</BarChart>
		<Typography>Project type per Art</Typography>

		<BarChart
			width={1000}
			height={800}
			data={plotdata4}
			layout="vertical"
			maxBarSize={40}
			margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis type="number" orientation="top" />
			<YAxis type="category" dataKey="region" />
			<Tooltip />
			<Legend
				verticalAlign="middle"
				align="left"
				layout="vertical"
				iconType="rect"
				iconSize={18}
			/>
			{typesofproj.map((type) => (
				<Bar key={type} dataKey={type} stackId="d" fill={getcolor(type)}>
					<LabelList dataKey={type} position="outside" fill="#FFF" />
				</Bar>
			))}
		</BarChart>
		<Typography>Project type per Region</Typography>
		</React.Fragment>
	);
};

export default ProjectType;
