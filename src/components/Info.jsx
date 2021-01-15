import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { render } from "@testing-library/react";

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
	var display = h === 0 ? "0." + totalMinutes : absoluteHours;
	let customfields = details.custom_fields;

	const renderCustom = (field) => {
		if (field.type === "enum") {
			if (field.enum_value != null) {
				return (
					<Typography color="textSecondary" gutterBottom>
						{field.name} : {field.enum_value.name}
					</Typography>
				);
			}
		} else if (field.type === "number") {
			return (
				<Typography color="textSecondary" gutterBottom>
					{field.name} : {field.number_value}
				</Typography>
			);
		} else {
			return (
				<Typography color="textSecondary" gutterBottom>
					{field.name} : {field.text_value}
				</Typography>
			);
		}
	};
	const renderCustomFieldData = () => {
		if (customfields) {
			return customfields.map((field) => {
				return renderCustom(field);
			});
		}
	};

	return (
		<Card>
			<CardContent>
				<Typography color="textSecondary" gutterBottom>
					{details.name}
				</Typography>
				<Typography color="textSecondary" gutterBottom>
					{details.completed ? "Completed" : "Not Completed"}
				</Typography>
				<Typography color="textSecondary" gutterBottom>
					{details.created_at}
				</Typography>
				<Typography color="textSecondary" gutterBottom>
					{details.completed_at}
				</Typography>
				<Typography color="textSecondary" gutterBottom>
					Time Taken : {display}
				</Typography>
				{renderCustomFieldData()}
				<Typography color="textSecondary" gutterBottom>
					Modified : {details.modified_at}
				</Typography>
				<Typography color="textSecondary" gutterBottom>
					Notes : {details.notes}
				</Typography>
				<Typography color="textSecondary" gutterBottom>
					Link : <a href={details.permalink_url}>{details.permalink_url}</a>
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Info;
