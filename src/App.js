import React, {useState} from 'react';
import Header from "./components/Header";
import styled from "@emotion/styled";
import Form from "./components/Form";
import Data from "./components/Data";
import Result from "./components/Result";
import Spinner from "./components/Spinner";


const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  background-color: #FFFFFF;
  padding: 3rem;
`;

function App() {

    const [summary, setSummary] = useState({
        total: 0,
        data: {
            brand: "",
            year: "",
            plan: "",
        }
    });

    const [loading, setLoading] = useState(false);

    const {data, total} = summary;

    return (
        <Container>
            <Header
                title="Cotizador de seguros"
            />
            <FormContainer>
                <Form
                    setSummary={setSummary}
                    setLoading={setLoading}
                />
                {loading ? <Spinner/> : null}
                <Data
                    data={data}
                />
                {!loading ? <Result total={parseFloat(total)}/> : null}
            </FormContainer>
        </Container>
    );
}

export default App;
