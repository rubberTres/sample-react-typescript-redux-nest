import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchSingleStreamer, voteSingleStreamer } from "store/features/singleStreamerReducer";
import Loader from "components/Loader";
import { isNotNull } from "types/typeguards";
import Button, { ButtonColor } from "components/Button";
import { Vote } from "types/streamer.types";

function SingleStreamerScreen() {

	const dispatch = useAppDispatch();

	const { singleStreamer } = useAppSelector(state => state);

	const { streamerId } = useParams();

	useEffect(() => {
		dispatch(fetchSingleStreamer(streamerId ?? ""));
	}, []);

	const handleVote = (vote: Vote) => {
		dispatch(voteSingleStreamer({ streamerId: streamerId ?? "", vote }));
	}


	return (
		<div className="single-streamer">
			{ singleStreamer.loading && <Loader/> }
			{ singleStreamer.error && <div>Error fetching Streamer</div> }
			{
				isNotNull(singleStreamer.data)
					&&
					<div className="single-streamer__content">
                        <div className="single-streamer__item">
							name: { singleStreamer.data.name }
						</div>
                        <div className="single-streamer__item">
							description: { singleStreamer.data.description }
						</div>
                        <div className="single-streamer__item">
							platform: { singleStreamer.data.platform }
						</div>
                        <div className="single-streamer__item">
                            up votes: { singleStreamer.data.upVotes }
							<Button
								color={ ButtonColor.SUCCESS }
								onClick={ () => handleVote(Vote.UP) }
								loading={ singleStreamer.isVoting }
							>
								Vote UP
							</Button>
						</div>
                        <div className="single-streamer__item">
                            down votes: { singleStreamer.data.downVotes }
                            <Button
                                color={ ButtonColor.DANGER }
                                onClick={ () => handleVote(Vote.DOWN) }
                                loading={ singleStreamer.isVoting }
                            >
                                Vote DOWN
                            </Button>
						</div>
					</div>
			}
		</div>
	);
}

export default SingleStreamerScreen;