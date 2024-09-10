import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeProvider';
import loadingBlack from '../assets/Loding_black.gif';
import loadingWhite from '../assets/Loding_white.gif';
import { getAllCryptoData } from '../RTK/Slices/cryptoSlice';
import Chart from 'chart.js/auto'; // Importing Chart.js auto for modern module support
import { Form, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CandelStick from './CandelStick';

const CryptoCurrency = () => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const chartRef = useRef(null); // Reference to the chart instance
    const [range, setRange] = useState('d1');
    let { name } = useParams();

    const { cryptoData, loading, error } = useSelector((state) => state.crypto);
    console.log("cryptoData", cryptoData.data);

    const priceData = [];
    cryptoData?.data?.map((i) => {
        priceData.push(i.priceUsd);
    });

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

    const labelData = [];
    cryptoData?.data?.map((i) => {
        labelData.push(convertUnixToDate(i.time));
    });

    useEffect(() => {
        dispatch(getAllCryptoData({ range, name }));
    }, [dispatch, range, name]);

    // Utility function to get months
    const getLabel = ({ count }) => {
        const y_axis = labelData;
        return y_axis.slice(0, count);
    };

    useEffect(() => {
        if (!loading && !error && cryptoData) {
            const ctx = document.getElementById('cryptoCurrencyLineChart').getContext('2d');

            if (chartRef.current) {
                chartRef.current.destroy(); // Destroy previous chart instance
            }

            const labels = getLabel({ count: 10 });
            const data = {
                labels: labels,
                datasets: [{
                    label: 'CoinPrice ',
                    data: priceData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            };

            const config = {
                type: 'line',
                data: data,
            };

            chartRef.current = new Chart(ctx, config); // Create new chart instance
        }

        // Cleanup function to destroy chart instance on component unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [loading, error, cryptoData]);

    // loading 
    if (loading) {
        const loadingImage = theme === 'light' ? loadingBlack : loadingWhite;
        return <div style={{ textAlign: 'center' }}> <img src={loadingImage} alt="Loading..." /> </div>;
    }

    // error handle
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
                <Form className="ml-auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                </Form>
                <canvas id="cryptoCurrencyLineChart" height={'100%'}></canvas>
                <CandelStick name={name} />
            </div>
        </div>
    );
}

export default CryptoCurrency;
