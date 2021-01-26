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

const DelaybyRegion = ({ data }) => {
	let delayed = data.filter((d) => {
		return d.Project_status === "Delay";
    });
    let totalDelays = delayed.length;
    let delaybyregion = delayed.reduce((r, a) => {
		r[a.Region] = [...(r[a.Region] || []), a];
		return r;
	}, {});
    
    let plotdata = [];


	for (const region in delaybyregion) {
        let count = delaybyregion[region].length;
        let per = ((count/totalDelays)*100);
		plotdata.push({
            region: region,
            percent:per,
		});
    }


	return (
		<BarChart width={930} height={350} data={plotdata} maxBarSize={80} >
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="region" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="percent" fill="#2B4F69" >
            <LabelList dataKey="percent" position="top" />
            </Bar>
		</BarChart>
	);
};

export default DelaybyRegion;
