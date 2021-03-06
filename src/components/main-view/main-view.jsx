import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }
    componentDidMount() {
        axios.get('https://movie-api-moin.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    /*When a movie is clicked, 
    sthis function is invoked and 
    updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }
    /* When a user successfully logs in, 
    this function updates the `user` property in state to that *particular user*/
    onLoggedIn(user) {
        this.setState({
            user
        });
    }
    /* NOT SURE THIS CODE IS CORRECT */
    onRegistration(user) {
        this.setState({
            user
        });
    }
    render() {
        const { movies, selectedMovie, user } = this.state;
        /* If there is no user, the LoginView is rendered. 
        If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <RegistrationView onRegistration={user => this.onRegistration(user)} />;
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        /* Before the movies have been loaded */
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Container>

                <Navbar
                    bg="dark"
                    variant="dark"
                    fixed="top">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src={Logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{''}
                            My FLiX
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Row className="main-view justify-content-md-center">
                    {/* If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned */}
                    {selectedMovie
                        ? (
                            // Do we need () around the <Row></Row>
                            <Col lg={8}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        )
                        :
                        (
                            movies.map(movie => (
                                <Col md={3}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
                                </Col>
                            ))
                        )
                    }
                </Row>
            </Container>
        );
    }

}


export default MainView;