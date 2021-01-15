import React, { useState, useEffect } from "react";
import "./App.css";
import asana from "asana";
import Info from "./components/Info";
import { MenuItem, Select, InputLabel, Typography } from "@material-ui/core";
const token = "1/1196026741848245:f60fabf352d8af6b500949e94733da11";
//const token = "1/1176686911957013:249036f7326e929a495fb524a964875e";

const App = () => {
	const [workspaceIds, setWorkspaceId] = useState([]);
	const [projectIds, setProjectId] = useState([]);
	const [projectId, setPid] = useState([]);
	const [taskDetails, setTaskDetails] = useState([]);

	const client = asana.Client.create().useAccessToken(token);

	useEffect(() => {
		client.workspaces
			.getWorkspaces({ opt_fields: "name", opt_pretty: true })
			.then((response) => {
				response.data.map((i) => {
					console.log(i.gid);
					setWorkspaceId(i.gid);
				});
			});
	}, []);

	useEffect(() => {
		client.projects
			.getProjectsForWorkspace("8532748615324", {
				opt_firld: "name",
				opt_pretty: true,
			})
			.then((response) => {
				const projects = response.data.map((i) => ({
					id: i.gid,
					name: i.name,
				}));
				return setProjectId(projects);
			});
	});

	const onProjectChange = async (e) => {
		const id = e.target.value;
		client.tasks
			.getTasksForProject(id, { opt_field: "name", opt_pretty: true })
			.then((response) => {
				const tasks = response.data.map((i) => ({
					id: i.gid,
					name: i.name,
				}));
				console.log(tasks);
				setPid(tasks);
			});
	};

	const onTaskChange = async (e) => {
		const id = e.target.value;
		client.tasks.getTask(id, { opt_pretty: true }).then((response) => {
			console.log(response);
			setTaskDetails(response);
		});
	};

	return (
		<div className="App">
			<Typography variant="h2" component="h3" color="textPrimary" gutterBottom>
				DashBoard
			</Typography>
			<InputLabel className="space" id="project">
				Select a Project
			</InputLabel>
			<Select labelId="project" onChange={onProjectChange}>
				{projectIds.map((i) => (
					<MenuItem key={i.id} value={i.id}>
						{i.name}
					</MenuItem>
				))}
			</Select>
			<InputLabel className="space" id="task">
				Select a Task
			</InputLabel>
			<Select labelId="task" onChange={onTaskChange}>
				{projectId.map((i) => (
					<MenuItem key={i.id} value={i.id}>
						{i.name}
					</MenuItem>
				))}
			</Select>
			<Info details={taskDetails} />
		</div>
	);
};

export default App;
