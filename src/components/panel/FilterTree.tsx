import React, { useState } from "react";
import {
  InputGroup,
  Form,
  Button,
  Container,
  Offcanvas,
  Dropdown,
  Row,
} from "react-bootstrap";
import FilterView from "./FilterView";
import outcome from "../../data/outcome";
import outcome_aggregation_level1 from "../../data/outcome_agg1";
import practice_aggregation_level1 from "../../data/practice_agg1";
import practice_aggregation_level2 from "../../data/practice_agg2";
import practices from "../../data/practices";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import {
  selectOutcomes,
  setOutcomeLogic,
  selectOutcomeAggregations,
  selectPractices,
  selectPracticeAggregations1,
  selectPracticeAggregations2,
  setPracticeLogic,
} from "./../layout/LayoutSlice";
import { BsCheckLg, BsListUl } from "react-icons/bs";

const FilterTree: React.FC = ({}) => {
  //filter controls
  const [beliefsFilter, toggleBeliefsFilter] = useState(false);
  const [beliefsValue, setBeliefsValue] = useState("0");
  const [outcomeFilter, toggleOutcomeFilter] = useState(false);
  const [outcomeValue, setOutcomeValue] = useState("0");

  // filter panel controls
  const [showBeliefs, setShowBeliefs] = useState(false);
  const handleCloseBeliefs = () => setShowBeliefs(false);
  const handleShowBeliefs = () => setShowBeliefs(true);

  const [showDealing, setShowDealing] = useState(false);
  const handleCloseDealing = () => setShowDealing(false);
  const handleShowDealing = () => setShowDealing(true);
  const selectedOutcomes = useAppSelector(
    (state) => state.layout.selectedOutcomes
  );
  const selectedOutcomeAggregations = useAppSelector(
    (state) => state.layout.selectedOutcomeAggregations
  );
  const selectedPractices = useAppSelector(
    (state) => state.layout.selectedPractices
  );
  const selectedOutcomeLogic = useAppSelector(
    (state) => state.layout.outcomeLogic
  );
  const selectedPracticeLogic = useAppSelector(
    (state) => state.layout.practiceLogic
  );
  const selectedPracticeAggregations1 = useAppSelector(
    (state) => state.layout.selectedPracticeAggregations1
  );
  const selectedPracticeAggregations2 = useAppSelector(
    (state) => state.layout.selectedPracticeAggregations2
  );

  const dispatch = useAppDispatch();

  function selectOutcome(selectedId: string) {
    let selectedOutcomeIds = new Set(selectedOutcomes);
    if (selectedOutcomeIds.has(selectedId)) {
      selectedOutcomeIds.delete(selectedId);
    } else {
      selectedOutcomeIds.add(selectedId);
    }
    dispatch(selectOutcomes(Array.from(selectedOutcomeIds)));
  }

  function selectOutcomeAgg(selectedId: string) {
    let selectedOutcomeAggIds = new Set(selectedOutcomeAggregations);
    let selectedOutcomeIds = new Set(selectedOutcomes);
    if (selectedOutcomeAggIds.has(selectedId)) {
      selectedOutcomeAggIds.delete(selectedId);
      outcome_aggregation_level1[selectedId].members.forEach((member) => {
        selectedOutcomeIds.delete(member);
      });
    } else {
      selectedOutcomeAggIds.add(selectedId);
      outcome_aggregation_level1[selectedId].members.forEach((member) => {
        selectedOutcomeIds.add(member);
      });
    }
    dispatch(selectOutcomeAggregations(Array.from(selectedOutcomeAggIds)));
    //add or remove outcomes for the aggregation
    dispatch(selectOutcomes(Array.from(selectedOutcomeIds)));
  }

  function clearOucomes() {
    dispatch(selectOutcomes([]));
    dispatch(selectOutcomeAggregations([]));
  }

  function changeOutcomeLogic(e: any) {
    dispatch(setOutcomeLogic(e.target.value));
  }

  function selectPractice(selectedId: string) {
    let selectedPracticeIds = new Set(selectedPractices);
    if (selectedPracticeIds.has(selectedId)) {
      selectedPracticeIds.delete(selectedId);
    } else {
      selectedPracticeIds.add(selectedId);
    }
    dispatch(selectPractices(Array.from(selectedPracticeIds)));
  }

  function selectPracticeAgg1(selectedId: string) {
    let selectedPracticeAggIds = new Set(selectedPracticeAggregations1);
    let selectedPracticeIds = new Set(selectedPractices);
    console.log(selectedPracticeIds);
    console.log(selectedId);
    if (selectedPracticeAggIds.has(selectedId)) {
      selectedPracticeAggIds.delete(selectedId);
      practice_aggregation_level1[selectedId].members.forEach((member) => {
        selectedPracticeIds.delete(member);
      });
    } else {
      selectedPracticeAggIds.add(selectedId);
      practice_aggregation_level1[selectedId].members.forEach((member) => {
        selectedPracticeIds.add(member);
      });
    }
    console.log(selectedPracticeIds);
    dispatch(selectPracticeAggregations1(Array.from(selectedPracticeAggIds)));
    dispatch(selectPractices(Array.from(selectedPracticeIds)));
  }

  function selectPracticeAgg2(selectedId: string) {
    let selectedPracticeAggIds = new Set(selectedPracticeAggregations2);
    let selectedPracticeIds = new Set(selectedPractices);
    if (selectedPracticeAggIds.has(selectedId)) {
      selectedPracticeAggIds.delete(selectedId);
      practice_aggregation_level2[selectedId].members.forEach((member) => {
        selectedPracticeIds.delete(member);
      });
    } else {
      selectedPracticeAggIds.add(selectedId);
      practice_aggregation_level2[selectedId].members.forEach((member) => {
        selectedPracticeIds.add(member);
      });
    }
    dispatch(selectPracticeAggregations2(Array.from(selectedPracticeAggIds)));
    dispatch(selectPractices(Array.from(selectedPracticeIds)));
  }

  function clearPractices() {
    dispatch(selectPractices([]));
  }

  function changePracticeLogic(e: any) {
    dispatch(setPracticeLogic(e.target.value));
  }

  function filterControl(label: string, type: number, action: any = null) {
    //types: 1 -- beleifs, 1 -- practices

    let control;
    switch (type) {
      case 1:
        control = (
          <>
            <InputGroup.Text
              onClick={action}
              style={{ cursor: "pointer", flexGrow: 1 }}
            >
              <BsListUl style={{ marginRight: "6px" }} />
              {label}
            </InputGroup.Text>
            {selectedPractices.length > 1 ? (
              <Form.Select
                style={{ maxWidth: "100px" }}
                aria-label="boolean logic"
                title="filter combination logic"
                value={selectedPracticeLogic}
                onChange={(e) => changePracticeLogic(e)}
              >
                <option value="and">and</option>
                <option value="or">or</option>
              </Form.Select>
            ) : (
              ""
            )}
            {selectedPractices.length > 0 ? (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={clearPractices}
              >
                clear
              </Button>
            ) : (
              ""
            )}
          </>
        );
        break;
      case 2:
        control = (
          <>
            <InputGroup.Text
              onClick={action}
              style={{ cursor: "pointer", flexGrow: 1 }}
            >
              <BsListUl style={{ marginRight: "6px" }} />
              {label}
            </InputGroup.Text>
            {selectedOutcomes.length > 1 ? (
              <Form.Select
                style={{ maxWidth: "100px" }}
                aria-label="boolean logic"
                title="filter combination logic"
                value={selectedOutcomeLogic}
                onChange={(e) => changeOutcomeLogic(e)}
              >
                <option value="and">and</option>
                <option value="or">or</option>
              </Form.Select>
            ) : (
              ""
            )}
            {selectedOutcomes.length > 0 ? (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={clearOucomes}
              >
                clear
              </Button>
            ) : (
              ""
            )}
          </>
        );
        break;
    }
    return control;
  }

  function buildOutcomeTree() {
    let outcome_ag1 = "";
    const outcomeIds = Object.keys(outcome);
    const outcomeAggregations = Object.values(outcome_aggregation_level1);
    let outcomeTree = outcomeIds.map((e) => {
      if (outcome[e].aggregation_level1 != outcome_ag1) {
        outcome_ag1 = outcome[e].aggregation_level1;
        let selected_aggregation =
          outcomeAggregations.find((ag) => ag.label === outcome_ag1) ||
          outcomeAggregations[0];
        return (
          <>
            <Dropdown.Divider />
            <Dropdown.Item
              id={selected_aggregation.id}
              onClick={() => selectOutcomeAgg(selected_aggregation.id)}
            >
              <b>{outcome[e].aggregation_level1}</b>
            </Dropdown.Item>
            <Dropdown.Item
              id={outcome[e].id}
              onClick={() => selectOutcome(outcome[e].id)}
              className="ps-4"
            >
              <BsCheckLg
                style={{
                  color: "blue",
                  opacity: selectedOutcomes.includes(outcome[e].id) ? 1 : 0,
                }}
              />{" "}
              {outcome[e].label}
            </Dropdown.Item>
          </>
        );
      } else {
        return (
          <Dropdown.Item
            id={outcome[e].id}
            onClick={() => selectOutcome(outcome[e].id)}
            className="ps-4"
          >
            <BsCheckLg
              style={{
                color: "blue",
                opacity: selectedOutcomes.includes(outcome[e].id) ? 1 : 0,
              }}
            />{" "}
            {outcome[e].label}
          </Dropdown.Item>
        );
      }
    });
    return outcomeTree;
  }

  function buildPracticeTree() {
    let practice_ag1 = "";
    let practice_ag2 = "";
    const practiceAggregations1 = Object.values(practice_aggregation_level1);
    const practiceAggregations2 = Object.values(practice_aggregation_level2);
    const practiceIds = Object.keys(practices);
    let practiceTree = practiceIds.map((e) => {
      if (practices[e].aggregation_level1 != practice_ag1) {
        practice_ag1 = practices[e].aggregation_level1;
        practice_ag2 = practices[e].aggregation_level2;
        let selected_aggregation1 =
          practiceAggregations1.find((ag) => ag.label === practice_ag1) ||
          practiceAggregations1[0];
        let selected_aggregation2 =
          practiceAggregations2.find((ag) => ag.label === practice_ag2) ||
          practiceAggregations2[0];
        return (
          <>
            <Dropdown.Divider />
            <Dropdown.Item
              id={selected_aggregation1.id}
              onClick={() => selectPracticeAgg1(selected_aggregation1.id)}
            >
              <b>{practices[e].aggregation_level1}</b>
            </Dropdown.Item>
            <Dropdown.Item
              className="ps-4"
              id={selected_aggregation2.id}
              onClick={() => selectPracticeAgg2(selected_aggregation2.id)}
            >
              {practices[e].aggregation_level2}
            </Dropdown.Item>
            <Dropdown.Item
              id={practices[e].id}
              onClick={() => selectPractice(practices[e].id)}
              style={{ paddingLeft: "2.8em" }}
            >
              <small
                className="ps-2 text-secondary"
                style={{
                  maxWidth: "300px",
                  whiteSpace: "initial",
                  textIndent: "4em",
                  marginLeft: "-2em",
                }}
              >
                <BsCheckLg
                  style={{
                    color: "blue",
                    opacity: selectedPractices.includes(practices[e].id)
                      ? 1
                      : 0,
                  }}
                />{" "}
                {practices[e].label}
              </small>
            </Dropdown.Item>
          </>
        );
      } else {
        if (practices[e].aggregation_level2 != practice_ag2) {
          practice_ag2 = practices[e].aggregation_level2;
          let selected_aggregation2 =
            practiceAggregations2.find((ag) => ag.label === practice_ag2) ||
            practiceAggregations2[0];
          return (
            <>
              <Dropdown.Item
                className="ps-4"
                id={selected_aggregation2.id}
                onClick={() => selectPracticeAgg2(selected_aggregation2.id)}
              >
                {practices[e].aggregation_level2}
              </Dropdown.Item>
              <Dropdown.Item
                id={practices[e].id}
                onClick={() => selectPractice(practices[e].id)}
                style={{ paddingLeft: "2.8em" }}
              >
                <small
                  className="ps-2 text-secondary"
                  style={{
                    maxWidth: "300px",
                    whiteSpace: "initial",
                    textIndent: "4em",
                    marginLeft: "-2em",
                  }}
                >
                  <BsCheckLg
                    style={{
                      color: "blue",
                      opacity: selectedPractices.includes(practices[e].id)
                        ? 1
                        : 0,
                    }}
                  />{" "}
                  {practices[e].label}
                </small>
              </Dropdown.Item>{" "}
            </>
          );
        } else {
          return (
            <Dropdown.Item
              id={practices[e].id}
              onClick={() => selectPractice(practices[e].id)}
              style={{ paddingLeft: "2.8em" }}
            >
              <small
                className="ps-2 text-secondary"
                style={{
                  maxWidth: "300px",
                  whiteSpace: "initial",
                  textIndent: "4em",
                  marginLeft: "-2em",
                }}
              >
                <BsCheckLg
                  style={{
                    color: "blue",
                    opacity: selectedPractices.includes(practices[e].id)
                      ? 1
                      : 0,
                  }}
                />{" "}
                {practices[e].label}
              </small>
            </Dropdown.Item>
          );
        }
      }
    });
    return practiceTree;
  }

  return (
    <>
      <InputGroup
        size="sm"
        style={{ marginTop: "8px", marginBottom: "6px", cursor: "pointer" }}
      >
        {filterControl("by religion", 1, handleShowBeliefs)}
      </InputGroup>
      <FilterView type={1} />
      <Offcanvas show={showBeliefs} onHide={handleCloseBeliefs} placement="end">
        <Offcanvas.Header closeButton>
          <Container>
            <Row>
              <InputGroup
                size="sm"
                className="mb-3"
                style={{ marginTop: "10px" }}
              >
                {filterControl("Filter by religion", 1)}
              </InputGroup>
            </Row>
            <Row>
              <FilterView type={1} />
            </Row>
          </Container>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>{buildPracticeTree()}</Form>
        </Offcanvas.Body>
      </Offcanvas>

      <InputGroup size="sm" className="mb-3" style={{ marginTop: "10px" }}>
        {filterControl("by intervention", 2, handleShowDealing)}
      </InputGroup>
      <FilterView type={2} />
      <Offcanvas show={showDealing} onHide={handleCloseDealing} placement="end">
        <Offcanvas.Header closeButton>
          <Container>
            <Row>
              <InputGroup
                size="sm"
                className="mb-3"
                style={{ marginTop: "10px" }}
              >
                {filterControl("Filter by intervention", 2)}
              </InputGroup>
            </Row>
            <Row>
              <FilterView type={2} />
            </Row>
          </Container>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>{buildOutcomeTree()}</Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterTree;
