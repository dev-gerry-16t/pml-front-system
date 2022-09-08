import React, { useState } from "react";
import styled from "styled-components";
import CustomButton from "../../../components/customButton";
import CustomIndicationList from "../../../components/customIndicationList";

const DateAsigned = styled.div`
  text-align: center;
  color: var(--color-brand-secondary);
  display: flex;
  flex-direction: column;
  padding-bottom: 2em;
  border-bottom: 0.5px solid #090c41;
`;

const ButtonsActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

const ContainerInput = styled.div`
    display: flex;
    justify-content: center;
.container-input{
    display: grid;
    border-radius: 1em;
    grid-template-columns: 1fr 2px 1fr;
padding: 1em;
    border: 1px solid var(--color-font-primary);
    input{
        border: none;
        background: transparent;
        color:var(--color-font-light) ;
        font-family: "Lato";
        outline: none;
        font-size: 1em;
    }
    select{
        border: none;
        background: transparent;
        color:var(--color-font-light);
        font-family:"Lato";
        outline: none;
        font-size: 1em;
    }
    .line-y{
        width: 2px;
        border-right: 1px solid var(--color-font-light);
    }
}
`;

const selectDate = [{ id: "09:00", text: "9:00 am" }, { id: "09:30", text: "9:30 am" }, { id: "10:00", text: "10:00 am" }];

const ScheduleDate = () => {
    const [valueDate, setValueDate] = useState("");
    return (
      <div className="section-shadow padding-2-1">

        <CustomIndicationList>
            <DateAsigned>
                <p>Ingresa la información para programar una cita con el cliente</p>
                <ContainerInput>
                    <div className="container-input">
                        <input placeholder="Fecha" value={valueDate} type="date" onChange={(e) => {
                            const value = e.target.value;
                            const day = new Date(value).getUTCDay();
                            console.log(value);
                            console.log(day);
                            if ([0, 6].includes(day)) {
                                window.alert("Lo sentimos, no hay servicio los fines de semana");

                            } else {

                                setValueDate(value);
                            }
                        }} />
                        <div className="line-y"/>
                        <select>
                            {selectDate.map((row,ix) => {
                                return (
                                    <option key={`option-${ix}`} value={row.id}>{row.text}</option>
                                );
                            })}
                        </select>
                    </div>
                </ContainerInput>
            </DateAsigned>
            <ButtonsActions>
                <CustomButton
                    style={{
                        padding: "0.5em 2em",
                    }}
                    formatType="tertiary"
                >
                    Cancelar
                </CustomButton>
                <CustomButton
                    style={{
                        padding: "0.5em 2em",
                    }}
                >
                    Aceptar
                </CustomButton>
            </ButtonsActions>
        </CustomIndicationList>
        </div>
    );
};

export default ScheduleDate;