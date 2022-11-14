import React from "react";
import { Badge, CloseButton } from "react-bootstrap";
import outcome from "../../data/outcome";
import outcome_aggregation_level1 from "../../data/outcome_agg1";
import { selectOutcomes } from "./../layout/LayoutSlice";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { BsXLg } from "react-icons/bs";

const FilterView: React.FC = ({}) => {
  const selectedOutcomes = useAppSelector(
    (state) => state.layout.selectedOutcomes
  );
  const selectedOutcomeLogic = useAppSelector(
    (state) => state.layout.outcomeLogic
  );
  const dispatch = useAppDispatch();

  function removeOutcome(e: any) {
    let selectedOutcomeIds = new Set(selectedOutcomes);
    selectedOutcomeIds.delete(e.target.id);
    dispatch(selectOutcomes(Array.from(selectedOutcomeIds)));
  }

  function buildFilterView() {
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

  return <div>{buildFilterView()}</div>;
};

export default FilterView;
