import React, {useState} from 'react';
import './App.css';
import Row from './components/Row'
import Col from './components/Col'
import BreakRow from './components/BreakRow'

function App() {
  const [total, settotal] = useState(21);
  return (
    <div className="App">
      <Row style={{background: 'teal'}} className="xxxx">
        {new Array(total).fill(1).map((n, i) => <Col width={1/5} key={i}>
          <div className="box red"></div>
        </Col>)}
      </Row>
      <button onClick={() => settotal(total+1)}>add</button>
      <button onClick={() => settotal(total-1)}>reduce</button>
      <hr />
      <Row>
        <Col width={0.5}>
          <Row>
            <Col width={0.5}>
              <div className="box red"></div>
            </Col>
            <Col width={0.5}>
              <div className="box red"></div>
            </Col>
          </Row>
        </Col>
        <Col width={0.5}>
          <div className="box red"></div>
        </Col>
        <Col width={0.5}>
          <div className="box yellow"></div>
        </Col>
        <Col width={0.2} xsGrow>
          <div className="box red">Grow xs</div>
        </Col>
        <BreakRow xs></BreakRow>
        <Col width={0.2} xsGrow>
          <div className="box red">Grow xs</div>
        </Col>
        <BreakRow></BreakRow>
        <Col grow>
          <div className="box red"></div>
        </Col>
        <Col width={0.2}>
          <div className="box red"></div>
        </Col>
        <BreakRow></BreakRow>
        <Col grow>
          <div className="box red"></div>
        </Col>
        <BreakRow></BreakRow>
        <Col>
          <h2>2</h2>
        </Col>
        <Col width={0.2}>
          <div className="box red"></div>
        </Col>
        <Col width={0.2}>
          <div className="box red"></div>
          <hr />
          <div className="box red"></div>
        </Col>
        <Col xs={0.5}>
          <div className="box red"></div>
        </Col>
        <Col width={0.5}>
          <div className="box red"></div>
        </Col>
        <Col width={0.5}>
          <div className="box red"></div>
        </Col>
        <Col width={0.5}>
          <div className="box yellow"></div>
        </Col>
        <Col width={0.5}>
          <hr />
        </Col>
        <Col width="100px">
          <hr />
        </Col>
        <Col width={1}>
          <div className="box red"></div>
        </Col>
        <Col>
          <div className="box yellow"></div>
        </Col>
        <Col grow>
          <div className="box red"></div>
        </Col>
        <BreakRow></BreakRow>
        <Col grow>
          <div className="box red"></div>
        </Col>
        <Col>
          <hr />
        </Col>
        <Col width={0.6}>
          <div>
            <Row>
              <Col width={0.5}>
                <Row>
                  <Col width={0.5}>
                    <div className="box yellow"></div>
                  </Col>
                  <Col width={0.5}>
                    <div className="box yellow"></div>
                  </Col>
                </Row>
              </Col>
              <Col width={0.5}>
                <div className="box yellow"></div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col width={0.5}>
          <div className="box red"></div>
        </Col>
        <Col width={50}>
          <div className="box red"></div>
        </Col>
        <Col grow>
          <div className="box red"></div>
        </Col>
        <BreakRow></BreakRow>
        <Col width={50}>
          <div className="box red"></div>
        </Col>
        <Col width={200}>
          <div className="box red"></div>
        </Col>
        <Col width={2} grow>
          <div className="box red"></div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
