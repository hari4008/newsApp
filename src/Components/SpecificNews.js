import React, { useEffect } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { useTheme } from '../context/ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNews } from '../RTK/Slices/newsSlice';
import { useParams } from 'react-router-dom';


const SpecificNews = () => {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getAllNews());
    // }, [dispatch]);

    const { theme, toggleTheme } = useTheme();
    const { news, loading, error } = useSelector((state) => state.news);
    console.log("SPECIFICNEWS", news)
    let { index } = useParams();


    return (
        <div>
            <div
                style={{
                    border: theme === 'light' ? '1px solid black' : '1px solid white',
                    margin: '100px auto',
                    width: '80%',
                    // marginBottom: '0',
                    padding: '20px',
                    color: theme === 'light' ? 'black' : 'white',
                    overflowY: 'auto', // Use 'auto' for scroll if necessary
                }}
                className='rounded'
            >
                {/* <h1>Welcome Bro...!</h1> */}
                {/* <br /> */}
                <div>
                    <Row style={{ marginBottom: '10px' }}>
                        <Card style={{ marginBottom: '10px', border: 'none', color: theme === 'light' ? 'black' : 'white', background: theme === 'light' ? 'white' : 'black' }}>
                            <Card.Body>
                                <Card.Title> <h1> {news[index].title} </h1> </Card.Title>
                                <Card.Subtitle className='mb-2 text-muted'>
                                    Source : {news[index].source.name}
                                </Card.Subtitle>
                                <br />
                                {news[index].urlToImage == null ? (<></>) : (
                                    <Card.Img variant="top" src={news[index].urlToImage} style={{ width: '100%'}} className='rounded' />
                                )}
                                {/* <Card.Img variant="top" src={news[index].urlToImage} style={{ width: '100%' }} className='rounded' /> */}
                                <br /><br />
                                <Card.Subtitle className='mb-2 text-muted' style={{ color: theme === 'light' ? 'black' : 'white' }}>
                                    News By {news[index].author}, published {news[index].publishedAt.slice(0, 10)}, {news[index].publishedAt.slice(12, 19)}
                                </Card.Subtitle>
                                <br />
                                <Card.Text>
                                    {news[index].description}
                                </Card.Text>
                                <Card.Text>
                                    {news[index].content}
                                </Card.Text>
                                <Button variant={theme === 'light' ? 'dark' : 'light'} href={news[index].url} target="_blank">Visit in website</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default SpecificNews
