import React from "react";
import { Badge, CloseButton } from "react-bootstrap";
import { useAppSelector } from "./../../app/hooks";
import outcome from "../../data/outcome";
import outcome_aggregation_level1 from "../../data/outcome_agg1";

const FilterView: React.FC = ({}) => {
  const selectedOutcomes = useAppSelector(
    (state) => state.layout.selectedOutcomes
  );

  console.log(selectedOutcomes);

  function buildFilterView() {
    const filterV =
      selectedOutcomes.map((e: string, i) => {
        return (
          <>
            <Badge id={e} bg="filter" pill>
              {e.startsWith("OA")
                ? outcome_aggregation_level1[e].label
                : outcome[e].label}{" "}
            </Badge>
            {i != selectedOutcomes.length - 1 ? (
              <i style={{ color: "#2CB1BC" }}>
                <small> and </small>
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
