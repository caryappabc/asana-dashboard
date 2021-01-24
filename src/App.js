import React, { useState, useEffect } from "react";
import "./App.css";
import asana from "asana";
import Info from "./components/Info";
import { Typography, CircularProgress } from "@material-ui/core";
const token = "1/1196026741848245:f60fabf352d8af6b500949e94733da11";
//const token = "1/1176686911957013:249036f7326e929a495fb524a964875e";

const App = () => {
	const [taskDetails, setTaskDetails] = useState([]);
	const [loading, setLoading] = useState(true);

	const client = asana.Client.create().useAccessToken(token);
	let workspace_id = "1176686913455770";
	let workspace_id_maersk = "8532748615324";

	useEffect(() => {
		(async () => {
			let projects = await client.projects
				.getProjects({
					workspace: workspace_id_maersk,
					limit: 20,
					opt_pretty: true,
				})
				.then((result) => {
					return result.data.map((project) => {
						return project.gid;
					});
				});

			let tasks = projects.map((p) =>
				client.tasks
					.getTasksForProject(p, { limit: 20, opt_pretty: true })
					.then((result) => {
						return result.data.map((r) => r.gid);
					})
			);

			let taskdetails = await Promise.all(tasks).then((result) =>
				result.map((projects) =>
					projects.map((taskid) =>
						client.tasks
							.getTask(taskid, { limit: 20, opt_pretty: true })
							.then((taskdetails) => {
								return taskdetails;
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
							assignee: tk.assignee,
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
		})();
	});

	return (
		<div>
			{loading === false ? (
				<div className="App">
					<Typography variant="h3">Asana Dashboard</Typography>
					<Info details={taskDetails} />
				</div>
			) : (
				<div className="Loading">
					<CircularProgress
						size="10rem"
						thickness="1.0"
						variant="indeterminate"
					/>
					<h4>Loading......</h4>
				</div>
			)}
		</div>
	);
};

export default App;
