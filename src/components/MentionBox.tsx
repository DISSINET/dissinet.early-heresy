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
import { clearAllSelections } from "./layout/LayoutSlice";
import calculateDatation from "./../utils/calculateDatation";
import { IIndexable } from "../types";

const MentionBox: React.FC = ({}) => {
  const mentions = useAppSelector((state) => state.layout.mentions);
  const selectedMentionIds = useAppSelector(
    (state) => state.layout.selectedMentionIds
  );

  function buildHeader() {
    let header = selectedMentionIds.length > 0 ? <b>Mentions</b> : "";
    return header;
  }

  function replaceHashes(val: string | undefined) {
    if (val) {
      val = val
        .replace(/ #/gi, "; ")
        .replace(/^#/gi, "")
        .replace(/\n#/gi, "; ");
      return checkNodata(val);
    }
  }

  function replaceTildas(val: string) {
    if (val) {
      return val.replace(/~V~/gi, "");
    }
  }

  function checkNodata(val: string | undefined) {
    if (
      ["VALUE!", "#VALUE!", "C1067", "NS", "", undefined].includes(String(val))
    ) {
      return "not stated by the source";
    }
    return val;
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
              <strong> {mention.label_and_source_concatenated}</strong>
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
                <small>{replaceHashes(mention.location_label)}</small>
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
                      <small>{replaceHashes(mention.heretic_label)}</small>
                    </div>
                    <div>
                      <small className="text-muted">Number of heretics:</small>{" "}
                      <small>
                        {replaceHashes(
                          replaceTildas(mention.heretics_amount_label)
                        )}
                      </small>
                    </div>
                    <div>
                      <small className="text-muted">
                        Social characterization of heretics:
                      </small>{" "}
                      <small>
                        {replaceHashes(
                          mention.heretics_social_characterization_label
                        )}
                      </small>
                    </div>
                    <div>
                      <small className="text-muted">
                        Instigator to the heresy:
                      </small>{" "}
                      <small>
                        {replaceHashes(mention.instigator_to_heresy_label)}
                      </small>
                    </div>
                    <div>
                      <small className="text-muted">Repressor:</small>{" "}
                      <small>{replaceHashes(mention.repressor_label)}</small>
                    </div>
                    <div>
                      <small className="text-muted">Other persons:</small>{" "}
                      <small>
                        {replaceHashes(mention.person_or_groups_other_label)}
                      </small>
                    </div>
                    <Dropdown.Divider style={{ opacity: 0.1 }} />
                    <div>
                      <small className="text-muted">Name of the heresy:</small>{" "}
                      <small>
                        {replaceHashes(mention.name_of_heresy_label)}
                      </small>
                    </div>
                    <div>
                      <small className="text-muted">
                        Name of the heretics:
                      </small>{" "}
                      <small>
                        {replaceHashes(mention.name_of_heretics_label)}
                      </small>
                    </div>
                    <div>
                      <small className="text-muted">Connotations:</small>{" "}
                      <small>
                        {replaceHashes(mention.connotations_heresy_label)}
                      </small>
                    </div>
                    <Dropdown.Divider style={{ opacity: 0.1 }} />

                    <div>
                      <small className="text-muted">Beliefs:</small>{" "}
                      <small>{replaceHashes(mention.beliefs_label)}</small>
                    </div>
                    <div>
                      <small className="text-muted">Practice:</small>{" "}
                      <small>{replaceHashes(mention.practice_label)}</small>
                    </div>
                    <Dropdown.Divider style={{ opacity: 0.1 }} />
                    <div>
                      <small className="text-muted">Dealing with heresy:</small>{" "}
                      <small>
                        {replaceHashes(mention.dealing_with_them_label)}
                      </small>
                    </div>
                    <div>
                      <small className="text-muted">Outcome:</small>{" "}
                      <small>{replaceHashes(mention.outcome_label)}</small>
                    </div>
                    <Dropdown.Divider style={{ opacity: 0.1 }} />
                    <div>
                      <small className="text-muted">Note:</small>{" "}
                      <small>{replaceHashes(mention.note)}</small>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Toast.Body>
          </Toast>
        );
      }
    });
    return (
      <ToastContainer className="mentionColumn" style={{ float: "right" }}>
        {cards}
      </ToastContainer>
    );
  }

  return (
    <Col
      sm="3"
      s="12"
      style={{
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
