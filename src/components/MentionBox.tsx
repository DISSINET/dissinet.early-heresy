import React from "react";
import {
  Accordion,
  Col,
  ToastContainer,
  Toast,
  Badge,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "./../app/hooks";
import { selectCase, selectMentions } from "./layout/LayoutSlice";
import calculateDatation from "./../utils/calculateDatation";
import { IIndexable } from "../types";

const MentionBox: React.FC = ({}) => {
  const mentions = useAppSelector((state) => state.layout.mentions);
  const selectedMentionIds = useAppSelector(
    (state) => state.layout.selectedMentionIds
  );
  const dispatch = useAppDispatch();

  function buildHeader() {
    let header =
      selectedMentionIds.length > 0 ? (
        <div
          style={{
            marginBottom: "0.5em",
          }}
        >
          <b>Mentions</b>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => {
              dispatch(selectCase(""));
              dispatch(selectMentions(""));
            }}
          >
            clear selection
          </Button>
        </div>
      ) : (
        ""
      );
    return header;
  }

  function buildMentionCards() {
    let cards = selectedMentionIds.map((mentionId: string, i) => {
      const mention = (mentions as IIndexable)[mentionId];
      if (mention) {
        let date = calculateDatation(
          mention.year_start_post_quem,
          mention.year_start_ante_quem,
          mention.year_end_post_quem,
          mention.year_end_ante_quem
        );
        return (
          <Toast key={i}>
            <Toast.Header closeButton={false}>
              <Badge bg="secondary" pill>
                {mention.id}
              </Badge>
              &nbsp;&nbsp;&nbsp;
              <strong> {mention.label}</strong>
            </Toast.Header>
            <Toast.Body>
              <small className="text-muted">
                {mention.detail_case_summary}
              </small>
              <Dropdown.Divider style={{ opacity: 0.1 }} />
              <div>
                <small className="text-muted">Year:</small>{" "}
                <small>{date}</small>
              </div>
              <div>
                <small className="text-muted">Locations:</small>{" "}
                <small>{mention.location_primary_label}</small>
              </div>
              <Dropdown.Divider style={{ opacity: 0.1 }} />
              <Accordion flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <small className="text-muted">more</small>
                  </Accordion.Header>
                  <Accordion.Body>
                    <br />
                    <div>
                      <small className="text-muted">
                        Name(s) of the heretics:
                      </small>{" "}
                      <small>{mention.heretic_label}</small>
                    </div>
                    <div>
                      <small className="text-muted">
                        Number/Amount of heretics:
                      </small>{" "}
                      <small>{mention.heretics_amount_label}</small>
                    </div>
                    <div>
                      <small className="text-muted">
                        Social characterization of heretics:
                      </small>{" "}
                      <small>
                        {mention.heretics_social_characterization_label}
                      </small>
                    </div>
                    <div>
                      <small className="text-muted">
                        Instigator to the heresy:
                      </small>{" "}
                      <small>{mention.instigator_to_heresy_label}</small>
                    </div>
                    <div>
                      <small className="text-muted">Repressor:</small>{" "}
                      <small>{mention.repressor_label}</small>
                    </div>
                    <div>
                      <small className="text-muted">Other persons:</small>{" "}
                      <small>{mention.persons_or_groups_other_label}</small>
                    </div>
                    <Dropdown.Divider style={{ opacity: 0.1 }} />
                    <div>
                      <small className="text-muted">Name of the heresy:</small>{" "}
                      <small>{mention.name_of_heresy_label}</small>
                    </div>
                    <div>
                      <small className="text-muted">
                        Name of the heretics:
                      </small>{" "}
                      <small>{mention.name_of_heretics_label}</small>
                    </div>
                    <div>
                      <small className="text-muted">Connotations:</small>{" "}
                      <small>{mention.connotations_heresy_label}</small>
                    </div>
                    <Dropdown.Divider style={{ opacity: 0.1 }} />

                    <div>
                      <small className="text-muted">Beliefs:</small>{" "}
                      <small>{mention.beliefs_label}</small>
                    </div>
                    <div>
                      <small className="text-muted">Practice:</small>{" "}
                      <small>{mention.practice_label}</small>
                    </div>
                    <Dropdown.Divider style={{ opacity: 0.1 }} />
                    <div>
                      <small className="text-muted">Dealing with heresy:</small>{" "}
                      <small>{mention.dealing_with_them_label}</small>
                    </div>
                    <div>
                      <small className="text-muted">Outcome:</small>{" "}
                      <small>{mention.outcome_label}</small>
                    </div>
                    <Dropdown.Divider style={{ opacity: 0.1 }} />
                    <div>
                      <small className="text-muted">Note:</small>{" "}
                      <small>{mention.note}</small>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Toast.Body>
          </Toast>
        );
      }
    });
    return <ToastContainer className="mentionColumn">{cards}</ToastContainer>;
  }

  return (
    <Col
      sm="2"
      s="12"
      style={{
        height: "100%",
        position: "absolute",
        zIndex: 1000,
        padding: "1em",
        right: "25%",
        maxHeight: "100%",
        overflowY: "scroll",
      }}
    >
      {buildHeader()}
      {buildMentionCards()}
    </Col>
  );
};

export default MentionBox;
