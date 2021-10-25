import { ButtonGroup, Button, ToggleButtonGroup, ToggleButton, TextField, Card } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import room from "../styles/rooms.module.css";

export const Rooms: NextPage = () => {
	const [currentPage, setCurrentPage] = useState<"join" | "create">("join");

	let dialogToRender: React.ReactElement = <></>;

	if (currentPage === "create") {
		dialogToRender = (
			<>
				<TextField key="create" variant="standard" placeholder="Abcdef" label="Room ID" />
				<Button>Join</Button>
			</>
		);
	} else if (currentPage === "join") {
		dialogToRender = (
			<>
				<TextField key="join" variant="standard" placeholder="My Room" label="Room Name" />
				<Button>Create</Button>
			</>
		);
	}

	return (
		<>
			<h1>Rooms</h1>
			<ToggleButtonGroup
				value={currentPage}
				exclusive
				onChange={(event, val) => {
					console.log(event, val);
					if (val !== null) setCurrentPage(val);
				}}
				className={room.togglebuttongroup}
			>
				<ToggleButton value="join">Join A Room</ToggleButton>
				<ToggleButton value="create">Create A Room</ToggleButton>
			</ToggleButtonGroup>
			<div style={{ display: "flex", justifyContent: "center" }}>{dialogToRender}</div>
			<canvas id="canvas" width="700" height="700"></canvas>
		</>
	);
};

export default Rooms;
