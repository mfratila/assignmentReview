import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Navbar";

const HomepagePresentationView = () => {
  const navigate = useNavigate();

  function handleNavigateToDashboard() {
    navigate("/dashboard");
  }

  function handleNavigateToCourses() {
    navigate("/materiale-didactice");
  }

  return (
    <section id="presentation" className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h1 className="mb-4">
              Bine ai venit pe EasyClass - Platforma pentru Managementul și
              Documentarea Surselor de Cod!
            </h1>
            <p className="lead">
              EasyClass este o aplicație web inovatoare, proiectată pentru a
              oferi studenților și profesorilor un mediu eficient și organizat
              pentru gestionarea și documentarea surselor de cod. Cu ajutorul
              EasyClass, veți putea să vă organizați temele și proiectele
              într-un mod simplu și intuitiv, să primiți feedback rapid și să
              colaborați mai eficient cu colegii și profesorii.
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6}>
            <h2 className="mb-4">Obiectivele EasyClass:</h2>
            <ul className="list-unstyled">
              <li>Facilitarea colaborării între studenți și profesori.</li>
              <li>Management eficient al temelor și proiectelor.</li>
              <li>
                Documentarea surselor de cod într-un mod organizat și accesibil.
              </li>
              <li>
                Feedback rapid și precis pentru îmbunătățirea performanțelor
                academice.
              </li>
            </ul>
          </Col>
          <Col md={6}>
            <h2 className="mb-4">Cerințele și Funcționalitățile EasyClass:</h2>
            <ul className="list-unstyled">
              <li>
                Autentificare securizată pentru studenți, profesori și
                administratori.
              </li>
              <li>
                Tablou de bord personalizat pentru vizualizarea și gestionarea
                temelor și proiectelor.
              </li>
              <li>
                Depunere și revizuire a temelor cu adăugare de feedback și
                modificare a stării temelor.
              </li>
              <li>
                Creare de utilizatori și gestionare a conturilor de utilizator.
              </li>
              <li>Notificări prin e-mail pentru informări și feedback.</li>
              <li>
                Adăugare și gestionare a comentariilor pentru teme și proiecte.
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
           <Col md={4} className="mb-4">
            <Button variant="primary" size="lg" onClick={handleNavigateToDashboard} block>
              Depune o Temă
            </Button>
          </Col>
          <Col md={4} className="mb-4">
            <Button variant="primary" size="lg" onClick={handleNavigateToCourses} block>
              Vizualizează Materialele Didactice
            </Button>
          </Col> 
        </Row>
      </Container>
    </section>
  );
};

export default HomepagePresentationView;
