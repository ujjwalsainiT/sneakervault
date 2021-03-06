import React from 'react'
import { Grid, Card } from '@material-ui/core';

//common header
import HOC from "../../../Common/HOC";

import "./Reward.css";

function Reward(props) {
    return (
        <>
            <div className="content_padding">
                <div className="mt-2 mb-2">
                    <Grid className="Component_main_grid">
                        <Grid item md={3} className="p-3">
                            <Card className="p-5 text-center Card_shadow card_color" onClick={() => props.history.push("/free-aution")}>
                                <div><strong> <i class="fa fa-plus mr-2" />Add Free Auction</strong></div>
                            </Card>
                        </Grid>
                        <Grid item md={3} className="p-3">
                            <Card className="p-5 text-center Card_shadow card_color" onClick={() => props.history.push("/exclusive-aution")}>
                                <div><strong> <i class="fa fa-plus mr-2" />Add Exclusive Auctions</strong></div>
                            </Card>
                        </Grid>

                        <Grid item md={3} className="p-3">
                            <Card className="p-5 text-center Card_shadow card_color" onClick={() => props.history.push("/redem-points")}>
                                <div><strong> <i class="fa fa-plus mr-2" />Add Redeem Points</strong></div>
                            </Card>
                        </Grid>
                        <Grid item md={3} className="p-3">

                        </Grid>
                    </Grid>


                </div>
            </div>
        </>
    )
}

export default HOC(Reward)
