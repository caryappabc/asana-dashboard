import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  paper: {
    padding: "5px",
  },
  table: {
    minWidth: 650,
    backgroundColor: "grey",
  },
  bold: {
    fontWeight: "bold",
  },
  fontcolor: {
    color: "white",
  },
});

const ItterationperMonth = ({ data, region }) => {
  const classes = useStyles();
  const [value, setValue] = useState([]);
  const [projects, setProjects] = useState([]);

  if (!(region.length === 0)) {
    data = data.filter((d) => {
      return region.includes(d.Region);
    });
  }

  data = data.filter((d) => {
    return Number(d.Current_ittr) > 2;
  });
  let databymonths = data.reduce((r, a) => {
    r[a.Handshake_Month] = [...(r[a.Handshake_Month] || []), a];
    return r;
  }, {});
  let plotdata = [];

  for (const month in databymonths) {
    const count = Object.keys(databymonths[month]).length;
    const projects_names = databymonths[month].map((d) => {
      return { name: d.Name, po: d.po };
    });
    plotdata.push({
      projectde: projects_names,
      month: month,
      Total: count,
    });
  }
  return (
    <div>
      <LineChart
        width={1000}
        height={350}
        data={plotdata}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" padding={{ left: 20, right: 20 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="natural"
          name="Num of projects "
          dataKey="Total"
          stroke="#8884d8"
          strokeWidth={3}
          activeDot={{
            onClick: (event, payload) => {
              if (payload !== undefined) {
                setValue(payload.payload);
                setProjects(payload.payload.projectde);
              }
            },
          }}
        >
          <LabelList dataKey="Total" position="top" />
        </Line>
      </LineChart>

      <TableContainer className={classes.paper} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.fontcolor} width="400">
                <Typography className={classes.bold} varient="h1">
                  Projects in {value.month}
                </Typography>
              </TableCell>
              <TableCell className={classes.fontcolor} width="100">
                <Typography className={classes.bold} varient="h1">
                  PO
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={projects.indexOf(p)}>
                <TableCell className={classes.fontcolor}>{p.name}</TableCell>
                <TableCell className={classes.fontcolor}>{p.po}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ItterationperMonth;
