import React from "react";
import { Badge, CloseButton } from "react-bootstrap";
import outcome from "../../data/outcome";
import practices from "../../data/practices";
import outcome_aggregation_level1 from "../../data/outcome_agg1";
import { selectOutcomes, selectPractices } from "./../layout/LayoutSlice";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { BsXLg } from "react-icons/bs";

type FilterViewProps = {
  type: number;
};

const FilterView = ({ type }: FilterViewProps): JSX.Element => {
  const selectedOutcomes = useAppSelector(
    (state) => state.layout.selectedOutcomes
  );
  const selectedOutcomeLogic = useAppSelector(
    (state) => state.layout.outcomeLogic
  );
  const selectedPractices = useAppSelector(
    (state) => state.layout.selectedPractices
  );
  const selectedPracticeLogic = useAppSelector(
    (state) => state.layout.practiceLogic
  );
  const dispatch = useAppDispatch();

  function removeOutcome(e: any) {
    let selectedOutcomeIds = new Set(selectedOutcomes);
    selectedOutcomeIds.delete(e.target.id);
    dispatch(selectOutcomes(Array.from(selectedOutcomeIds)));
  }

  function removePractice(e: any) {
    let selectedPracticeIds = new Set(selectedPractices);
    selectedPracticeIds.delete(e.target.id);
    dispatch(selectPractices(Array.from(selectedPracticeIds)));
  }

  function buildOutcomeFilterView() {
    const filterV =
      selectedOutcomes.map((e: string, i) => {
        return (
          <>
            <Badge id={e} bg="filter" pill>
              {e.startsWith("OA")
                ? outcome_aggregation_level1[e].label
                : outcome[e].label}{" "}
              <small>
                {" "}
                <BsXLg
                  id={e}
                  style={{ cursor: "pointer" }}
                  onClick={(event) => removeOutcome(event)}
                />
              </small>
            </Badge>
            {i != selectedOutcomes.length - 1 ? (
              <i style={{ color: "#2CB1BC" }}>
                <small> {selectedOutcomeLogic} </small>
              </i>
            ) : (
              ""
            )}
          </>
        );
      }) || "";
    return filterV;
  }

  function buildPracticeFilterView() {
    const filterV =
      selectedPractices.map((e: string, i) => {
        return (
          <>
            <Badge id={e} bg="filter" pill>
              {practices[e].label}
              <small>
                {" "}
                <BsXLg
                  id={e}
                  style={{ cursor: "pointer" }}
                  onClick={(event) => removePractice(event)}
                />
              </small>
            </Badge>
            {i != selectedPractices.length - 1 ? (
              <i style={{ color: "#2CB1BC" }}>
                <small> {selectedPracticeLogic} </small>
              </i>
            ) : (
              ""
            )}
          </>
        );
      }) || "";
    return filterV;
  }

  let output;
  switch (type) {
    case 1:
      output = <div>{buildPracticeFilterView()}</div>;
      break;
    case 2:
      output = <div>{buildOutcomeFilterView()}</div>;
      break;
  }
  return output as JSX.Element;
};

export default FilterView;
