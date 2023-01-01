import React from "react";
import ReactSlider from "react-slider";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { setTimeFilter } from "./../layout/LayoutSlice";
import { Button } from "react-bootstrap";

const TimeSlider: React.FC = ({}) => {
  const timeFilter = useAppSelector((state) => state.layout.timeFilter);
  const dispatch = useAppDispatch();

  function selectTimeFilter(value: Array<number>) {
    dispatch(setTimeFilter(value));
  }

  return (
    <>
      <div style={{ marginBottom: "12px", marginTop: "8px" }}>
        <small>
          From <span className="year">{timeFilter[0]}</span> to{" "}
          <span className="year">{timeFilter[1]}</span>
        </small>
        {timeFilter.includes(1000) && timeFilter.includes(1155) ? (
          ""
        ) : (
          <>
            <span
              style={{
                cursor: "pointer",
                color: "#0d6efd",
                marginLeft: "10px",
              }}
              onClick={() => {
                dispatch(setTimeFilter([1000, 1155]));
              }}
            >
              <small>(reset)</small>
            </span>
          </>
        )}
      </div>
      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        min={1000}
        max={1155}
        defaultValue={[1000, 1155]}
        value={timeFilter}
        onChange={(value) => selectTimeFilter(value)}
        pearling
      />
      <br />
    </>
  );
};

export default TimeSlider;
