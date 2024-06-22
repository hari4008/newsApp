import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useTheme } from '../context/ThemeProvider';
import { Card, Row, Col, Pagination, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNews } from '../RTK/Slices/newsSlice';
import { NavLink } from 'react-router-dom';
import loadingBlack from '../assets/Loding_black.gif';
import loadingWhite from '../assets/Loding_white.gif';
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { theme } = useTheme();

  const { news, loading, error } = useSelector((state) => state.news);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Number of news items per page

  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);

  // State for favorites
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    dispatch(getAllNews());
    // Load favorites from local storage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, [dispatch]);

  useEffect(() => {
    setFilteredNews(
      news.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [news, searchTerm]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredNews.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= Math.ceil(filteredNews.length / itemsPerPage); i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
        {i}
      </Pagination.Item>
    );
  }

  // Add to favorites
  const addToFavorites = (article) => {
    const updatedFavorites = [...favorites, article];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Remove from favorites
  const removeFromFavorites = (article) => {
    const updatedFavorites = favorites.filter((fav) => fav.title !== article.title);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Check if article is in favorites
  const isFavorite = (article) => {
    return favorites.some((fav) => fav.title === article.title);
  };

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
    <>
      <div
        style={{
          border: theme === 'light' ? '1px solid black' : '1px solid white',
          margin: '100px auto',
          width: '80%',
          padding: '20px',
          color: theme === 'light' ? 'black' : 'white',
          overflowY: 'auto',
        }}
        className='rounded'
      >
        <h1>Welcome Bro...!</h1>
        <br />
        <Form>
          <Row>
            <Col md={8}>
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search for articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="vendorSelect">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  // onChange={handleVendorChange}
                  defaultValue=""
                >
                  <option value="" aria-disabled>Select Category...</option>
                  <option value="all">All Vendors</option>
                  {/* {vendor.map((person) => (
                    <option key={person.email} value={person.email}>{person.name}</option>
                  ))} */}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <br />
        <div>
          <Row style={{ marginBottom: '10px' }}>
            {currentNews.map((n, index) => (
              <Col md={6} key={(4 * (currentPage-1)) + index}>
                <Card style={{
                  marginBottom: '10px',
                  border: theme === 'light' ? '1px solid black' : '1px solid white',
                  color: theme === 'light' ? 'black' : 'white',
                  background: theme === 'light' ? 'white' : 'black',
                  height: '450px', // fixed height for each card
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Card.Header className='d-flex justify-content-between' style={{ borderBottom: theme === 'light' ? '1px solid black' : '1px solid white' }}>
                    {n.source.name}
                    {isFavorite(n) ? (
                      <IoMdHeart onClick={() => removeFromFavorites(n)} style={{ fontSize: '20px' }} />
                    ) : (
                      <IoIosHeartEmpty onClick={() => addToFavorites(n)} />
                    )}
                  </Card.Header>
                  <Card.Body style={{ flex: 1 }}>
                    <Card.Title>{n.title}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      {n.author}
                    </Card.Subtitle>
                    {n.urlToImage == null ? (<></>) : (
                      <Card.Img variant="top" src={n.urlToImage} style={{ width: '100%', height: '150px', objectFit: 'cover' }} className='rounded' />
                    )}
                    <Card.Text style={{ marginTop: '10px', overflowY: 'auto' }}>{n.description}</Card.Text>
                  </Card.Body>
                  <div className='d-flex justify-content-between' style={{ padding: '10px' }}>
                    <NavLink to={`/specificnews/${(4 * (currentPage-1)) + index}`}>
                      <Card.Link style={{ color: theme === 'light' ? 'black' : 'white' }}>Read More</Card.Link>
                    </NavLink>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        {/* Pagination */}
        <div className='d-flex justify-content-center'>
          <Pagination>
            <Pagination.First onClick={() => paginate(1)} />
            <Pagination.Prev onClick={goToPreviousPage} disabled={currentPage === 1} />
            {paginationItems}
            <Pagination.Next onClick={goToNextPage} disabled={currentPage === Math.ceil(filteredNews.length / itemsPerPage)} />
            <Pagination.Last onClick={() => paginate(Math.ceil(filteredNews.length / itemsPerPage))} />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
