import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const Info = ({ details }) => {
	let frmdt = new Date(details.created_at);
	let compdt = new Date(details.completed_at);
	let time_taken_mil = compdt.getTime() - frmdt.getTime();
	let hours = time_taken_mil / (1000 * 60 * 60);
	let absoluteHours = Math.floor(hours);
	let h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;
	let totalMinutes = Math.floor(time_taken_mil / (1000 * 60));
	// Minutes remaining from calculated hours
	let minutes = (hours - absoluteHours) * 60;
	let absoluteMinutes = Math.floor(minutes);
	let m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;
	//sec left of of calculated mins
	var seconds = (minutes - absoluteMinutes) * 60;
	var absoluteSeconds = Math.floor(seconds);
	var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;
	var display = h == 0 ? "0." + totalMinutes : absoluteHours;
	return (
		<Card>
			<CardContent>
				<Typography color="textSecondary" gutterBottom>{details.name}</Typography>
				<Typography color="textSecondary" gutterBottom>{details.completed}</Typography>
				<Typography color="textSecondary" gutterBottom>{details.created_at}</Typography>
				<Typography color="textSecondary" gutterBottom>{details.completed_at}</Typography>
				<Typography color="textSecondary" gutterBottom>Time Taken : {display}</Typography>
			</CardContent>
		</Card>
	);
};

export default Info;
