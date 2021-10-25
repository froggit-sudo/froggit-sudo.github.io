import { ButtonGroup, Button } from "@mui/material";
import { NextPage } from "next";

export const Rooms: NextPage = () => (
	<>
		<h1>Rooms</h1>
		<ButtonGroup>
			<Button>Join A Room</Button>
			<Button>Create A Room</Button>
		</ButtonGroup>
		<div id="a">
			<h2>Join A Room</h2>
			<input type="text" placeholder="Room Id" id="room-id" />
			<p></p>
			<button id="join-room">Join</button>
		</div>
		<div>
			<h2 id="rename">Create A Room</h2>
			<input type="text" placeholder="Room Name" id="room-name" />
			<p></p>
			<button id="create-room">Create</button>
		</div>
		<canvas id="canvas" width="700" height="700"></canvas>
	</>
);

export default Rooms;
