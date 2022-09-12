import React, { useState, useContext } from "react";
import isEmpty  from "lodash/isEmpty";
import styled from "styled-components";
import CustomButton from "../../../components/customButton";
import CustomIndicationList from "../../../components/customIndicationList";
import ContextStepLine from "../../../context/contextStepLine";
import ContextAdmin from "../../../context/contextAdmin";

const DateAsigned = styled.div`
  text-align: center;
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

const selectDate = [
    { id: "09:00", text: "9:00 am" }, 
    { id: "09:30", text: "9:30 am" }, 
    { id: "10:00", text: "10:00 am" },
    { id: "10:30", text: "10:30 am" },
    { id: "11:00", text: "11:00 am" },
    { id: "11:30", text: "11:30 am" },
    { id: "12:00", text: "12:00 pm" },
    { id: "12:30", text: "12:30 pm" },
    { id: "13:00", text: "01:00 pm" },
    { id: "13:30", text: "01:30 pm" },
    { id: "14:00", text: "02:00 pm" },
    { id: "14:30", text: "02:30 pm" },
    { id: "15:00", text: "03:00 pm" },
    { id: "15:30", text: "03:30 pm" },
    { id: "16:00", text: "04:00 pm" },
    { id: "16:30", text: "04:30 pm" },
    { id: "17:00", text: "05:00 pm" },
    { id: "17:30", text: "05:30 pm" },
    { id: "18:00", text: "06:00 pm" }
];

const ScheduleDate = () => {
    const dataContent = useContext(ContextStepLine);
    const dataAdmin = useContext(ContextAdmin);
    const [valueDate, setValueDate] = useState("");
    const [valueHour, setValueHour] = useState("");

    return (
      <div className="section-shadow padding-2-1">

        <CustomIndicationList>
            <DateAsigned>
                <h3>Ingresa la información para programar una cita con el cliente</h3>
                <ContainerInput>
                    <div className="container-input">
                        <input placeholder="Fecha" value={valueDate} type="date" onChange={(e) => {
                            const value = e.target.value;
                            const day = new Date(value).getUTCDay();
                            if ([0, 6].includes(day)) {
                                window.alert("Lo sentimos, no hay servicio los fines de semana");
                            } else {
                                setValueDate(value);
                            }
                        }} />
                        <div className="line-y"/>
                        <select value={valueHour} onChange={(e)=>{
                            const value=e.target.value;
                            setValueHour(value);
                        }}>
                            <option disabled value="">
                             Selecciona la hora
                            </option>
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
                    onClick={async()=>{
                        try {
                            if (isEmpty(valueDate)||isEmpty(valueHour)) {
                          window.alert("Asegurate de asignar la fecha y hora");                                
                            }else{

                                if (
                                    window.confirm(
                                        "¿Estas seguro de la cita asignada?"
                            )
                            ) {
                            await dataAdmin.setPipeLineAdminStep({
                              idStep:dataContent.content.idStep,
                              idStepLine:null,
                              metadata:JSON.stringify({
                                location: {latitud: null, longitud: null},
                                scheduleAt: `${valueDate} ${valueHour}`
                                })
                            });
                        }
                    }
                        } catch (error) {
                          
                        }
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