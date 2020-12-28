import React, {Component} from "react";
import {Container, Message, Grid} from "semantic-ui-react";

class Home extends Component {
    render() {
        return(
            <Container>
                <Grid>
                    <Grid.Row />
                    <Grid.Row>
                        <Message
                            positive
                            icon='bullhorn'
                            header='Welcome to this demo App!'
                            content={`I've created this app to show some of the amazing things that can be achieved with React`}
                        />
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Home;