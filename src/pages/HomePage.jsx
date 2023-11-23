import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [countryList, setCountryList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    getCountryData();
  }, []);

  const getCountryData = async () => {
    try {
      const response = await axios.get(
        "https://ih-countries-api.herokuapp.com/countries"
      );
      setCountryList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = () => {
    setIsActive(!isActive);
  };

  // const className =
  //   isActive === true
  //     ? "list-group-item list-group-item-action"
  //     : "list-group-item list-group-item-action active";

  if (isLoading === true) {
    return <h3>...Loading</h3>;
  }
  return (
    <div
      className="container"
      style={{ maxHeight: "90vh", overflow: "scroll" }}
    >
      <h1 style={{ fontSize: "24px" }}>
        WikiCountries: Your Guide to the World
      </h1>
      <div className="list-group">
        {countryList
          .sort((a, b) => (a.name.common.localeCompare(b.name.common) ? -1 : 1))
          .map((eachCountry, index) => {
            return (
              <Link
                // className={className}
                className={"list-group-item list-group-item-action"}
                to={`/countries/${eachCountry.alpha3Code}`}
                key={index}
                // onClick={handleOnClick}
              >
                <img
                  src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`}
                  alt={eachCountry.name.common}
                />
                <p>{eachCountry.name.common}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
