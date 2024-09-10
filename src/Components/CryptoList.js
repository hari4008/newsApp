import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeProvider";
import loadingBlack from "../assets/Loding_black.gif";
import loadingWhite from "../assets/Loding_white.gif";
import { getCryptoList } from "../RTK/Slices/cryptoSlice";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";

const CryptoList = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const { cryptoList, loading, error } = useSelector((state) => state.crypto);
  //console.log("cryptoList", cryptoList.data);

  useEffect(() => {
    dispatch(getCryptoList());
  }, [dispatch]);

  // loading
  if (loading) {
    const loadingImage = theme === "light" ? loadingBlack : loadingWhite;
    return (
      <div style={{ textAlign: "center" }}>
        {" "}
        <img src={loadingImage} alt="Loading..." />{" "}
      </div>
    );
  }

  // error handle
  if (error) {
    return (
      <div style={{ textAlign: "center" }}>
        <div >Error: {error}</div>
        <p> Please! Reload website...... </p>
      </div>
    );
  }

  return (
    <div
      style={{
        border: theme === "light" ? "1px solid black" : "1px solid white",
        margin: "100px auto",
        width: "80%",
        padding: "20px",
        color: theme === "light" ? "black" : "white",
        overflowY: "auto",
      }}
      className="rounded"
    >
      <h1>Crypto Currency List</h1>
      <br />
      <div>
        <Table responsive="xl">
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Coin Rank</th>
              <th>Coin Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Circulating Supply</th>
              <th>Max Supply</th>
              <th>Volume(24h)</th>
              <th>% 24h</th>
            </tr>
          </thead>
          <tbody>
            {cryptoList?.data?.map((i, index) => {
              return (
                <tr key={index}>
                  {/* <td>{index + 1}</td> */}
                  <td>{i.rank}</td>
                  <td>
                    <NavLink
                      to={`/cryptocurrency/${i.name.toLowerCase()}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <b>{i.name}</b>
                    </NavLink>
                  </td>
                  <td>{i.symbol}</td>
                  <td>${Number(i.marketCapUsd).toFixed(2)}</td>
                  <td>${Number(i.priceUsd).toFixed(2)}</td>
                  <td>
                    {Number(i.supply).toFixed(2)} {i.symbol}
                  </td>
                  <td>{Number(i.maxSupply).toFixed(4)}</td>
                  <td>${Number(i.volumeUsd24Hr).toFixed(2)}</td>
                  <td>{Number(i.changePercent24Hr).toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CryptoList;
