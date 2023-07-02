import React from "react";
import classNames from "classnames";
import Button, { ButtonColor } from "components/Button";
import { Platform } from "types/streamer.types";
import { AddStreamerForm } from "types/types";
import { isNotNull } from "types/typeguards";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { createStreamer } from "store/features/streamersReducer";

type Props = {
	isOpen: boolean
	toggleModalOpen: () => void
}

function AddStreamerModal(props: Props) {

	const {
		isOpen,
		toggleModalOpen,
	} = props;

	const dispatch = useAppDispatch();

	const { streamers: { isCreating, createError } } = useAppSelector(state => state);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddStreamerForm>();

	const handleAddStreamer = handleSubmit(formData => {
		toggleModalOpen();
		dispatch(createStreamer({ ...formData, upVotes: 0, downVotes: 0 }))
	})

	return (
		<div className={ classNames("add-streamer-modal", { "add-streamer-modal--open": isOpen || isCreating }) }>
			<div className="add-streamer-modal__inner">
				<form onSubmit={ handleAddStreamer }>
					<div className="add-streamer-modal__header">
						Add Streamer
					</div>
					<div className="add-streamer-modal__body">
						<div>
							<label
								htmlFor="name"
								// className="login__label"
							>
								Name
							</label>
							<input
								type="text"
								{ ...register("name", { required: "Please enter streamer name" }) }
							/>
							<div className="login__error">
								{ isNotNull(errors.name) && errors.name.message }
							</div>
						</div>
						<div>
							<select { ...register("platform", { required: "Please choose a platform" }) }>
								{ Object.values(Platform).map(platform =>
									<option key={ platform } value={ platform }>{ platform }</option>
								) }
							</select>
							<div className="login__error">
								{ isNotNull(errors.platform) && errors.platform.message }
							</div>
						</div>
						<div>
							<label
								htmlFor="description"
								// className="login__label"
							>
								Description
							</label>
							<textarea
								cols={ 30 }
								rows={ 10 }
								{ ...register("description", { required: "Please enter streamer description" }) }
							/>
							<div className="login__error">
								{ isNotNull(errors.description) && errors.description.message }
							</div>
						</div>
					</div>
					<div className="add-streamer-modal__footer">
						<Button
							onClick={ () => toggleModalOpen() }
							color={ ButtonColor.DANGER }
						>
							Cancel
						</Button>
						<Button
							// onClick={ handleAddStreamer }
							color={ ButtonColor.SUCCESS }
							type="submit"
							loading={ isCreating }
						>
							Add
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddStreamerModal;