import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {capitalize} from "../helper";

const DataContainer = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838F;
  color: #FFF;
  margin-top: 1rem;
`;

const Data = ({data}) => {

    const {brand, year, plan} = data;
    if (brand === "" || year === "" || plan === "" ) return null;

    return (
        <DataContainer>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: {capitalize(brand)}</li>
                <li>Año: {year}</li>
                <li>Plan: {capitalize(plan)}</li>
            </ul>
        </DataContainer>
    );
}

Data.propTypes = {
    data: PropTypes.object.isRequired
};


export default Data;