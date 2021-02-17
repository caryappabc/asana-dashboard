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
import ProjectDetails from "./ProjectDetails";
import OpenProjects from "./OpenProjects";
import ProjectType from "./ProjectType";
import ItterationperMonth from "./ItterationperMonth";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const AntTabs = withStyles({
	root: {
		display: "flex",
		flexFlow: "row wrap",
	},
})(Tabs);

const AntTab = withStyles((theme) => ({
	root: {
		color: "#FFF",
		flex: 1,
		textTransform: "none",
		minWidth: 72,
		fontWeight: 400,
		fontSize: 16,
		marginRight: theme.spacing(3),
		marginLeft: theme.spacing(3),
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
			fontWeight: 900,
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
		color: "#FFF",
	},
	padding: {
		padding: theme.spacing(3),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	select: {
		color: "white",
		"&:before": {
			borderColor: "white",
		},
		"&:after": {
			borderColor: "white",
		},
	},
	icon: {
		fill: "white",
	},
}));

const Drawerlayout = ({ details, year }) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [reg, setRegion] = useState([]);
	const [month, setMonth] = useState([]);
	const [reqtype, setReqType] = useState([]);
	const [po, setPO] = useState([]);
	const [assignee, setAssignee] = useState([]);
	const [art, setArt] = useState([]);
	const [copy, setCopy] = useState([]);

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
			let po = it.customfield.find(function (field, index) {
				if (field.name === "Project Owner") {
					return field;
				}
			});
			let art1 = it.customfield.find(function (field, index) {
				if (field.name === "Art 1") {
					return field;
				}
			});
			let art2 = it.customfield.find(function (field, index) {
				if (field.name === "Art 2") {
					return field;
				}
			});
			let copy = it.customfield.find(function (field, index) {
				if (field.name === "Copywriter") {
					return field;
				}
			});
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
			let getart = (art1, atr2) => {
				let artT = [];
				let ar1 =
					typeof art1 === "undefined" || po === null
						? "none"
						: art1.enum_value != null
						? art1.enum_value.name
						: "none";
				let ar2 =
					typeof art1 === "undefined" || po === null
						? "none"
						: art2.enum_value != null
						? art2.enum_value.name
						: "none";
				if (ar1 === "none" && art2 === "none") {
					artT.push("none");
				} else if (ar1 === "none") {
					artT.push(ar2);
				} else if (ar2 === "none") {
					artT.push(ar1);
				} else {
					artT.push(ar1, ar2);
				}
				return artT;
			};
			let data = {
				Name: it.name,
				id: it.gid,
				"open/closed": it.completed ? "closed" : "open",
				section: it.section.filter(function (element) {
					return element !== undefined;
				}),
				assignee:
					typeof it.assignee === "undefined" || it.assignee === null
						? "none"
						: it.assignee != null
						? it.assignee.name
						: "none",
				po:
					typeof po === "undefined" || po === null
						? "none"
						: po.enum_value != null
						? po.enum_value.name
						: "none",
				art: getart(art1, art2),
				copy:
					typeof copy === "undefined" || copy === null
						? "none"
						: copy.enum_value != null
						? copy.enum_value.name
						: "none",
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
	const POs = [...new Set(fd.map((item) => item.po))];
	const artTeam = [
		...new Set(
			Array.prototype.concat.apply([], [...new Set(fd.map((item) => item.art))])
		),
	];
	const copyTeam = [...new Set(fd.map((item) => item.copy))];
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
	const handleArtChange = (event) => {
		setArt(event.target.value);
	};
	const handleCopyChange = (event) => {
		setCopy(event.target.value);
	};

	return (
		<div className={classes.root}>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-mutiple-name-label" style={{ color: "white" }}>
					Region
				</InputLabel>
				<Select
					labelId="demo-mutiple-name-label"
					id="demo-mutiple-name"
					multiple
					className={classes.select}
					inputProps={{ classes: { icon: classes.icon } }}
					disabled={[4, 5, 6].includes(value) ? true : false}
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
				<InputLabel id="demo-mutiple-name-label1" style={{ color: "white" }}>
					Month
				</InputLabel>
				<Select
					labelId="demo-mutiple-name-label1"
					id="demo-mutiple-name"
					multiple
					className={classes.select}
					inputProps={{ classes: { icon: classes.icon } }}
					disabled={[1, 3, 4].includes(value) ? true : false}
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
				<InputLabel id="demo-mutiple-name-label2" style={{ color: "white" }}>
					Request Type
				</InputLabel>
				<Select
					labelId="demo-mutiple-name-label2"
					id="demo-mutiple-name"
					multiple
					className={classes.select}
					inputProps={{ classes: { icon: classes.icon } }}
					disabled={[3, 5, 6].includes(value) ? true : false}
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
				<InputLabel id="demo-mutiple-name-label3" style={{ color: "white" }}>
					PO
				</InputLabel>
				<Select
					labelId="demo-mutiple-name-label3"
					id="demo-mutiple-name"
					multiple
					className={classes.select}
					inputProps={{ classes: { icon: classes.icon } }}
					disabled={[3, 5, 6].includes(value) ? true : false}
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
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-mutiple-name-label4" style={{ color: "white" }}>
					Art
				</InputLabel>
				<Select
					labelId="demo-mutiple-name-label4"
					id="demo-mutiple-name"
					multiple
					disabled
					className={classes.select}
					inputProps={{ classes: { icon: classes.icon } }}
					value={art}
					onChange={handleArtChange}
				>
					{artTeam.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-mutiple-name-label5" style={{ color: "white" }}>
					Copy
				</InputLabel>
				<Select
					labelId="demo-mutiple-name-label5"
					id="demo-mutiple-name"
					multiple
					className={classes.select}
					inputProps={{ classes: { icon: classes.icon } }}
					disabled={[0, 2, 3, 4, 5, 6].includes(value) ? true : false}
					value={copy}
					onChange={handleCopyChange}
				>
					{copyTeam.map((name) => (
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
				<AntTab label="Open Projects" {...a11yProps(4)} />
				<AntTab label="Project Type Summary" {...a11yProps(5)} />
				<AntTab label="Project Details" {...a11yProps(6)} />
			</AntTabs>

			<TabPanel value={value} index={0}>
				<Card className="container">
					<CardContent>
						<SummaryofIMS
							data={fd}
							region={reg}
							type={reqtype}
							po={po}
							assignee={assignee}
						/>
						<Typography variant="h5">
							Set Hours / Remaining Time per Month
						</Typography>
					</CardContent>
				</Card>
				<Card className="container">
					<CardContent>
						<HrsPerRegion
							data={fd}
							month={month}
							type={reqtype}
							po={po}
							assignee={assignee}
						/>
						<Typography variant="h5">
							Set Hours / Remaining Time per Region
						</Typography>
					</CardContent>
				</Card>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Card className="container">
					<CardContent>
						<TotalRequest
							data={fd}
							region={reg}
							type={reqtype}
							po={po}
							copy={copy}
							assignee={assignee}
						/>
						<Typography variant="h5">Total Num Request per Month</Typography>
					</CardContent>
				</Card>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Card className="container">
					<CardContent>
						<DelaybyMonth
							data={fd}
							region={reg}
							type={reqtype}
							po={po}
							assignee={assignee}
						/>
						<Typography variant="h5">Delay per Month</Typography>
					</CardContent>
				</Card>
				<Card className="container">
					<CardContent>
						<DelaybyRegion
							data={fd}
							month={month}
							type={reqtype}
							po={po}
							assignee={assignee}
						/>
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
							assignee={assignee}
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
			<TabPanel value={value} index={4}>
				<Card className="container">
					<CardContent>
						<OpenProjects data={fd} month={month} />
					</CardContent>
				</Card>
			</TabPanel>
			<TabPanel value={value} index={5}>
				<Card className="container">
					<CardContent>
						<ProjectType data={fd} month={month} />
					</CardContent>
				</Card>
			</TabPanel>
			<TabPanel value={value} index={6}>
				<Card className="container">
					<CardContent>
						<ProjectDetails data={fd} po={po} type={reqtype} />
					</CardContent>
				</Card>
			</TabPanel>
		</div>
	);
};

export default Drawerlayout;
