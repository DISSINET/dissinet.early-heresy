import React, { useState } from "react";
import {
  Accordion,
  InputGroup,
  Form,
  Offcanvas,
  Dropdown,
} from "react-bootstrap";

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

  return (
    <>
      <InputGroup
        size="sm"
        style={{ marginBottom: "-5px", cursor: "pointer" }}
        onClick={handleShowBeliefs}
      >
        <InputGroup.Text>by religion</InputGroup.Text>
      </InputGroup>
      <Offcanvas show={showBeliefs} onHide={handleCloseBeliefs} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter by religion</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Dropdown.Divider />
            <Dropdown.Item value={10}>
              <b>against Church's tradition</b>
            </Dropdown.Item>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="101" className="ps-4">
                    against Church's authoritative writings
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="1011">
                    <small className="ps-4 text-secondary">
                      partial rejection of the Old Testament
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1011">
                    <small className="ps-4 text-secondary">
                      rejection of writings of the doctors of the Church
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="102" className="ps-4 font-weight-bold">
                    against Church's practices
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="1021">
                    <small className="ps-4 text-secondary">
                      rejection of infant baptism
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1022">
                    <small className="ps-4 text-secondary">
                      rejection of fasting
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Dropdown.Divider />
            <Dropdown.Item value={1}>
              <b>against Church/society</b>
            </Dropdown.Item>

            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="11" className="ps-4">
                    against priestly exclusivity
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="111">
                    <small className="ps-4 text-secondary">
                      Eucharist cannot be consecrated by
                    </small>
                    <br />
                    <small className="ps-4 text-secondary">
                      an unworthy priest
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="112">
                    <small className="ps-4 text-secondary">
                      priests do not have the power to bind or loose
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="12" className="ps-4">
                    against priestly posessions
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="121">
                    <small className="ps-4 text-secondary">
                      clergy ought not to have any possessions
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="122">
                    <small className="ps-4 text-secondary">
                      rejection of tithing
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="13" className="ps-4">
                    against Roman Church
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="131">
                    <small className="ps-4 text-secondary">
                      rejection of the Roman Church
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="14" className="ps-4">
                    agaist social order
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="141">
                    <small className="ps-4 text-secondary">
                      only God ought to be obeyed and not other men
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="142">
                    <small className="ps-4 text-secondary">
                      rejection of oath
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="15" className="ps-4">
                    anticlericalism
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="151">
                    <small className="ps-4 text-secondary">
                      attacks on clergy
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="152">
                    <small className="ps-4 text-secondary">
                      rejection of clergy
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="153">
                    <small className="ps-4 text-secondary">
                      rejection of symbols of episcopal power
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Dropdown.Divider />

            <Dropdown.Item value={12}>
              <b>against cult</b>
            </Dropdown.Item>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="121" className="ps-4">
                    against cult
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="1211">
                    <small className="ps-4 text-secondary">
                      rejection of cult
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1212">
                    <small className="ps-4 text-secondary">
                      rejection of cult of martyrs
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1213">
                    <small className="ps-4 text-secondary">
                      rejection of cult of saints
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1214">
                    <small className="ps-4 text-secondary">
                      rejection of cult of confessors
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1215">
                    <small className="ps-4 text-secondary">
                      disrespect for holy days
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1216">
                    <small className="ps-4 text-secondary">
                      rejection of ecclesiastical canticles
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1217">
                    <small className="ps-4 text-secondary">
                      rejection of Mass
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1218">
                    <small className="ps-4 text-secondary">
                      rejection of imposition of hands
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1219">
                    <small className="ps-4 text-secondary">
                      rejection of pilgrimages
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="122" className="ps-4">
                    against sacraments
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="1221">
                    <small className="ps-4 text-secondary">
                      rejection of baptism as sacrament
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1221">
                    <small className="ps-4 text-secondary">
                      rejection of Eucharist as sacrament
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1222">
                    <small className="ps-4 text-secondary">
                      rejection of sacraments
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1223">
                    <small className="ps-4 text-secondary">
                      rejection of confession as sacrament
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1224">
                    <small className="ps-4 text-secondary">
                      rejection of marriage as sacrament
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1225">
                    <small className="ps-4 text-secondary">
                      rejection of ordination
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1226">
                    <small className="ps-4 text-secondary">
                      non est preceptum Evangelii ire
                    </small>
                    <br />
                    <small className="ps-4 text-secondary">
                      ad sacerdotem pro penitentia
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1227">
                    <small className="ps-4 text-secondary">
                      rejection of baptism with chrism and oil
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1228">
                    <small className="ps-4 text-secondary">
                      rejection of anointing with the chrism
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="123" className="ps-4">
                    against sacred spaces
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="1231">
                    <small className="ps-4 text-secondary">
                      Eucharist can be celebrated at any place
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1231">
                    <small className="ps-4 text-secondary">
                      attacks on church buildings
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1233">
                    <small className="ps-4 text-secondary">
                      rejection of material churches
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1234">
                    <small className="ps-4 text-secondary">
                      rejection of church buildings as sacred
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="124" className="ps-4">
                    antiiconism
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="1241">
                    <small className="ps-4 text-secondary">
                      disrespect for cross
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1242">
                    <small className="ps-4 text-secondary">
                      disrespect for effigies of Christ
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1243">
                    <small className="ps-4 text-secondary">
                      disrespect for holy images
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Dropdown.Divider />
            <Dropdown.Item value={7}>
              <b>alternative social structure</b>
            </Dropdown.Item>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="71" className="ps-4">
                    alternative Church ministers
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="711">
                    <small className="ps-4 text-secondary">
                      heretical pope
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="712">
                    <small className="ps-4 text-secondary">
                      alternative Church ministers
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="713">
                    <small className="ps-4 text-secondary">
                      heretical bishops
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="72" className="ps-4">
                    alternative social structure
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="721">
                    <small className="ps-4 text-secondary">
                      internal group structure
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Dropdown.Divider />
            <Dropdown.Item value={2}>
              <b>asceticism/strictness</b>
            </Dropdown.Item>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="21" className="ps-4">
                    alimentary restrictions
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="211">
                    <small className="ps-4 text-secondary">
                      monastic alimentary restrictions
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="212">
                    <small className="ps-4 text-secondary">fasting</small>
                  </Dropdown.Item>
                  <Dropdown.Item value="213">
                    <small className="ps-4 text-secondary">
                      reduction of alcohol consumption
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="214">
                    <small className="ps-4 text-secondary">
                      avoidance of food originating from coition
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="215">
                    <small className="ps-4 text-secondary">
                      avoidance of meat
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="22" className="ps-4">
                    apostolicity
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="221">
                    <small className="ps-4 text-secondary">
                      vita apostolica
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="23" className="ps-4">
                    asceticism/strictness
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="231">
                    <small className="ps-4 text-secondary">
                      capital sin cannot be forgiven
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="24" className="ps-4">
                    killing restrictions
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="241">
                    <small className="ps-4 text-secondary">
                      rejection of killing
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="242">
                    <small className="ps-4 text-secondary">
                      rejection of killing animals
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="25" className="ps-4">
                    property restrictions
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="251">
                    <small className="ps-4 text-secondary">
                      rejection of money
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="251">
                    <small className="ps-4 text-secondary">
                      voluntary poverty
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="251">
                    <small className="ps-4 text-secondary">
                      common property
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="26" className="ps-4">
                    rules of behaviour
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="261">
                    <small className="ps-4 text-secondary">
                      constant prayers
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="261">
                    <small className="ps-4 text-secondary">
                      multiple genuflections
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="27" className="ps-4">
                    sex/marriage restrictions
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="271">
                    <small className="ps-4 text-secondary">chastity</small>
                  </Dropdown.Item>
                  <Dropdown.Item value="272">
                    <small className="ps-4 text-secondary">
                      endorsement of white marriage
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="273">
                    <small className="ps-4 text-secondary">celibacy</small>
                  </Dropdown.Item>
                  <Dropdown.Item value="274">
                    <small className="ps-4 text-secondary">
                      rejection of procreation
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="275">
                    <small className="ps-4 text-secondary">
                      marriage can only be contracted between virgins
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="276">
                    <small className="ps-4 text-secondary">
                      marriage can be annulled only in the case of adultery
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="277">
                    <small className="ps-4 text-secondary">
                      human birth through parthenogenesis
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Dropdown.Divider />
            <Dropdown.Item value={4}>
              <b>deception</b>
            </Dropdown.Item>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="41" className="ps-4">
                    deception
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="411">
                    <small className="ps-4 text-secondary">
                      extortion of money
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="42" className="ps-4">
                    hypocrisy
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="421">
                    <small className="ps-4 text-secondary">
                      feigned celibacy
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="422">
                    <small className="ps-4 text-secondary">
                      feigned orthodoxy
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="423">
                    <small className="ps-4 text-secondary">feigned piety</small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="43" className="ps-4">
                    secrecy
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="431">
                    <small className="ps-4 text-secondary">in occulto</small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Dropdown.Divider />
            <Dropdown.Item value={9}>
              <b>heresiarch's self-deification</b>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item value={8}>
              <b>heretical practices described</b>
            </Dropdown.Item>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="81" className="ps-4">
                    heretical practices described
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="811">
                    <small className="ps-4 text-secondary">
                      wandering preaching
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="812">
                    <small className="ps-4 text-secondary">
                      proselytization
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="813">
                    <small className="ps-4 text-secondary">
                      imposition of hands
                    </small>
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item value={5}>
                    <b>heterodox eschatology</b>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="51" className="ps-4">
                    against deed-deserved salvation
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="511">
                    <small className="ps-4 text-secondary">
                      good deeds are superfluous for salvation
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="512">
                    <small className="ps-4 text-secondary">
                      rejection of prayers for the salvation of the dead
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="513">
                    <small className="ps-4 text-secondary">
                      rejection of almsgiving for the salvation of the dead
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="514">
                    <small className="ps-4 text-secondary">
                      good deeds are superfluous for salvation of the dead
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="515">
                    <small className="ps-4 text-secondary">
                      rejection of praying for the deceased
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="516">
                    <small className="ps-4 text-secondary">
                      poverty-motivated rejection of almsgiving
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="517">
                    <small className="ps-4 text-secondary">
                      rejection of mortification
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="518">
                    <small className="ps-4 text-secondary">
                      rejection of mainstream Christian cultic practices
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="519">
                    <small className="ps-4 text-secondary">
                      attitude limiting the salvatory effect of fasting
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="52" className="ps-4">
                    against purgatory
                  </Dropdown.Item>
                  <Dropdown.Item value="521">
                    <small className="ps-4 text-secondary">
                      disbelief in the existence of Purgatory
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="53" className="ps-4">
                    against resurrection
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="531">
                    <small className="ps-4 text-secondary">
                      disbelief in the resurrection of the dead
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="54" className="ps-4">
                    heterodox eschatology
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="541">
                    <small className="ps-4 text-secondary">
                      exclusivity of salvation
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="542">
                    <small className="ps-4 text-secondary">
                      self-proclamation as elect
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="55" className="ps-4">
                    in favor of deed-deserved salvation
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="551">
                    <small className="ps-4 text-secondary">
                      salvation through justice
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="551">
                    <small className="ps-4 text-secondary">
                      good deeds are enough to receive the Holy Spirit
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="56" className="ps-4">
                    salvation of unbaptized
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="561">
                    <small className="ps-4 text-secondary">
                      children attain salvation if they die unbaptized
                    </small>
                    <br />
                    <small className="ps-4 text-secondary">
                      before the age of understanding
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Dropdown.Divider />
            <Dropdown.Item value={6}>
              <b>heterodox opinion of God</b>
            </Dropdown.Item>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="61" className="ps-4">
                    heterodox attitude to Trinity
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="611">
                    <small className="ps-4 text-secondary">
                      antitrinitarism
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="612">
                    <small className="ps-4 text-secondary">
                      heterodox attitude to Trinity
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="62" className="ps-4">
                    heterodox christology
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="621">
                    <small className="ps-4 text-secondary">docetism</small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="63" className="ps-4">
                    heterodox cosmogony
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="631">
                    <small className="ps-4 text-secondary">
                      God did not create this world
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Dropdown.Divider />

            <Dropdown.Item value={3}>
              <b>malpractices</b>
            </Dropdown.Item>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="31" className="ps-4">
                    debauchery
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="311">
                    <small className="ps-4 text-secondary">sodomy</small>
                  </Dropdown.Item>
                  <Dropdown.Item value="312">
                    <small className="ps-4 text-secondary">luxuria</small>
                  </Dropdown.Item>
                  <Dropdown.Item value="313">
                    <small className="ps-4 text-secondary">pandering</small>
                  </Dropdown.Item>
                  <Dropdown.Item value="314">
                    <small className="ps-4 text-secondary">hedonism</small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="32" className="ps-4">
                    malpractices
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="321">
                    <small className="ps-4 text-secondary">
                      adoratio diaboli
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Dropdown.Divider />

            <Dropdown.Item value={11}>
              <b>martyrdom</b>
            </Dropdown.Item>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Dropdown.Item value="111" className="ps-4">
                    martyrdom
                  </Dropdown.Item>
                </Accordion.Header>
                <Accordion.Body>
                  <Dropdown.Item value="1111">
                    <small className="ps-4 text-secondary">
                      preparedness for martyrdom
                    </small>
                  </Dropdown.Item>
                  <Dropdown.Item value="1112">
                    <small className="ps-4 text-secondary">
                      undergoing martyrdom
                    </small>
                  </Dropdown.Item>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <InputGroup
        size="sm"
        className="mb-3"
        style={{ marginTop: "10px", cursor: "pointer" }}
        onClick={handleShowDealing}
      >
        <InputGroup.Text>by intervention</InputGroup.Text>
      </InputGroup>
      <Offcanvas show={showDealing} onHide={handleCloseDealing} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter by intervention</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Dropdown.Divider />
            <Dropdown.Item value="1">
              <b>exclusion/shaming</b>
            </Dropdown.Item>
            <Dropdown.Item value="C1097" className="ps-4">
              degradation
            </Dropdown.Item>
            <Dropdown.Item value="C1106" className="ps-4">
              excommunication
            </Dropdown.Item>
            <Dropdown.Item value="C1228" className="ps-4">
              exhumation
            </Dropdown.Item>
            <Dropdown.Item value="C1862" className="ps-4">
              banishment
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item value="2">
              <b>ordeal</b>
            </Dropdown.Item>
            <Dropdown.Item value="C1813" className="ps-4">
              trial by water
            </Dropdown.Item>
            <Dropdown.Item value="C2296" className="ps-4">
              trial by Eucharist
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item value="3">
              <b>violence</b>
            </Dropdown.Item>
            <Dropdown.Item value="C1058" className="ps-4">
              extermination of heretics
            </Dropdown.Item>
            <Dropdown.Item value="C1063" className="ps-4">
              burning
            </Dropdown.Item>
            <Dropdown.Item value="C1098" className="ps-4">
              corporeal mutilation
            </Dropdown.Item>
            <Dropdown.Item value="C1147" className="ps-4">
              death by fire
            </Dropdown.Item>
            <Dropdown.Item value="C1048" className="ps-4">
              death by sword
            </Dropdown.Item>
            <Dropdown.Item value="C1266" className="ps-4">
              apprehension
            </Dropdown.Item>
            <Dropdown.Item value="C1282" className="ps-4">
              hanging
            </Dropdown.Item>
            <Dropdown.Item value="1737" className="ps-4">
              killing of a heretic
            </Dropdown.Item>
            <Dropdown.Item value="C1852" className="ps-4">
              incarceration
            </Dropdown.Item>
            <Dropdown.Item value="C1990" className="ps-4">
              military action
            </Dropdown.Item>
            <Dropdown.Item value="C2297" className="ps-4">
              death by mob lynching
            </Dropdown.Item>
            <Dropdown.Item value="C2298" className="ps-4">
              attempted mob lynching
            </Dropdown.Item>
            <Dropdown.Divider />

            <Dropdown.Item value="4">
              <b>persuation</b>
            </Dropdown.Item>
            <Dropdown.Item value="C1048" className="ps-4">
              public debate
            </Dropdown.Item>
            <Dropdown.Item value="C1051" className="ps-4">
              reconversion to Catholicism
            </Dropdown.Item>
            <Dropdown.Item value="C1265" className="ps-4">
              hearing
            </Dropdown.Item>
            <Dropdown.Item value="C1323" className="ps-4">
              abjuration of heretical errors
            </Dropdown.Item>
            <Dropdown.Item value="C1638" className="ps-4">
              preaching mission
            </Dropdown.Item>
            <Dropdown.Divider />

            <Dropdown.Item value="5">
              <b>other</b>
            </Dropdown.Item>
            <Dropdown.Item value="C1740" className="ps-4">
              death of a heretic
            </Dropdown.Item>
            <Dropdown.Item value="C1052" className="ps-4">
              suicide
            </Dropdown.Item>
            <Dropdown.Item value="C1367" className="ps-4">
              divine punishment
            </Dropdown.Item>
            <Dropdown.Item value="C1569" className="ps-4">
              relapse into heresy
            </Dropdown.Item>
            <Dropdown.Item value="C2272" className="ps-4">
              flight
            </Dropdown.Item>
            <Dropdown.Item value="C3237" className="ps-4">
              attempted flight
            </Dropdown.Item>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterTree;
