import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeProvider';
import loadingBlack from '../assets/Loding_black.gif';
import loadingWhite from '../assets/Loding_white.gif';
import { getCryptoCandle } from '../RTK/Slices/cryptoSlice';
import Chart from 'chart.js/auto'; // Importing Chart.js auto for modern module support
import 'chartjs-chart-financial'; // Importing financial chart module
// import { Form, Col, Row } from 'react-bootstrap';

const CandelStick = ({ name }) => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const chartRef = useRef(null); // Reference to the chart instance

    const { cryptoCandle, loading, error } = useSelector((state) => state.crypto);
    console.log("cryptoCandle", cryptoCandle);


    const convertUnixToDate = (timestamp_ms) => {
        const date = new Date(timestamp_ms);
        return date.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    };



    useEffect(() => {
        dispatch(getCryptoCandle(name)); // Pass name to the action creator
    }, [dispatch, name]); // Include name in the dependency array

    useEffect(() => {
        if (!loading && !error && cryptoCandle) {
            const ctx = document.getElementById('cryptoCandle').getContext('2d');

            if (chartRef.current) {
                chartRef.current.destroy(); // Destroy previous chart instance
            }

            const data = {
                datasets: [{
                    label: 'Candlestick Dataset',
                    data: cryptoCandle?.data?.map(item => ({
                        t: convertUnixToDate(item.time), // Assuming time is in Unix timestamp
                        o: item.open,  // Replace with your data field for open price
                        h: item.high,  // Replace with your data field for high price
                        l: item.low,   // Replace with your data field for low price
                        c: item.close, // Replace with your data field for close price
                    })),
                    borderColor: 'rgb(75, 192, 192)',
                }]
            };
            const staticData = [
                { time: 1625097600000, open: 342.25, high: 344.85, low: 340.5, close: 342.95 },
                { time: 1625184000000, open: 343.55, high: 347.15, low: 342.0, close: 345.1 },
                { time: 1625270400000, open: 345.6, high: 348.25, low: 344.5, close: 347.0 },
                { time: 1625356800000, open: 346.75, high: 349.3, low: 345.25, close: 348.85 },
                { time: 1625443200000, open: 348.95, high: 351.5, low: 347.8, close: 350.1 },
            ];

            // const data = {
            //     datasets: [{
            //         label: 'Candlestick Dataset',
            //         data: staticData.map(item => ({
            //             t: convertUnixToDate(item.time), // Assuming time is in Unix timestamp
            //             o: item.open,  // Replace with your data field for open price
            //             h: item.high,  // Replace with your data field for high price
            //             l: item.low,   // Replace with your data field for low price
            //             c: item.close, // Replace with your data field for close price
            //         })),
            //         borderColor: 'rgb(75, 192, 192)',
            //     }]
            // };

            const config = {
                type: 'candlestick',
                data: data,
                options: {
                    plugins: {
                        legend: {
                            display: true,
                        },
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                            },
                        },
                        y: {
                            beginAtZero: false,
                        },
                    },
                },
            };

            chartRef.current = new Chart(ctx, config); // Create new chart instance
        }

        // Cleanup function to destroy chart instance on component unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [loading, error, cryptoCandle]); // Ensure this useEffect runs whenever loading, error, or cryptoCandle changes

    // Loading state
    if (loading) {
        const loadingImage = theme === 'light' ? loadingBlack : loadingWhite;
        return <div style={{ textAlign: 'center' }}> <img src={loadingImage} alt="Loading..." /> </div>;
    }

    // Error state
    if (error) {
        return <div style={{ textAlign: 'center' }}>Error: {error}</div>;
    }

    return (
        <div
            style={{
                border: theme === 'light' ? '1px solid black' : '1px solid white',
                margin: '70px auto',
                width: '80%',
                padding: '20px',
                color: theme === 'light' ? 'black' : 'white',
                overflowY: 'auto',
            }}
            className='rounded'
        >
            <h1>{name.toUpperCase()}</h1>
            <div>
                {/* <Form className="ml-auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Row>
                        <Col>
                            <Form.Group controlId="vendorSelect">
                                <Form.Select
                                    name="range"
                                    onChange={(e) => setRange(e.target.value)}
                                    defaultValue="d1" // Set the default selected value to "1 day"
                                >
                                    <option value="d1">1 day</option>
                                    <option value="h12">12 hour</option>
                                    <option value="h6">6 hour</option>
                                    <option value="h2">2 hour</option>
                                    <option value="h1">1 hour</option>
                                    <option value="m30">30 min</option>
                                    <option value="m15">15 min</option>
                                    <option value="m5">5 min</option>
                                    <option value="m1">1 min</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form> */}
                <canvas id="cryptoCandle" height={'100%'}></canvas>
            </div>
        </div>
    );
}

export default CandelStick;
