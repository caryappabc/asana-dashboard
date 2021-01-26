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

const DelaybyMonth = ({ data }) => {
	let delayed = data.filter((d) => {
		return d.Project_status === "Delay";
    });
    let totalDelays = delayed.length;
    let delaybymonth = delayed.reduce((r, a) => {
		r[a.Handshake_Month] = [...(r[a.Handshake_Month] || []), a];
		return r;
	}, {});
    
    let plotdata = [];


	for (const month in delaybymonth) {
        let count = delaybymonth[month].length;
        let per = ((count/totalDelays)*100);
		plotdata.push({
            month: month,
            percent:per,
		});
    }


	return (
		<BarChart width={930} height={350} data={plotdata} maxBarSize={60} >
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="percent" fill="#2B4F69" >
			<LabelList dataKey="percent" position="top" />
			</Bar>
		</BarChart>
	);
};

export default DelaybyMonth;
