import React from "react";
import ReactSlider from "react-slider";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import {
  setTimeFilter,
  switchTimeFilter,
  clearAllSelections,
} from "./../layout/LayoutSlice";
import Form from "react-bootstrap/Form";

type TimeSliderProps = {};

const TimeSlider = ({}: TimeSliderProps): JSX.Element => {
  const timeFilter = useAppSelector((state) => state.layout.timeFilter);
  const timeFilterEnabled = useAppSelector(
    (state) => state.layout.timeFilterEnabled
  );
  const dispatch = useAppDispatch();

  function selectTimeFilter(value: Array<number>) {
    dispatch(setTimeFilter(value));
  }

  function dispSwitchTimeFilter(value: boolean) {
    dispatch(switchTimeFilter(value));
    if (!value) {
      dispatch(clearAllSelections());
      dispatch(setTimeFilter([1000, 1155]));
    } else {
      selectTimeFilter([1000, 1155]);
    }
  }

  return (
    <>
      <div style={{ marginBottom: "12px", marginTop: "8px" }}>
        <Form.Check
          inline
          aria-label="enable time filter"
          checked={timeFilterEnabled}
          onChange={() => dispSwitchTimeFilter(!timeFilterEnabled)}
        />
        <small>
          <b>time filter</b> – from{" "}
          <span className="year">{timeFilter[0]}</span> to{" "}
          <span className="year">{timeFilter[1]}</span>
        </small>
        {timeFilter.includes(1000) && timeFilter.includes(1155) ? "" : ""}
      </div>
      <ReactSlider
        disabled={!timeFilterEnabled}
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
