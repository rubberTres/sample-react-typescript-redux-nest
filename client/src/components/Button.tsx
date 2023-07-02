import { PropsWithChildren } from "react";
import Loader from "components/Loader";

export enum ButtonColor {
	SUCCESS = "success",
	DANGER = "danger",
	PRIMARY = "primary"
}

type Props = {
	onClick?: () => void
	color?: ButtonColor
	type?: "submit" | "button"
	loading?: boolean
}

function Button(props: PropsWithChildren<Props>) {

	const {
		onClick,
		children,
		color= "primary",
		type= "button",
		loading = false,
	} = props;

	return (
		<button
			className={ `button button--${ color }` }
			onClick={ onClick }
			type={ type }
		>
			{ loading ? <Loader small/> : children }
		</button>
	);
}

export default Button;