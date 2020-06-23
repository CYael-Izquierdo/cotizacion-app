import React, {useState} from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import {getBrandIncrement, getPlanIncrement, getYearDifference} from "../helper";

const Field = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
 flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #E1E1E1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const SubmitButton = styled.button`
  background-color: #00838F;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #FFFFFF;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color .3s ease;
  margin-top: 2rem
 ;
  
  &:hover{
    background-color: #26C6DA;
    cursor: pointer;
  }
`;

const Error = styled.div`
     background-color: red;
     color: white;
     padding: 1rem;
     width: 100%;
     text-align: center;
     margin-bottom: 2rem;
`;

const Form = ({setSummary, setLoading}) => {

    const baseResult = 2000;
    const initialForm = {
        brand: "",
        year: "",
        plan: ""
    }

    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(false);

    // Get values
    const {brand, year, plan} = form;

    // read form values and update state
    const getFormData = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // on submit
    const quoteInsurance = e => {
        e.preventDefault();

        setSummary({
            base: "",
            total: "",
            data: {
                ...initialForm
            }
        })

        if (brand.trim() === "" || plan.trim() === "" || year.trim() === "") {
            setError(true)
            return;
        }
        setError(false);

        // result init in 2000
        let result = baseResult;

        // get year difference
        const yearDifference = getYearDifference(year);
        // -3% for every year
        const yearDifferencePercent = yearDifference * (-.03 );
        result += result * yearDifferencePercent;

        // Americano +15% - Asiatico +5% - Europeo +30%
        const brandPercent = getBrandIncrement(brand);
        result += result * brandPercent;

        // Basico +20% - Completo +50%
        const planPercent = getPlanIncrement(plan);
        result += result * planPercent

        // Total
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            setSummary({
                base: baseResult,
                total: result.toFixed(2),
                data: {
                    ...form
                }
            })
        }, 3000);
    }

    return (
        <form
            onSubmit={quoteInsurance}
        >
            {error ?
                (
                    <Error>
                        Todos los campos son obligatorios
                    </Error>
                ) : null
            }
            <Field>
                <Label>Marca</Label>
                <Select
                    name="brand"
                    value={brand}
                    onChange={getFormData}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Field>

            <Field>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={getFormData}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Field>

            <Field>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={getFormData}
                /> Básico

                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={getFormData}
                /> Completo
            </Field>

            <SubmitButton type="submit">Cotizar</SubmitButton>
        </form>
    );
}

Form.propTypes = {
    setSummary: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired
};


export default Form;