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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	paper: {
		padding: "5px",
	},
	table: {
		minWidth: 650,
		backgroundColor: "grey",
	},
	bold: {
		fontWeight: "bold",
	},
	fontcolor: {
		color: "white",
	},
});

const DelaybyMonth = ({ data, type, region, po }) => {
	const classes = useStyles();
	const [value, setValue] = useState([]);

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
		let projectname = delaybymonth[month].map((i) => i.Name);
		plotdata.push({
			month: month,
			Num_of_delays: count,
			pName: projectname,
		});
	}

	const activeItem = plotdata[value];

	let handleClick = (event, index) => {
		if (index !== undefined) {
			setValue(index);
		}
	};

	return (
		<React.Fragment>
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
				<Tooltip content={plotdata.pName} />
				<Legend />
				<Bar dataKey="Num_of_delays" fill="#2B4F69" onClick={handleClick}>
					<LabelList dataKey="Num_of_delays" position="top" />
				</Bar>
			</BarChart>
			<TableContainer className={classes.paper} component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell className={classes.fontcolor}>
								<Typography className={classes.bold} varient="h1">
									Projects
									{activeItem !== undefined ? ` in ${activeItem.month}` : ""}
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{activeItem !== undefined ? (
							activeItem.pName.map((name) => (
								<TableRow key={name}>
									<TableCell className={classes.fontcolor}>{name}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell>Select to view Project name</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
};

export default DelaybyMonth;
