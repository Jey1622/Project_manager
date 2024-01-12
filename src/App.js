import './App.css';
import Navebar from './components/Navebar';
import AddTask from './components/AddTask';
import { Col, Container, Row } from 'react-bootstrap';
import TasksList from './components/TasksList';

function App() {
  return (
    <Container>
   <Navebar/>
   <Row className="justify-content-md-center">
        <Col  lg="6">
        <AddTask/>
        <TasksList/>
        </Col>
    </Row>
    </Container>
  );
}

export default App;
