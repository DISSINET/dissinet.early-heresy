import React from "react";
import { Badge, CloseButton } from "react-bootstrap";
import { useAppSelector } from "./../../app/hooks";
import outcome from "../../data/outcome";
import outcome_aggregation_level1 from "../../data/outcome_agg1";
import { BsXLg } from "react-icons/bs";

const FilterView: React.FC = ({}) => {
  const selectedOutcomes = useAppSelector(
    (state) => state.layout.selectedOutcomes
  );
  const selectedOutcomeLogic = useAppSelector(
    (state) => state.layout.outcomeLogic
  );


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
                <BsXLg style={{ cursor: "pointer" }} />
              </small>
            </Badge>
            {i != selectedOutcomes.length - 1 ? (
              <i style={{ color: "#2CB1BC" }}>
                <small> {selectedOutcomeLogic
                } </small>
              </i>
            ) : (
              ""
            )}
          </>
        );
      }) || "";
    console.log(filterV);
    return filterV;
  }

  return <div>{buildFilterView()}</div>;
};

export default FilterView;
