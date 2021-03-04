import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles({
	paper: {
		padding: "5px",
	},
	table: {
		backgroundColor: "grey",
	},
	bold: {
		fontWeight: "bold",
	},
	fontcolor: {
		color: "white",
	},
	tableHeader: {
		backgroundColor: "black",
	},
});
const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

const ProjectDetails = ({ data, po, type, month, region, art , copy }) => {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	if (po.length !== 0) {
		data = data.filter((d) => {
			return po.includes(d.po);
		});
	}

	if (type.length !== 0) {
		data = data.filter((d) => {
			return type.includes(d.Request_Type);
		});
	}

	if (region.length !== 0) {
		data = data.filter((d) => {
			return region.includes(d.Region);
		});
	}

	if (art.length !== 0) {
		data = data.filter((d) => {
			return d.art.length === 2 ? art.includes(d.art[0]) || art.includes(d.art[1]) : art.includes(d.art[0]);
		});
	}

	if (copy.length !== 0) {
		data = data.filter((d) => {
			return copy.includes(d.copy);
		});
	}


	if (month.length !== 0) {
		data = data.filter((d) => {
			return month.includes(d.Handshake_Month);
		});
	}
	

	return (
		<React.Fragment>
			<TableContainer className={classes.paper} component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead className={classes.tableHeader}>
						<TableRow>
							<TableCell className={classes.fontcolor} width="200px">
								<Typography className={classes.bold} varient="h1">
									{`Projects - Total of ${data.length}`}
								</Typography>
							</TableCell>
							<TableCell className={classes.fontcolor} width="100px">
								PO
							</TableCell>
							<TableCell className={classes.fontcolor} width="50px">
								Art
							</TableCell>
							<TableCell className={classes.fontcolor} width="30px">
								Copy
							</TableCell>
							<TableCell className={classes.fontcolor} width="50px">
								Stage
							</TableCell>
							<TableCell className={classes.fontcolor} width="20px">
								Status
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.table}>
						{(rowsPerPage > 0
							? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: data
						).map((pr) => (
							<TableRow key={data.indexOf(pr)}>
								<TableCell className={classes.fontcolor}>{pr.Name} </TableCell>
								<TableCell className={classes.fontcolor}>{pr.po} </TableCell>
								<TableCell className={classes.fontcolor}>
									{pr.art[0]}{pr.art.length > 1 ? ", " : ""}{pr.art[1]}
								</TableCell>
								<TableCell className={classes.fontcolor}>{pr.copy} </TableCell>
								<TableCell className={classes.fontcolor}>
									{pr.section[0]}
								</TableCell>
								<TableCell className={classes.fontcolor}>
									{pr["open/closed"]}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter className={classes.table}>
						<TableRow>
							<TablePagination
								colSpan={3}
								count={data.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: { "aria-label": "rows per page" },
									native: true,
								}}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
};

export default ProjectDetails;
