import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetailsPage() {
  const params = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCountryDetails();
  }, [params.countryId]);

  const getCountryDetails = async () => {
    try {
      const response = await axios.get(
        `https://ih-countries-api.herokuapp.com/countries/${params.countryId}`
      );
      setCountryDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading === true) {
    return <h3>...Loading</h3>;
  }
  return (
    <div>
      <div className="container">
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>Country Details</p>
        <img
          src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`}
          alt={countryDetails.name.common}
        />
        <h1>{countryDetails.name.common}</h1>

        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>Capital</td>
              {countryDetails.capital.map((eachCapital, index) => {
                return <td key={index}>{eachCapital}</td>;
              })}
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {countryDetails.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {countryDetails.borders.map((eachBorders, index) => {
                    return (
                      <p key={index}>
                        <Link to={`/countries/${eachBorders}`}>
                          {eachBorders}
                        </Link>
                      </p>
                    );
                  })}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountryDetailsPage;
