import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import BarGraphHrsPerMonth from "./BarGraphHrsPerMonth";
import SummaryofIMS from "./SummaryofIMS";
import TotalRequest from "./TotalRequest";
import { render } from "@testing-library/react";

const Info = ({ details }) => {
	/*let frmdt = new Date(details.created_at);
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
	const renderCustomFieldData = () => {
		if (customfields) {
			return customfields.map((field) => {
				return renderCustom(field);
			});
		}
	};
	*/
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
			if (field.name === "Handshake sent date") {
				let Hdate = new Date(field.text_value);
				let Hmonth = Hdate.toLocaleString("default", { month: "long" });
				return (
					<div>
						<Typography color="textSecondary" gutterBottom>
							{field.name} : {field.text_value}
						</Typography>
						<Typography color="textSecondary" gutterBottom>
							Handshake Month : {Hmonth}
						</Typography>
					</div>
				);
			}
			return (
				<Typography color="textSecondary" gutterBottom>
					{field.name} : {field.text_value}
				</Typography>
			);
		}
	};

	return (
		<Card>
			<CardContent>
				{/*{details.map((gr) =>
					gr.map((it) => (
						<div>
							<p Style="color:red;" key={it.gid}>
								{it.name}
							</p>
							{it.customfield.map((field) => renderCustom(field))}
						</div>
					))
					)} */}
				<SummaryofIMS data={dataset} />
				<BarGraphHrsPerMonth data={dataset} />
				<TotalRequest data={dataset} />

				{/*{dataset.map((list) => (
					<div>
						<p Style="color:red;" key={list.id}>
							{list.Name}
						</p>
						<p key={list.id}>{list.id}</p>
						<p key={list.id}>{list.Handshake_Month}</p>
						<p key={list.id}>{list.Region}</p>
						<p key={list.id}>{list.Request_Type}</p>
						<p key={list.id}>{list.Set_Hours}</p>
						<p key={list.id}>{list.assignee}</p>
						<p>{list.Project_status}</p>
						<p>{list.Reason_for_delay}</p>
						<p>{list.Current_ittr}</p>
					</div>
				))}/*}
				{/*<Typography color="textSecondary" gutterBottom>
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
	</Typography>*/}
			</CardContent>
		</Card>
	);
};

export default Info;
