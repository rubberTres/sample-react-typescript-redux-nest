import classNames from "classnames";

type Props = {
	small?: boolean
}

function Loader(props: Props) {

	const {
		small = false,
	} = props;

	return (
		<div className={ classNames("loader", { "loader--small": small }) }><div></div><div></div><div></div><div></div></div>
	);
}

export default Loader;