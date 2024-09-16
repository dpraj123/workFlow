import React, { useEffect, useRef, useState } from "react";
import { find, filter, chain, includes, map } from "lodash";
import FlightSearchDateCalendar from "./Calender.tsx";
import { RouteAPI } from "./RouteApi.js";
const transformData = (
  data: {
    depCode: string;
    depAirportName: string;
    countryCode: string;
    countryName: string;
    isNew: boolean;
    arrCodes: string[];
  }[]
) => {
  return chain(data)
    .groupBy("countryName")
    .map((airports, countryName) => ({
      countryName,
      airport: airports.map(({ depCode, depAirportName }) => ({
        depCode,
        depAirportName,
      })),
    }))
    .value();
};
const formatSelectedDate = (date: Date | null): string => {
  if (date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } else {
    return "";
  }
};
const handleClickOutside =
  (
    ref: React.RefObject<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setter(false);
    }
  };
const SearchComponent: React.FC = () => {
  const routesData = RouteAPI.routes;
  const [fromArptfilterData, setFromArptfilterData] = useState<any>(routesData);
  const [toArptData, setToArptData] = useState<any>({});
  const [toArptfilterData, setToArptfilterData] = useState({});

  const [showFromArptOption, setShowFromArptOption] = useState(false);
  const [fromArptInputValue, setFromArptInputValue] = useState("");
  const [fromArptValue, setFromArptValue] = useState("");
  const [showAddPassengerBox, setShowAddPassengerBox] = useState(false);
  const [showToArptOption, setShowToArptOption] = useState(false);
  const [toArptInputValue, setToArptInputValue] = useState("");
  const [toArptValue, setToArptValue] = useState("");
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const paxRef = useRef<HTMLDivElement>(null);
  const departureRef = useRef<HTMLDivElement>(null);
  const returnRef = useRef<HTMLDivElement>(null);
  const toArptInputRef = useRef<HTMLInputElement>(null);
  const [showFromCalender, setShowFromCalender] = useState(false);
  const [showToCalender, setShowToCalender] = useState(false);
  const [searchFlightStartDate, setSearchFlightStartDate] =
    useState<Date | null>(null);
  const [searchFlightEndDate, setSearchFlightEndDate] = useState<Date | null>(
    null
  );
  const [selectedDepartureValue, setSelectedDepartureValue] =
    useState<string>("");
  const [selectedRetunValue, setSelectedReturnValue] = useState<string>("");
  const [departurCityName, setDepartureCityName] = useState<string>("");
  const [returnCityName, setReturnCityName] = useState<string>("");

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      handleClickOutside(fromRef, setShowFromArptOption)
    );
    document.addEventListener(
      "mousedown",
      handleClickOutside(toRef, setShowToArptOption)
    );
    document.addEventListener(
      "mousedown",
      handleClickOutside(paxRef, setShowAddPassengerBox)
    );
    document.addEventListener(
      "mousedown",
      handleClickOutside(departureRef, setShowFromCalender)
    );
    document.addEventListener(
      "mousedown",
      handleClickOutside(returnRef, setShowToCalender)
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside(fromRef, setShowFromArptOption)
      );
      document.removeEventListener(
        "mousedown",
        handleClickOutside(toRef, setShowToArptOption)
      );
      document.removeEventListener(
        "mousedown",
        handleClickOutside(paxRef, setShowAddPassengerBox)
      );
      document.removeEventListener(
        "mousedown",
        handleClickOutside(departureRef, setShowFromCalender)
      );
      document.removeEventListener(
        "mousedown",
        handleClickOutside(returnRef, setShowToCalender)
      );
    };
  }, []);

  const handleFromArptInputValue = (e: { target: { value: any } }) => {
    setSelectedDepartureValue("");
    setFromArptValue("");
    setFromArptInputValue(e.target.value);
  };
  const handleFromArptValue = (e: { target: { value: any } }) => {
    setFromArptValue(e.target.value);
    setShowFromArptOption(false);
  };
  const handleToArptInputValue = (e: { target: { value: any } }) => {
    setSelectedReturnValue("");
    setToArptValue("");
    setToArptInputValue(e.target.value);
  };
  const handleToArptValue = (e: { target: { value: any } }) => {
    setToArptValue(e.target.value);
    setShowToArptOption(false);
  };

  useEffect(() => {
    const filteredFromAirports = fromArptInputValue
      ? filter(routesData, (item) =>
          [item.depAirportName, item.countryName, item.depCode].some((val) =>
            val.toLowerCase().includes(fromArptInputValue.toLowerCase())
          )
        )
      : routesData;

    setFromArptfilterData(transformData(filteredFromAirports));
  }, [fromArptInputValue, routesData]);
  useEffect(() => {
    if (fromArptValue) {
      const selectedFromArpt = find(routesData, { depCode: fromArptValue });
      if (selectedFromArpt) {
        setSelectedDepartureValue(
          `${selectedFromArpt.depAirportName} (${selectedFromArpt.depCode})`
        );
        setDepartureCityName(selectedFromArpt.depAirportName);

        const filteredToAirports = filter(routesData, (airport) =>
          includes(selectedFromArpt.arrCodes, airport.depCode)
        );
        setToArptData(filteredToAirports);
      } else {
        setSelectedDepartureValue("");
        setDepartureCityName("");
        setToArptData({});
      }

      // Focus on the "To" airport input when "From" airport has a value
      if (toArptInputRef.current) {
        toArptInputRef.current.focus();
      }
    } else {
      setToArptValue("");
      setSelectedReturnValue("");
      setToArptData({});
    }
  }, [fromArptValue, routesData]);

  useEffect(() => {
    if (toArptInputValue !== "") {
      const filteredBySearchData = filter(
        toArptData,
        (item: {
          depAirportName: string;
          countryName: string;
          depCode: string;
        }) =>
          item.depAirportName
            .toLowerCase()
            .includes(toArptInputValue.toLocaleLowerCase()) ||
          item.countryName
            .toLowerCase()
            .includes(toArptInputValue.toLocaleLowerCase()) ||
          item.depCode
            .toLowerCase()
            .includes(toArptInputValue.toLocaleLowerCase())
      );
      setToArptfilterData(transformData(filteredBySearchData));
    } else {
      setToArptfilterData(transformData(toArptData));
    }
  }, [toArptData, toArptInputValue]);

  useEffect(() => {
    if (toArptValue !== "") {
      const selectedToArptValue = find(
        routesData,
        (route: any) => route.depCode === toArptValue
      );
      if (selectedToArptValue) {
        setSelectedReturnValue(
          `${selectedToArptValue["depAirportName"]} (${selectedToArptValue["depCode"]})`
        );
        setReturnCityName(`${selectedToArptValue["depAirportName"]}`);
      } else {
        setSelectedReturnValue("");
        setReturnCityName("");
      }
    }
  }, [routesData, toArptValue]);

  const [searchf, setSearchf] = useState("");
  console.log(formatSelectedDate(searchFlightStartDate));

  useEffect(() => {
    if (searchFlightStartDate) {
      setShowToCalender(true);
    }
  }, [searchFlightStartDate]);
  useEffect(() => {
    if (searchFlightStartDate) {
      setShowToCalender(false);
    }
  }, [searchFlightEndDate, searchFlightStartDate]);
  const changeDepAndArrValue = () => {
    setToArptValue(fromArptValue);
    setFromArptValue(toArptValue);
  };
  useEffect(() => {
    if (fromArptValue === "") {
      setToArptValue("");
      setSelectedReturnValue("");
    }
  }, [fromArptValue]);

  return (
    <div className="edit-main flight-search-bar">
      <div className="row form-group ">
        <div className="col-md-2 col-sm-3 colin" ref={fromRef}>
          <input
            type="text"
            id="FromArpt"
            name=""
            placeholder="From*"
            value={selectedDepartureValue || fromArptInputValue}
            onFocus={() => setShowFromArptOption(true)}
            onChange={handleFromArptInputValue}
            className="editsinput"
          />
          {showFromArptOption && (
            <ul>
              {map(fromArptfilterData, (country: any, index: number) => (
                <li key={index}>
                  <h2>{country.countryName}</h2>
                  <div>
                    {country.airport.map((airport: any) => (
                      <div>
                        <input
                          checked={
                            airport.depCode.toLocaleLowerCase() ===
                            fromArptValue.toLocaleLowerCase()
                          }
                          type="radio"
                          id={airport.depCode}
                          name="FromArp"
                          value={airport.depCode}
                          onChange={handleFromArptValue}
                        />
                        <label htmlFor={airport.depCode}>
                          {airport.depAirportName} ({airport.depCode})
                        </label>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-2 col-sm-3 colin" ref={toRef}>
          <button
            onClick={changeDepAndArrValue}
            id="change"
            type="button"
            className="edit-interchange_icon"
          >
            <i className="fo-icon icon-fo-arrow-double"></i>
          </button>
          <input
            type="text"
            id="ToArpt"
            name=""
            placeholder="To*"
            value={selectedRetunValue || toArptInputValue}
            onFocus={() => setShowToArptOption(true)}
            onChange={handleToArptInputValue}
            className="editsinput"
            ref={toArptInputRef}
          />
          {showToArptOption && (
            <ul>
              {fromArptValue === "" && <h4>Select Pick Airport First</h4>}
              {map(toArptfilterData, (country: any, index: number) => (
                <li key={index}>
                  <h2>{country.countryName}</h2>
                  <div>
                    {country.airport.map((airport: any) => (
                      <div>
                        <input
                          type="radio"
                          checked={
                            airport.depCode.toLocaleLowerCase() ===
                            toArptValue.toLocaleLowerCase()
                          }
                          id={airport.depCode}
                          name="FromArp"
                          value={airport.depCode}
                          onChange={handleToArptValue}
                        />
                        <label htmlFor={airport.depCode}>
                          {airport.depAirportName} ({airport.depCode})
                        </label>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-4 col-sm-6 colin">
          <div ref={departureRef}>
            <input
              type="text"
              id="ToArpt"
              name=""
              placeholder="Daparture*"
              value={formatSelectedDate(searchFlightStartDate) || ""}
              onFocus={() => setShowFromCalender(true)}
            />
            {showFromCalender && (
              <FlightSearchDateCalendar
                setShowToCalender={setShowToCalender}
                setSearchf={setSearchf}
                startDate={searchFlightStartDate}
                endDate={searchFlightEndDate}
                setStartDate={setSearchFlightStartDate}
                setEndDate={setSearchFlightEndDate}
                showOneWayButton={false}
              />
            )}
          </div>
          <div ref={returnRef}>
            <input
              type="text"
              id="ToArpt"
              name=""
              placeholder="Return*"
              value={searchf}
              onFocus={() => setShowToCalender(true)}
            />
            {showToCalender && (
              <FlightSearchDateCalendar
                setShowToCalender={setShowToCalender}
                setSearchf={setSearchf}
                startDate={searchFlightStartDate}
                endDate={searchFlightEndDate}
                setStartDate={setSearchFlightStartDate}
                setEndDate={setSearchFlightEndDate}
                showOneWayButton={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
