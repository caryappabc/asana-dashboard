import React, { useState, useEffect } from "react";
import "./App.css";
import asana from "asana";
import Drawerlayout from "./components/Drawerlayout";
import {
	Typography,
	CircularProgress,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
const token = process.env.REACT_APP_ACCESS_TOKEN;
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	header: {
		display: "flex",
		flexDirection: "row",
		alignItem: "center",
		justifyContent: "center",
		color: theme.palette.text.primary,
	},
	top: {
		backgroundColor: "#ffffff",
		backgroundImage: "linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%)",
		display: "flex",
		flexDirection: "row",
		alignItem: "center",
		justifyContent: "center",
		paddingTop: "40px",
	},
	year: {
		marginLeft: "20px",
	},
}));

const App = () => {
	const [taskDetails, setTaskDetails] = useState([]);
	const [loading, setLoading] = useState(true);
	const [didMount, setDidMount] = useState(false);
	const [yearsList, setYearsList] = useState([]);
	const [year, setYear] = useState();

	const client = asana.Client.create().useAccessToken(token);

	let projectids = process.env.REACT_APP_PROJECTIDS.split(",");
	const classes = useStyles();

	useEffect(() => {
		var currentYear = new Date().getFullYear();
		var years = [];
		var startYear = 2020;
		for (var i = startYear; i <= currentYear; i++) {
			years.push(startYear++);
		}
		setYearsList(years);
		setYear(currentYear);
	}, []);

	useEffect(() => {
		(async () => {
			setDidMount(true);
			let tasks = projectids.map((project) =>
				client.tasks
					.getTasksForProject(project, { limit: 100, opt_pretty: true })
					.then((result) => {
						return result.data.map((r) => r.gid);
					})
					.catch(function (error) {
						// handle error
						console.log(error);
					})
			);

			let taskdetails = await Promise.all(tasks).then((result) =>
				result.map((projects) =>
					projects.map((taskid) =>
						client.tasks
							.getTask(taskid, { opt_pretty: true })
							.then((taskdetails) => {
								return taskdetails;
							})
							.catch(function (error) {
								// handle error
								console.log(error);
							})
					)
				)
			);

			let vals = taskdetails.map(async (tp) => {
				let val = await Promise.all(tp).then((tpr) => {
					let dt = tpr.map((tk) => {
						let details = {
							gid: tk.gid,
							name: tk.name,
							completed_on: tk.completed_at,
							customfield: tk.custom_fields,
						};
						return details;
					});
					return dt;
				});
				return val;
			});

			await Promise.all(vals).then((data) => {
				setTaskDetails(data);
			});
			setLoading(false);
			return () => setDidMount(false);
		})();
	}, []);
	if (!didMount) {
		return null;
	}

	const handleChange = (event) => {
		setYear(event.target.value);
	};

	return (
		<div className="App">
			{loading === false ? (
				<div className={classes.root}>
					<Grid className={classes.top} container spacing={3}>
						<Grid item xs className={classes.header}>
							<Typography variant="h3">IMS Dashboard - Asana</Typography>
							<FormControl className={classes.year}>
								<InputLabel>Year</InputLabel>
								<Select value={year} onChange={handleChange}>
									{yearsList.map((y) => (
										<MenuItem key={y} value={y}>
											{y}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs>
							<Drawerlayout details={taskDetails} year={year} />
						</Grid>
					</Grid>
				</div>
			) : (
				<div className="Loading">
					<CircularProgress
						size="10rem"
						thickness={1.0}
						variant="indeterminate"
					/>
					<h4>Loading......</h4>
				</div>
			)}
		</div>
	);
};

export default App;
