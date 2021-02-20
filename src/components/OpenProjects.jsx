import React, { useState } from "react";
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
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
}));

const OpenProjects = ({ data, month }) => {
	const classes = useStyles();
	const [status, setStatus] = useState([]);

	let statuses = [...new Set(data.map((item) => item.section[0]))];
	const handleStatusChange = (event) => {
		setStatus(event.target.value);
	};

	data = data.filter((d) => {
		return d["open/closed"] === "open";
	});

	if (!(month.length === 0)) {
		data = data.filter((d) => {
			return month.includes(d.Handshake_Month);
		});
	}

	if (!(status.length === 0)) {
		data = data.filter((d) => {
			return status.includes(d.section[0]);
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
		if (a.art.length === 1) {
			r[a.art] = [...(r[a.art] || []), a];
		}
		return r;
	}, {});

	let databyart2 = data.reduce((r, a) => {
		if (a.art.length !== 1) {
			r[a.art] = [...(r[a.art] || []), a];
		}
		return r;
	}, {});

	let plotdata3 = [];
	for (const art in databyart) {
		plotdata3.push({
			art: art,
			no_open_projects: databyart[art].length,
		});
	}

	for (const art in databyart2) {
		let ar = art.split(",");
		let newValue = databyart2[art].length / 2;
		ar.forEach(function (a) {
			plotdata3.find(function (item, index) {
				if (item.art === a) {
					item.no_open_projects = item.no_open_projects + newValue;
				}
			});
			const found = plotdata3.some((el) => el.art === a);
			if (!found) plotdata3.push({ art: a, no_open_projects: newValue });
		});
	}

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

	return (
		<React.Fragment>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-mutiple-name-label">Status</InputLabel>
				<Select
					labelId="demo-mutiple-name-label"
					id="demo-mutiple-name"
					multiple
					className={classes.select}
					inputProps={{ classes: { icon: classes.icon } }}
					value={status}
					onChange={handleStatusChange}
				>
					{statuses.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
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
				<Bar
					dataKey="no_open_projects"
					name="No of Open projects"
					fill="#2B4F69"
				>
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
				<Bar
					dataKey="no_open_projects"
					name="No of Open projects"
					fill="#654153"
				>
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
				<Bar
					dataKey="no_open_projects"
					name="No of Open projects"
					fill="#23857A"
				>
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
