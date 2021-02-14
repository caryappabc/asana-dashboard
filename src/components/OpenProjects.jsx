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

const OpenProjects = ({ data, month }) => {
	data = data.filter((d) => {
		return d["open/closed"] === "open";
	});

	if (!(month.length === 0)) {
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

	let plotdata = [];
	for (const po in databypo) {
		let poname = po.split(" ", 2);
		plotdata.push({
			po: poname[0],
			no_open_projects: databypo[po].length,
		});
	}

	let plotdata2 = [];
	for (const copy in databycopy) {
		let copyname = copy.split(" ", 2);
		plotdata2.push({
			copy: copyname[0],
			no_open_projects: databycopy[copy].length,
		});
	}

	let plotdata3 = [];
	for (const art in databyart) {
		let artname = art.split(" ", 2);
		plotdata3.push({
			art: artname[0],
			no_open_projects: databyart[art].length,
		});
	}

	return (
		<React.Fragment>
			<BarChart
				width={800}
				height={550}
				data={plotdata}
				layout="vertical"
				maxBarSize={40}
				margin={{ top: 50, right: 30, left: 50, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" />
				<YAxis type="category" dataKey="po" />
				<Tooltip />
				<Legend />
				<Bar dataKey="no_open_projects" fill="#2B4F69">
					<LabelList
						dataKey="no_open_projects"
						position="inside"
						fill="#FFFFFF"
					/>
				</Bar>
			</BarChart>
			<Typography>Open Project per PO</Typography>
			<BarChart
				width={800}
				height={550}
				data={plotdata2}
				layout="vertical"
				maxBarSize={40}
				margin={{ top: 50, right: 30, left: 50 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" />
				<YAxis type="category" dataKey="copy" />
				<Tooltip />
				<Legend />
				<Bar dataKey="no_open_projects" fill="#654153">
					<LabelList
						dataKey="no_open_projects"
						position="inside"
						fill="#FFFFFF"
					/>
				</Bar>
			</BarChart>
			<Typography>Open Project per Copy</Typography>
			<BarChart
				width={800}
				height={550}
				data={plotdata3}
				layout="vertical"
				maxBarSize={40}
				margin={{ top: 50, right: 20, left: 50, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis type="number" />
				<YAxis type="category" dataKey="art" />
				<Tooltip />
				<Legend />
				<Bar dataKey="no_open_projects" fill="#23857A">
					<LabelList
						dataKey="no_open_projects"
						position="inside"
						fill="#FFFFFF"
					/>
				</Bar>
			</BarChart>
			<Typography>Open Project per Art</Typography>
		</React.Fragment>
	);
};

export default OpenProjects;
