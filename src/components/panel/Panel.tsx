import React, { useEffect, useState } from "react";
import Hero from "./../Hero";
import FilterTree from "./FilterTree";
import TimeSlider from "./TimeSlider";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import {
  ListGroup,
  Modal,
  Badge,
  Accordion,
  Button,
  CloseButton,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import {
  addCase,
  selectCases,
  addLocation,
  addMentions,
  clearAllSelections,
  selectMentions,
  selectLocation,
} from "./../layout/LayoutSlice";
import calculateDatation from "./../../utils/calculateDatation";
import legend from "./../../assets/legend.png";
import treatYearEntry from "../../utils/treatYearEntry";
import treatLocationsEntry from "../../utils/treatLocationsEntry";

const PanelComponent: React.FC = ({}) => {
  const cases = useAppSelector((state) => state.layout.cases);
  const mentions = useAppSelector((state) => state.layout.mentions);
  const selectedCaseIds = useAppSelector(
    (state) => state.layout.selectedCaseIds
  );
  const selectedMentionIds = useAppSelector(
    (state) => state.layout.selectedMentionIds
  );
  const selectedLocations = useAppSelector(
    (state) => state.layout.selectedLocations
  );
  const selectedOutcomes = useAppSelector(
    (state) => state.layout.selectedOutcomes
  );
  const practiceLogic = useAppSelector((state) => state.layout.practiceLogic);
  const selectedPractices = useAppSelector(
    (state) => state.layout.selectedPractices
  );
  const timeFilterEnabled = useAppSelector(
    (state) => state.layout.timeFilterEnabled
  );
  const outcomeLogic = useAppSelector((state) => state.layout.outcomeLogic);
  const dispatch = useAppDispatch();
  const timeFilter = useAppSelector((state) => state.layout.timeFilter);

  const [infoModal, toggleInfoModal] = useState(true);
  const handleInfoModalClose = () => toggleInfoModal(false);
  const handleInfoModalShow = () => toggleInfoModal(true);

  const now = new Date();

  useEffect(() => {
    applyFilter();
  }, [
    selectedOutcomes,
    selectedPractices,
    practiceLogic,
    timeFilterEnabled,
    outcomeLogic,
    dispatch,
    timeFilter,
  ]);

  // filters to be used in applyFilter()
  // we look for overlapping interval
  // for intervals [a,b], [c,d]:
  // b > c && a < d
  const isInTimeRange = (val: any) =>
    treatYearEntry(val.year_start_post_quem) <= timeFilter[1] &&
    treatYearEntry(val.year_end_ante_quem) >= timeFilter[0];

  const hasReligion = (val: any) => {
    if (selectedPractices.length == 0) {
      return val;
    } else {
      const beliefsArray = treatLocationsEntry(val.beliefs_id).split(" ");
      const practicesArray = treatLocationsEntry(val.practice_id).split(" ");
      const religionArray = beliefsArray.concat(practicesArray);
      if (practiceLogic == "and") {
        const isSubset = selectedPractices.every((item) =>
          religionArray.includes(item)
        );
        if (isSubset) {
          return val;
        }
      } else {
        const isMember = selectedPractices.some((item) =>
          religionArray.includes(item)
        );
        if (isMember) {
          return val;
        }
      }
    }
  };

  const hasIntervention = (val: any) => {
    if (selectedOutcomes.length == 0) {
      return val;
    } else {
      let dealingArray = treatLocationsEntry(val.dealing_with_them_id).split(
        " "
      );
      let outcomeArray = treatLocationsEntry(val.outcome_id).split(" ");
      let interventionArray = dealingArray.concat(outcomeArray);
      if (outcomeLogic == "and") {
        const isSubset = selectedOutcomes.every((item) =>
          interventionArray.includes(item)
        );
        if (isSubset) {
          return val;
        }
      } else {
        const isMember = selectedOutcomes.some((item) =>
          interventionArray.includes(item)
        );
        if (isMember) {
          return val;
        }
      }
    }
  };

  function applyFilter() {
    let matchingMentions: any = [];
    let matchingLocations: any = [];
    let matchingCases: any = new Set();

    if (
      selectedPractices.length !== 0 ||
      selectedOutcomes.length !== 0 ||
      timeFilterEnabled
    ) {
      //TODO here do some caching?
      const filteredMentions = Object.values(mentions)
        .filter(isInTimeRange)
        .filter(hasReligion)
        .filter(hasIntervention);

      filteredMentions.map((val: any) => {
        let locationsArray = val.location_primary_id
          ? treatLocationsEntry(val.location_primary_id).split(" ")
          : [];
        let deduplicatedLocationsArray = new Set(locationsArray);
        matchingLocations.push(...Array.from(deduplicatedLocationsArray));
        matchingCases.add(val.case_id);
        matchingMentions.push(val.id);
      });
    }

    dispatch(selectLocation(matchingLocations));
    dispatch(selectMentions(matchingMentions));
    dispatch(selectCases(Array.from(matchingCases)));
  }

  function getMentionsAndLocations(case_id: string) {
    let matchingMentions: any = [];
    let matchingLocations: any = [];
    Object.values(mentions).map((val: any) => {
      if (val.case_id === case_id) {
        matchingMentions.push(val.id);

        let locationsArray = val.location_primary_id
          ? treatLocationsEntry(val.location_primary_id).split(" ")
          : [];
        let deduplicatedLocationsArray = new Set(locationsArray);
        matchingLocations.push(...Array.from(deduplicatedLocationsArray));
      }
    });
    return [matchingMentions, matchingLocations];
  }

  function handleCaseDeselect(val: string, mentionsLocations: Array<any>) {
    let filteredCaseIds = selectedCaseIds.filter((e) => e != val);
    let filteredMentions = selectedMentionIds.filter(
      (e) => !mentionsLocations[0].includes(e)
    );
    let filteredLocations = [...selectedLocations];
    mentionsLocations[1].forEach((loc: any) => {
      let index = filteredLocations.indexOf(loc);
      if (index > -1) {
        filteredLocations.splice(index, 1);
      }
    });
    if (filteredCaseIds.length) {
      dispatch(selectCases(filteredCaseIds));
      dispatch(selectMentions(filteredMentions));
      dispatch(selectLocation(filteredLocations));
    } else {
      dispatch(clearAllSelections());
    }
  }

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function caseList() {
    return (
      <ListGroup>
        {Object.values(cases).map((val: any, i) => {
          let date = calculateDatation(
            val["year_start_post_quem"],
            val["year_start_ante_quem"],
            val["year_end_post_quem"],
            val["year_end_ante_quem"]
          );
          let mentionsLocations = getMentionsAndLocations(val["case_id"]);
          if (selectedCaseIds.includes(val["case_id"])) {
            return (
              <ListGroup.Item
                key={i}
                className="caseListItem"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleCaseDeselect(val["case_id"], mentionsLocations);
                }}
              >
                <Badge bg="primary" pill>
                  {val["case_id"]}
                </Badge>
                &nbsp;&nbsp;&nbsp;
                <b>{capitalizeFirstLetter(val["case_label"])}</b>{" "}
                <span style={{ fontSize: "12px", marginLeft: "0.5em" }}>
                  ({date})&nbsp;
                  <i>
                    {mentionsLocations[0].length}&nbsp;mention
                    {mentionsLocations[0].length > 1 ? "s " : " "}
                  </i>
                  <i style={{ color: "#0d6efd" }}>
                    {
                      selectedMentionIds.filter((e) =>
                        mentionsLocations[0].includes(e)
                      ).length
                    }{" "}
                    displayed
                  </i>
                </span>
              </ListGroup.Item>
            );
          } else {
            return (
              <ListGroup.Item
                key={i}
                className="caseListItem"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(addCase([val["case_id"]]));
                  dispatch(addMentions(mentionsLocations[0]));
                  dispatch(addLocation(mentionsLocations[1]));
                }}
              >
                <Badge bg="clean" text="dark" pill>
                  {val["case_id"]}
                </Badge>
                &nbsp;&nbsp;&nbsp;
                {capitalizeFirstLetter(val["case_label"])}{" "}
                <span style={{ fontSize: "12px", marginLeft: "0.5em" }}>
                  ({date})&nbsp;
                  <i>
                    {mentionsLocations[0].length}&nbsp;mention
                    {mentionsLocations[0].length > 1 ? "s" : ""}
                  </i>
                </span>
              </ListGroup.Item>
            );
          }
        })}
      </ListGroup>
    );
  }

  function dissinetLogo() {
    return (
      <svg
        className="pin-r"
        width="178"
        height="68"
        viewBox="0 0 178 68"
        fill="black"
        transform="scale(0.6 0.6)"
      >
        <path d="M-0.06,3l0,26.6l4.14,0l0,-26.6zm4.29,0l2.59,26.6l1.4,0l-2.58,-26.6zm6.73,0l-2.58,26.6l1.4,0l2.59,-26.6zm1.56,0l0,26.6l4.18,0l0,-26.6zm15.69,0l0,20.48c0,3.57,3.23,6.35,6.69,6.35c3.46,0,6.69,-2.78,6.69,-6.35l0,-20.48l-4.18,0l0,20.33c0,1.44,-1.29,2.47,-2.51,2.47c-1.22,0,-2.51,-1.03,-2.51,-2.47l0,-20.33zm26.26,0l0,26.6l4.18,0l0,-26.6zm4.33,0l3.95,26.6l1.45,0l-3.95,-26.6zm5.55,0l0,26.6l4.18,0l0,-26.6zm18.05,25.12l0,1.48l11.36,0l0,-1.48l-3.61,0l0,-23.64l3.61,0l0,-1.48l-11.36,0l0,1.48l3.57,0l0,23.64z" />
        <path d="M6.21,41.5l-5.74,26.6l2.13,0l1.79,-8.4l7.75,0l1.82,8.4l2.13,0l-5.66,-26.6l-2.05,0l3.42,16.3l-7.07,0l3.49,-16.3zm22.72,0l0,26.6l2.06,0l0,-11.25l3.45,0l6.31,11.25l2.36,0l-6.5,-11.48c3.12,-0.26,5.59,-2.88,5.59,-6.11l0,-2.66c0,-3.46,-2.89,-6.35,-6.35,-6.35zm6.73,13.41l-4.67,0l0,-11.51l4.67,0c2.43,0,4.52,1.98,4.52,4.48l0,2.4c0,2.73,-1.97,4.63,-4.52,4.63zm24.81,-11.51l0,24.7l2.06,0l0,-24.7l7.1,0l0,-1.9l-16.26,0l0,1.9zm27.63,24.93c3.65,0,6.57,-2.59,6.57,-6.35l0,-1.63c0,-4.33,-3.64,-5.82,-6.15,-6.39c-2.32,-0.53,-4.94,-1.4,-4.94,-4.52l0,-1.78c0,-2.47,2.13,-4.41,4.52,-4.41c2.36,0,4.52,1.94,4.52,4.41l0,0.95l2.05,0l0,-0.99c0,-3.65,-2.92,-6.35,-6.57,-6.35c-3.65,0,-6.57,2.7,-6.57,6.35l0,1.82c0,4.45,3.76,5.85,6.08,6.39c2.43,0.53,5.01,1.4,5.01,4.56l0,1.55c0,2.47,-2.13,4.41,-4.48,4.41c-2.4,0,-4.56,-1.94,-4.56,-4.41l0,-0.87l-2.05,0l0,0.91c0,3.76,2.92,6.35,6.57,6.35z" />
        <path d="M111.23,3.01l0,10.68l3.55,0c3.63,0,5.67,-1.92,5.67,-5.34c0,-3.42,-2.04,-5.34,-5.67,-5.34zm2.19,1.89l1.33,0c2.3,0,3.42,1.14,3.42,3.45c0,2.31,-1.12,3.45,-3.42,3.45l-1.33,0zm10.71,-0.09l0,-1.8l-2.1,0l0,1.8zm0,8.88l0,-7.62l-2.1,0l0,7.62zm4.87,-7.86c-1.88,0,-3.14,0.97,-3.14,2.34c0,1.77,1.36,2.07,2.64,2.4c1.18,0.31,1.75,0.45,1.75,1.11c0,0.45,-0.37,0.73,-1.11,0.73c-0.87,0,-1.33,-0.43,-1.33,-1.2l-2.13,0c0,1.85,1.3,2.72,3.41,2.72c2.07,0,3.37,-0.96,3.37,-2.39c0,-1.86,-1.5,-2.2,-2.87,-2.56c-1.15,-0.3,-1.63,-0.44,-1.63,-0.98c0,-0.43,0.35,-0.7,1.03,-0.7c0.75,0,1.2,0.33,1.2,1.11l2.01,0c0,-1.7,-1.2,-2.58,-3.2,-2.58zm7.86,0c-1.89,0,-3.14,0.97,-3.14,2.34c0,1.77,1.36,2.07,2.63,2.4c1.19,0.31,1.76,0.45,1.76,1.11c0,0.45,-0.38,0.73,-1.11,0.73c-0.87,0,-1.34,-0.43,-1.34,-1.2l-2.13,0c0,1.85,1.31,2.72,3.42,2.72c2.07,0,3.36,-0.96,3.36,-2.39c0,-1.86,-1.5,-2.2,-2.86,-2.56c-1.16,-0.3,-1.64,-0.44,-1.64,-0.98c0,-0.43,0.36,-0.7,1.04,-0.7c0.75,0,1.2,0.33,1.2,1.11l2.01,0c0,-1.7,-1.2,-2.58,-3.2,-2.58zm7.13,-1.02l0,-1.8l-2.1,0l0,1.8zm0,8.88l0,-7.62l-2.1,0l0,7.62zm8.97,0l0,-10.68l-2.1,0l0,3.97l-0.03,0c-0.47,-0.72,-1.29,-1.11,-2.16,-1.11c-1.91,0,-3.14,1.58,-3.14,4.01c0,2.43,1.25,4,3.17,4c0.88,0,1.72,-0.42,2.19,-1.2l0.03,0l0,1.01zm-3.58,-6.21c0.94,0,1.59,0.88,1.59,2.4c0,1.51,-0.65,2.4,-1.59,2.4c-1.01,0,-1.66,-0.95,-1.66,-2.4c0,-1.46,0.65,-2.4,1.66,-2.4zm8.92,4.96c-0.9,0,-1.67,-0.55,-1.73,-2.13l5.48,0c0,-0.84,-0.08,-1.42,-0.24,-1.95c-0.48,-1.54,-1.77,-2.53,-3.53,-2.53c-2.38,0,-3.78,1.74,-3.78,3.99c0,2.43,1.4,4.11,3.8,4.11c2.02,0,3.34,-1.16,3.64,-2.55l-2.14,0c-0.11,0.61,-0.66,1.06,-1.5,1.06zm-0.02,-5.13c0.85,0,1.53,0.53,1.67,1.68l-3.33,0c0.16,-1.15,0.81,-1.68,1.66,-1.68zm9.54,-1.42c-0.97,0,-1.74,0.46,-2.23,1.14l-0.03,0l0,-0.96l-1.97,0l0,7.62l2.1,0l0,-4.08c0,-1.38,0.63,-2.07,1.5,-2.07c0.83,0,1.34,0.52,1.34,1.68l0,4.47l2.1,0l0,-4.68c0,-2.07,-1.1,-3.12,-2.81,-3.12zm8.1,6.22c-0.72,0,-0.99,-0.33,-0.99,-1.17l0,-3.31l1.46,0l0,-1.56l-1.46,0l0,-1.98l-2.1,0l0,1.98l-1.23,0l0,1.56l1.23,0l0,3.69c0,1.77,0.77,2.47,2.52,2.47c0.36,0,0.83,-0.06,1.11,-0.15l0,-1.6c-0.13,0.04,-0.34,0.07,-0.54,0.07z" />
        <path d="M120.41,31.69l0,-10.68l-2.11,0l0,4.11c0,1.54,0.04,3.09,0.11,4.63l-0.02,0c-0.61,-1.48,-1.28,-2.98,-1.95,-4.41l-2.08,-4.33l-3.13,0l0,10.68l2.11,0l0,-4.11c0,-1.55,-0.04,-3.09,-0.12,-4.63l0.03,0c0.61,1.48,1.28,2.98,1.95,4.4l2.08,4.34zm5.55,-1.25c-0.9,0,-1.66,-0.55,-1.73,-2.13l5.48,0c0,-0.84,-0.08,-1.42,-0.24,-1.95c-0.48,-1.54,-1.77,-2.53,-3.53,-2.53c-2.38,0,-3.77,1.74,-3.77,3.99c0,2.43,1.39,4.11,3.79,4.11c2.02,0,3.35,-1.16,3.64,-2.55l-2.14,0c-0.1,0.61,-0.66,1.06,-1.5,1.06zm-0.02,-5.13c0.84,0,1.53,0.53,1.67,1.68l-3.33,0c0.16,-1.15,0.81,-1.68,1.66,-1.68zm8.68,4.8c-0.72,0,-0.99,-0.33,-0.99,-1.17l0,-3.31l1.45,0l0,-1.56l-1.45,0l0,-1.98l-2.1,0l0,1.98l-1.23,0l0,1.56l1.23,0l0,3.69c0,1.77,0.76,2.47,2.52,2.47c0.36,0,0.82,-0.06,1.11,-0.15l0,-1.6c-0.14,0.04,-0.35,0.07,-0.54,0.07zm11.46,1.58l1.67,-7.62l-2.08,0l-0.57,2.94c-0.21,1.09,-0.41,2.22,-0.55,3.31l-0.03,0c-0.18,-1.09,-0.39,-2.17,-0.65,-3.28l-0.68,-2.97l-2.88,0l-0.67,2.97c-0.25,1.11,-0.46,2.19,-0.64,3.28l-0.03,0c-0.16,-1.09,-0.35,-2.22,-0.56,-3.31l-0.57,-2.94l-2.09,0l1.69,7.62l3,0l0.67,-3c0.24,-1.06,0.45,-2.16,0.63,-3.26l0.03,0c0.18,1.1,0.39,2.2,0.63,3.26l0.68,3zm6.09,-7.86c-2.39,0,-3.9,1.57,-3.9,4.05c0,2.47,1.51,4.05,3.9,4.05c2.38,0,3.89,-1.58,3.89,-4.05c0,-2.48,-1.51,-4.05,-3.89,-4.05zm0,1.62c1.03,0,1.69,0.94,1.69,2.43c0,1.48,-0.66,2.43,-1.69,2.43c-1.04,0,-1.7,-0.95,-1.7,-2.43c0,-1.49,0.66,-2.43,1.7,-2.43zm9.49,-1.5c-0.9,0,-1.57,0.37,-2.08,1.2l-0.03,0l0,-1.08l-1.94,0l0,7.62l2.1,0l0,-3.6c0,-1.5,0.69,-2.31,1.98,-2.31c0.21,0,0.42,0.03,0.66,0.07l0,-1.81c-0.21,-0.06,-0.48,-0.09,-0.69,-0.09zm9.1,7.74l-3.2,-4.11l2.89,-3.51l-2.37,0l-2.46,3.07l-0.03,0l0,-6.13l-2.1,0l0,10.68l2.1,0l0,-3.57l0.03,0l2.55,3.57zm3.33,-7.86c-1.88,0,-3.14,0.97,-3.14,2.34c0,1.77,1.36,2.07,2.64,2.4c1.18,0.31,1.75,0.45,1.75,1.11c0,0.45,-0.37,0.73,-1.11,0.73c-0.87,0,-1.33,-0.43,-1.33,-1.2l-2.13,0c0,1.85,1.3,2.72,3.42,2.72c2.06,0,3.36,-0.96,3.36,-2.39c0,-1.86,-1.5,-2.2,-2.87,-2.56c-1.15,-0.3,-1.63,-0.44,-1.63,-0.98c0,-0.43,0.36,-0.7,1.03,-0.7c0.75,0,1.2,0.33,1.2,1.11l2.01,0c0,-1.7,-1.2,-2.58,-3.2,-2.58z" />
        <path d="M111.23,39.01l0,10.68l2.21,0l0,-3.78l1.83,0c2.59,0,3.91,-1.38,3.91,-3.45c0,-2.07,-1.32,-3.45,-3.91,-3.45zm2.21,1.83l1.53,0c1.39,0,1.96,0.61,1.96,1.62c0,1,-0.57,1.62,-1.96,1.62l-1.53,0zm11.17,1.11c-0.9,0,-1.58,0.37,-2.09,1.2l-0.03,0l0,-1.08l-1.93,0l0,7.62l2.1,0l0,-3.6c0,-1.5,0.69,-2.31,1.98,-2.31c0.21,0,0.42,0.03,0.66,0.07l0,-1.81c-0.21,-0.06,-0.48,-0.09,-0.69,-0.09zm5.05,-0.12c-2.38,0,-3.9,1.58,-3.9,4.05c0,2.47,1.52,4.05,3.9,4.05c2.39,0,3.9,-1.58,3.9,-4.05c0,-2.47,-1.51,-4.05,-3.9,-4.05zm0,1.62c1.04,0,1.7,0.94,1.7,2.43c0,1.48,-0.66,2.43,-1.7,2.43c-1.03,0,-1.69,-0.95,-1.69,-2.43c0,-1.49,0.66,-2.43,1.69,-2.43zm7.58,-2.64l0,-1.8l-2.1,0l0,1.8zm0,1.26l-2.1,0l0,7.47c0,1.09,-0.39,1.41,-1.13,1.41c-0.15,0,-0.28,-0.02,-0.4,-0.04l0,1.51c0.3,0.07,0.64,0.12,1.03,0.12c1.52,0,2.6,-0.77,2.6,-2.69zm5.34,6.38c-0.9,0,-1.67,-0.56,-1.73,-2.14l5.48,0c0,-0.84,-0.08,-1.42,-0.24,-1.95c-0.48,-1.54,-1.77,-2.53,-3.53,-2.53c-2.38,0,-3.78,1.74,-3.78,3.99c0,2.43,1.4,4.11,3.8,4.11c2.02,0,3.34,-1.16,3.64,-2.55l-2.14,0c-0.11,0.61,-0.66,1.07,-1.5,1.07zm-0.02,-5.14c0.84,0,1.53,0.53,1.67,1.68l-3.33,0c0.16,-1.15,0.81,-1.68,1.66,-1.68zm8.81,-1.48c-2.33,0,-3.84,1.59,-3.84,4.05c0,2.46,1.51,4.05,3.84,4.05c2.05,0,3.43,-1.29,3.6,-3.23l-2.21,0c-0.06,1,-0.6,1.61,-1.41,1.61c-1.02,0,-1.63,-0.93,-1.63,-2.43c0,-1.5,0.61,-2.43,1.63,-2.43c0.81,0,1.35,0.55,1.43,1.46l2.19,0c-0.17,-1.79,-1.55,-3.08,-3.6,-3.08zm8.5,6.28c-0.72,0,-0.99,-0.33,-0.99,-1.16l0,-3.32l1.46,0l0,-1.56l-1.46,0l0,-1.98l-2.1,0l0,1.98l-1.23,0l0,1.56l1.23,0l0,3.69c0,1.77,0.77,2.47,2.52,2.47c0.36,0,0.83,-0.06,1.11,-0.15l0,-1.6c-0.13,0.05,-0.34,0.07,-0.54,0.07z" />
        <desc>Dissident Networks Project</desc>
      </svg>
    );
  }

  return (
    <div
      className="panel"
      data-testid="panel-wrapper"
      style={{
        maxHeight: "100%",
        position: "fixed",
        display: "flex",
        flexFlow: "column nowrap",
      }}
    >
      <Hero />
      <div
        style={{
          padding: "1em",
          overflow: "scroll",
          display: "flex",
          flexFlow: "column nowrap",
          gap: "20px",
        }}
      >
        <div id="casesHeader" style={{ marginBottom: "-1rem" }}>
          <b>Cases</b>&nbsp;&nbsp;
          {selectedCaseIds.length ? (
            <>
              <span className="infoText">
                {selectedCaseIds.length} selected
              </span>
              &nbsp; &nbsp;
              <Button
                size="sm"
                variant="outline-primary"
                style={{ marginBottom: "2px" }}
                onClick={() => {
                  dispatch(clearAllSelections());
                }}
              >
                clear selection
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
        <div
          id="cases"
          style={{
            maxHeight: "30%",
            height: "30%",
            overflow: "scroll",
            border: "1px solid lightgray",
            borderRadius: "5px",
          }}
        >
          {caseList()}
        </div>

        <div id="filters">
          <Accordion flush defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <b>Filter</b>
              </Accordion.Header>
              <Accordion.Body>
                <FilterTree />
                <TimeSlider />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div id="legend">
          <Accordion flush defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <b>Legend</b>
              </Accordion.Header>
              <Accordion.Body>
                <Image
                  src={legend}
                  alt="map legend"
                  style={{ maxHeight: "100px", marginTop: "8px" }}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div
          className="pt-12"
          style={{
            background: "#b8c2cc",
            marginBottom: "-1em",
            marginLeft: "-1em",
            marginRight: "-1em",
          }}
        >
          <a target="_blank" rel="noreferrer" href="https://dissinet.cz">
            {dissinetLogo()}
          </a>
          <Button
            size="sm"
            variant="outline-dark"
            style={{ position: "absolute", right: "1rem", bottom: "1rem" }}
            onClick={handleInfoModalShow}
          >
            info
          </Button>
          <Modal
            show={infoModal}
            onHide={handleInfoModalClose}
            size="xl"
            centered
          >
            <Hero />
            <CloseButton
              aria-label="Hide"
              onClick={handleInfoModalClose}
              style={{ position: "absolute", right: "1rem", top: "1rem" }}
            />{" "}
            <Modal.Body>
              <Modal.Body>
                <p>
                  This interactive map application presents{" "}
                  <b>
                    the most complete dataset of early cases of heresy in the
                    West, ca. 1000–1150
                  </b>
                  , compiled from original Latin sources. It shows locations,
                  heresy cases linked to those locations, and mentions in the
                  sources, on which the description is based. The application
                  allows <b>filtering by time, religious aspects</b> (beliefs
                  and practices), <b>and intervention</b> (type of action
                  against heresy, outcome of the case).
                </p>
                <p>
                  Each case is accompanied by a <b>list of mentions</b> in the
                  sources. Each mention constitutes an <b>independent record</b>
                  , which allows{" "}
                  <b>
                    differences in the descriptions of the same case to be
                    assessed
                  </b>
                  , as well as filtering down only to cases (and, through them,
                  locations) where at least one mention meets the query
                  condition. For each mention, a detailed <b>info box</b> can be
                  displayed, which contains the <b>name of the source</b>, a{" "}
                  <b>summary</b> of the content, <b>dates, location(s)</b>, the{" "}
                  <b>names</b> used to describe the heretics and the heresy and
                  those names’ broader
                  <b>connotations</b>, the <b>social characterization</b> of
                  people involved in the heresy, a list of{" "}
                  <b>beliefs and practices</b> stated in that source, the
                  characterization of the <b>intervention</b>, the{" "}
                  <b>outcome</b>, and notes. Under each category,{" "}
                  <b>information is given in the order of appearance</b> in the
                  mention.
                </p>
                <p>
                  <b>Year</b> follows the consensus in historiography. If a date
                  in a mention differs from it, this difference is specified in
                  the mention summary or notes.
                </p>
                <p>
                  <b>Names</b> gives a full list of the names used to describe
                  the heresy and its followers in a given mention.{" "}
                  <b>Connotations</b> are all the words used to create a
                  negative image of a given heresy and its followers.
                </p>
                <p>
                  <b>Persons</b> lists all persons or groups mentioned in the
                  source. Names in square brackets do not appear directly but
                  are derived from the broader context. If a person is known
                  from multiple sources under different orthographic variants,
                  we use a standardized version.
                </p>
                <p>
                  <b>Religion</b> lists all beliefs and practices ascribed to
                  heretics by a given mention. They are presented either in
                  English or in the original Latin version.
                </p>
                <p>
                  <b>Intervention</b> provides an English typology of action
                  against heresy and the outcome of the case.
                </p>
                <p>
                  The <b>choice of cases</b> was based on literature, especially
                  J. B. Russell’s{" "}
                  <i>Dissent and Reform in the Early Middle Ages</i> (1965) with
                  some additions from C. Taylor’s{" "}
                  <i>Heresy in Medieval France</i> (2005), M. Zerner’s{" "}
                  <i>
                    L’hérétique Henri dans les sources de son temps (1135-1145)
                  </i>{" "}
                  (2014) and A. Krawiec’s{" "}
                  <i>
                    Eudo de Stella, heretyk bretoński z XII w. i jego zwolennicy
                  </i>{" "}
                  (2003). Cases with a political or defamatory use of the word
                  “heresis” with no specific doctrinal grounds were not
                  included, just as cases openly dealing with Symoniac and
                  Nicolaite heresy or over-zealous followers of Gregorian
                  Reforms (which is why the Pataria movement and the case of
                  Ramihrdus of Cambrai are missing). Concerning the Berengarian
                  heresy, the dataset only presents the summaries of synods
                  where the case was discussed. Sermons of Adhemar of Chabannes
                  were not included, in spite of precious information about
                  possible heresies in Aquitaine, as there is no critical
                  edition of all of them available.
                </p>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <span>
                      <i className="mx-2 icon icon-book" />
                    </span>
                    <span>Data source: reading of original sources</span>
                  </li>
                  <li>
                    <span>
                      <i className="mx-2 icon icon-scroll" />
                    </span>
                    <span>
                      Type of primary source: chronicles, letters, charters,
                      theological treatises, synodal acts, annals, vitae, books
                      of miracles, <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      exegetical commentaries, etc.
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="mx-2 icon icon-layer-group" />
                    </span>
                    <span>Data: Lidia Hinz-Wieczorek</span>
                  </li>
                  <li>
                    <span>
                      <i className="mx-2 icon icon-drafting-compass" />
                    </span>
                    <span>
                      Map:{" "}
                      <a
                        href="https://pondrejk.eu/"
                        title="personal portfolio page"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Peter Ondrejka
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="mx-2 icon icon-binoculars" />
                    </span>
                    <span>Dataset design and supervision: David Zbíral</span>
                  </li>
                </ul>
                <p>
                  Recommended citation: Hinz-Wieczorek, Lidia; Ondrejka, Peter;
                  Zbíral, David (2023). Early heresy: heresy cases in the West,
                  c.1000–c.1150 (v. 0.5.0).{" "}
                  <i>Dissident Networks Project (DISSINET).</i> Retrieved{" "}
                  {now.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  , from{" "}
                  <a href="https://dissinet.cz/maps/early-heresy">
                    https://dissinet.cz/maps/early-heresy
                  </a>
                  .
                </p>
              </Modal.Body>
            </Modal.Body>
            <Modal.Footer style={{ background: "#b8c2cc" }}>
              <Row>
                <Col sm="8">
                  <small>
                    The research presented in this map application is a part of
                    the “Dissident Networks Project” (DISSINET,
                    https://dissinet.cz) and has received funding from the
                    European Research Council (ERC) under the European Union’s
                    Horizon 2020 research and innovation programme (grant
                    agreement No. 101000442). The main part of the dataset was
                    compiled during the research stay of Lidia Hinz-Wieczorek
                    with DISSINET in autumn 2021, which was funded by the Polish
                    National Agency for Academic Exchange (NAWA) under the
                    program of the personal exchange of students and scientists
                    as part of bilateral cooperation (grant agreement No.
                    PPN/BIL/2020/1/00178/U/01).
                  </small>
                </Col>
                <Col>
                  <Row>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://dissinet.cz"
                      style={{ paddingLeft: "60px" }}
                    >
                      {dissinetLogo()}
                    </a>
                    <a
                      href="https://erc.europa.eu/"
                      title="European Research Council"
                      target="_blank"
                      rel="noreferrer"
                      style={{ paddingLeft: "60px" }}
                    >
                      <img
                        src="https://cdn.muni.cz/media/3299268/logo_erc-flag_eum.png?mode=crop&amp;center=0.5,0.5&amp;rnd=132594368580000000&amp;width=278"
                        srcSet="https://cdn.muni.cz/media/3299268/logo_erc-flag_eum.png?mode=crop&amp;center=0.5,0.5&amp;rnd=132594368580000000&amp;width=278 278w,https://cdn.muni.cz/media/3299268/logo_erc-flag_eum.png?mode=crop&amp;center=0.5,0.5&amp;rnd=132594368580000000&amp;width=477 477w"
                        sizes="(min-width:1240px) 278px,(min-width:1024px) calc((100vw - 30px) * 0.5 - 20px),(min-width:768px) calc((100vw - 10px) * 0.5 - 20px),calc((100vw - 10px) * 1 - 20px)"
                        alt="European Research Council"
                        title="European Research Council"
                      />
                    </a>
                  </Row>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PanelComponent;
