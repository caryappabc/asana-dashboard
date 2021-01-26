import React from 'react';
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

const DelaybyReason = ({data}) => {
    let delayed = data.filter((d) => {
		return d.Project_status === "Delay";
    });
    let totalDelays = delayed.length;
    let delaybyreason = delayed.reduce((r, a) => {
		r[a.Reason_for_delay] = [...(r[a.Reason_for_delay] || []), a];
		return r;
	}, {});
    
    let plotdata = [];


	for (const reason in delaybyreason) {
        let count = delaybyreason[reason].length;
        let per = ((count/totalDelays)*100);
		plotdata.push({
            reason: reason,
            percent:per,
		});
    }


	return (
		<BarChart width={930} height={350} data={plotdata} maxBarSize={80} >
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="reason" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="percent" fill="#2B4F69" >
            <LabelList dataKey="percent" position="top" />
            </Bar>
		</BarChart>
	);
};

export default DelaybyReason;