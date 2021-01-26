import React, { useState, useEffect } from "react";
import "./App.css";
import asana from "asana";
import Drawerlayout from "./components/Drawerlayout"
import { Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const token = "1/1196026741848245:f60fabf352d8af6b500949e94733da11";
//const token = "1/1176686911957013:249036f7326e929a495fb524a964875e";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  },
  header:{
	  display:'flex',
	  flexDirection:"row",
	  alignItem:"center",
	  justifyContent:"center",
	  color: theme.palette.text.primary,
  },
  top:{
	  backgroundColor: "#ffffff",
      backgroundImage: "linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%)",
	  display:'flex',
	  flexDirection:"row",
	  alignItem:"center",
	  justifyContent:"center",
	  color: "white",
	  paddingTop:"40px",
  },
}));


const App = () => {
	const [taskDetails, setTaskDetails] = useState([]);
	const [loading, setLoading] = useState(true);
	const [didMount, setDidMount] = useState(false); 

	const client = asana.Client.create().useAccessToken(token);
	let workspace_id = "1176686913455770";
	let workspace_id_maersk = "8532748615324";
	let projectids = ["1195131443542906","1196748897363362","1196748897363378","1196748897363370","1196748897363386","1195131443542908","1196748897363396","1196748897363403","1196748897363410","1196748897363417","1195131443542910","1196748897363424","1196748897363431","1196748897363445","1196767649376098","1195131443542912","1196767649376105","1196767649376112","1196767649386098","1196767649386105","1195131443542914","1196767649386112","1196767649386119","1196774294906906","1196774294906913","1194774484679347","1196774294917920","1196774294917906","1196774294906920","1196774294917927","1195131443542916","1196774294923913","1196774294923906","1196774294917934","1196774294923920","1197564797535760","1197564797535767","1197564797535782","1197564797535789","1197564797535796"];
	const classes = useStyles();
	


	useEffect(() => {
		(async () => {
			setDidMount(true);
			let tasks = projectids.map((project) =>
				client.tasks
					.getTasksForProject(project, {limit:100 , opt_pretty: true })
					.then((result) => {
						return result.data.map((r) => r.gid);
					}).catch(function (error) {
								// handle error
								console.log(error);
							})
			);

			let taskdetails = await Promise.all(tasks).then((result) =>
				result.map((projects) =>
					projects.map((taskid) =>
						client.tasks
							.getTask(taskid, {opt_pretty: true })
							.then((taskdetails) => {
								return taskdetails;
							}).catch(function (error) {
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
			return () => setDidMount(false);
		})();
	},[]);
	if(!didMount) {
  return null;
}

	return (
		<div className="App">
			{loading === false ? (
				<div className={classes.root}>
                     <Grid className={classes.top} container spacing={3}>
				        <Grid item xs className={classes.header}>
		                 <Typography variant="h3">IMS Dashboard</Typography>
                      </Grid>
		              <Grid item xs>
		                  < Drawerlayout details={taskDetails}/>
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
