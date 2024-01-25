import styled from "styled-components";

interface ButtonProps {
	$color: "black" | "red" | "green" | "blue",
	$state?: "default" | "empty",
	$roundness?: "block" | "round"
}

const colorMapping = {
	black: "#0A0A0A",
	red: "#E94952",
	green: "#27A151",
	blue: "#3F45DE"
} as const;


const Button = styled.button<ButtonProps>`
	color: #FFFFFF;
	padding: 5px 14px;
	font-family: Inter;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	cursor: pointer;

	background-color: ${
		props => props.$state !== "empty" ?
		colorMapping[props.$color] :
		"transparent"
	};

	border: ${
		props => props.$state !== "default" ?
		`2px solid ${colorMapping[props.$color]}` :
		"none"
	};

	border-radius: ${props => props.$roundness === "round" ? "25px" : "10px"}
`;

Button.defaultProps = {
	$state: "default",
	$roundness: "block",
}

export default Button