import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Card, CardContent, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import HrsPerRegion from "./HrsPerRegion";
import SummaryofIMS from "./SummaryofIMS";
import TotalRequest from "./TotalRequest";
import DelaybyMonth from "./DelaybyMonth";
import DelaybyRegion from "./DelaybyRegion";
import DelaybyReason from "./DelaybyReason";
import ItterationperMonth from "./ItterationperMonth";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const AntTabs = withStyles({
	root: {
		borderBottom: "1px solid #e8e8e8",
	},
})(Tabs);

const AntTab = withStyles((theme) => ({
	root: {
		color: "black",
		textTransform: "none",
		minWidth: 72,
		fontWeight: 400,
		fontSize: 17,
		marginRight: theme.spacing(4),
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		"&:hover": {
			color: "#40a9ff",
			opacity: 1,
		},
		"&$selected": {
			color: "black",
			fontWeight: 600,
		},
		"&:focus": {
			color: "black",
		},
	},
	selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box component="span" m={1}>
					<Typography component={"span"} variant={"body2"}>
						{children}
					</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	padding: {
		padding: theme.spacing(3),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
}));

const Drawerlayout = ({ details, year }) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [reg, setRegion] = useState([]);
	const [month, setMonth] = useState([]);
	const [reqtype, setReqType] = useState([]);
	const [po, setPO] = useState([]);

	let Mname = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let dataset = [];
	details.map((gr) => {
		gr.map((it) => {
			let region = it.customfield.find(function (field, index) {
				if (field.name === "Region") {
					return field;
				}
			});
			let Hmonth = it.customfield.find(function (field, index) {
				if (field.name === "Handshake sent date") {
					return field;
				}
			});
			let sethours = it.customfield.find(function (field, index) {
				if (field.name === "Set Hours") {
					return field;
				}
			});
			let requesttype = it.customfield.find(function (field, index) {
				if (field.name === "Type of Request") {
					return field;
				}
			});
			let projectStatus = it.customfield.find(function (field, index) {
				if (field.name === "Project Status") {
					return field;
				}
			});
			let delayReasone = it.customfield.find(function (field, index) {
				if (field.name === "Reason for delay") {
					return field;
				}
			});
			let Citteration = it.customfield.find(function (field, index) {
				if (field.name === "Current Iteration No.") {
					return field;
				}
			});
			let data = {
				Name: it.name,
				id: it.gid,
				assignee:
					typeof it.assignee === "undefined" || it.assignee === null
						? "none"
						: it.assignee.name,
				Request_Type:
					typeof requesttype === "undefined"
						? "none"
						: requesttype.enum_value != null
						? requesttype.enum_value.name
						: "none",
				Region:
					typeof region === "undefined"
						? "none"
						: region.enum_value != null
						? region.enum_value.name
						: "none",
				Handshake_Month:
					typeof Hmonth === "undefined"
						? "none"
						: Hmonth.text_value != null
						? new Date(Hmonth.text_value).toLocaleString("default", {
								month: "long",
						  })
						: "none",
				Year:
					typeof Hmonth === "undefined"
						? "none"
						: Hmonth.text_value != null
						? new Date(Hmonth.text_value).getFullYear()
						: "none",
				Set_Hours:
					typeof sethours === "undefined" || sethours === null
						? 0
						: sethours.number_value,
				Project_status:
					typeof projectStatus === "undefined"
						? "none"
						: projectStatus.enum_value != null
						? projectStatus.enum_value.name
						: "none",
				Reason_for_delay:
					typeof delayReasone === "undefined"
						? "none"
						: delayReasone.enum_value != null
						? delayReasone.enum_value.name
						: "none",
				Current_ittr:
					typeof Citteration === "undefined"
						? 0
						: Citteration.enum_value != null
						? Citteration.enum_value.name
						: 0,
			};
			dataset.push(data);
		});
	});

	let fd = dataset.filter((d) => {
		return d.Year === year;
	});

	fd.sort(function (a, b) {
		return Mname.indexOf(a.Handshake_Month) - Mname.indexOf(b.Handshake_Month);
	});
	const regionname = [...new Set(fd.map((item) => item.Region))];
	const monthname = [...new Set(fd.map((item) => item.Handshake_Month))];
	const resttypelist = [...new Set(fd.map((item) => item.Request_Type))];
	const POs = [...new Set(fd.map((item) => item.assignee))];
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleRegionChange = (event) => {
		setRegion(event.target.value);
	};

	const handleMonthChange = (event) => {
		setMonth(event.target.value);
	};
	const handleRequestChange = (event) => {
		setReqType(event.target.value);
	};

	const handlePOChange = (event) => {
		setPO(event.target.value);
	};

	return (
		<div className={classes.root}>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-mutiple-name-label">Region</InputLabel>
				<Select
					labelId="demo-mutiple-name-label"
					id="demo-mutiple-name"
					multiple
					value={reg}
					onChange={handleRegionChange}
				>
					{regionname.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-mutiple-name-label">Month</InputLabel>
				<Select
					labelId="demo-mutiple-name-label"
					id="demo-mutiple-name"
					multiple
					value={month}
					onChange={handleMonthChange}
				>
					{monthname.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-mutiple-name-label">Request Type</InputLabel>
				<Select
					labelId="demo-mutiple-name-label"
					id="demo-mutiple-name"
					multiple
					value={reqtype}
					onChange={handleRequestChange}
				>
					{resttypelist.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-mutiple-name-label">PO</InputLabel>
				<Select
					labelId="demo-mutiple-name-label"
					id="demo-mutiple-name"
					multiple
					value={po}
					onChange={handlePOChange}
				>
					{POs.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<AntTabs
				value={value}
				onChange={handleChange}
				centered
				aria-label="ant example"
			>
				<AntTab label="Remaining Hours Summary" {...a11yProps(0)} />
				<AntTab label="No of Requests" {...a11yProps(1)} />
				<AntTab label="Delay Summary" {...a11yProps(2)} />
				<AntTab label="Iterations" {...a11yProps(3)} />
			</AntTabs>
			<TabPanel value={value} index={0}>
				<Card className="container">
					<CardContent>
						<SummaryofIMS data={fd} region={reg} type={reqtype} po={po} />
						<Typography variant="h5">
							Set Hours / Remaining Time per Month
						</Typography>
					</CardContent>
				</Card>
				<Card className="container">
					<CardContent>
						<HrsPerRegion data={fd} month={month} type={reqtype} po={po} />
						<Typography variant="h5">
							Set Hours / Remaining Time per Region
						</Typography>
					</CardContent>
				</Card>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Card className="container">
					<CardContent>
						<TotalRequest data={fd} region={reg} type={reqtype} po={po} />
						<Typography variant="h5">Total Num Request per Month</Typography>
					</CardContent>
				</Card>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Card className="container">
					<CardContent>
						<DelaybyMonth data={fd} region={reg} type={reqtype} po={po} />
						<Typography variant="h5">Delay per Month</Typography>
					</CardContent>
				</Card>
				<Card className="container">
					<CardContent>
						<DelaybyRegion data={fd} month={month} type={reqtype} po={po} />
						<Typography variant="h5">Delay per Region</Typography>
					</CardContent>
				</Card>
				<Card className="container">
					<CardContent>
						<DelaybyReason
							data={fd}
							region={reg}
							month={month}
							type={reqtype}
							po={po}
						/>
						<Typography variant="h5">Delay per Reason</Typography>
					</CardContent>
				</Card>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<Card className="container">
					<CardContent>
						<ItterationperMonth data={fd} region={reg} />
						<Typography className={classes.padding} variant="h5">
							No of Projects with Iteration above 2
						</Typography>
					</CardContent>
				</Card>
			</TabPanel>
		</div>
	);
};

export default Drawerlayout;
