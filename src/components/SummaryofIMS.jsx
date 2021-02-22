import React from "react";
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

const SummaryofIMS = ({ data, region, type, po, assignee }) => {
	data = data
		.filter((d) => {
			return d.Project_status !== "On Hold";
		})
		.filter((d) => d.Project_status !== "Cancelled");

	if (region.length !== 0) {
		data = data.filter((d) => {
			return region.includes(d.Region);
		});
	}

	if (type.length !== 0) {
		data = data.filter((d) => {
			return type.includes(d.Request_Type);
		});
	}

	if (po.length !== 0) {
		data = data.filter((d) => {
			return po.includes(d.po);
		});
	}

	let databymonths = data.reduce((r, a) => {
		r[a.Handshake_Month] = [...(r[a.Handshake_Month] || []), a];
		return r;
	}, {});

	let plotdata = [];

	let hoursinregion = {
		NAM : 678.2 ,
		LAM : 418.5,
		Europe : 781.1,
		CEN : 732.1,
		WCA : 438.1,
		APA : 767.3,
		Africa : 482.2,
		none : 426,
	}

	let allocated = 0;
	if(region.length !== 0){
		for (let i in region){
			allocated += hoursinregion[region[i]]; 
		}
		
	}else{
		allocated = 4297.5;
	}

	for (const month in databymonths) {
		const sum = databymonths[month]
			.map((task) => task.Set_Hours)
			.reduce((prev, curr) => prev + curr, 0);
		const remaining = (allocated - sum).toFixed(1);
		plotdata.push({
			month: month,
			hours: sum,
			remaining: remaining,
		});
	}

	return (
		<BarChart
			width={1000}
			height={350}
			data={plotdata}
			stackOffset="sign"
			maxBarSize={80}
			margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="hours" name="Consumed Hours" stackId="a" fill="#111244">
				<LabelList dataKey="hours" position="inside" fill="#FFFFFF" />
			</Bar>
			<Bar
				dataKey="remaining"
				name="Remaining Hours"
				stackId="a"
				fill="#00B6BB"
			>
				<LabelList dataKey="remaining" position="outside" />
			</Bar>
		</BarChart>
	);
};

export default SummaryofIMS;
