
import React from "react";
import styled from "@emotion/styled";

export function PetRadioGroup({ label, children, value, onChange }) {
    return (
        <RadioGroupWrapper>
            <Legend>{label}</Legend>
            <RadioGroupContent>
                {React.Children.map(children, (child) =>
                    React.cloneElement(child, {
                        checked: child.props.value === value,
                        onChange: onChange,
                    })
                )}
            </RadioGroupContent>
        </RadioGroupWrapper>
    );
}

const RadioGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: none;
    width: 70%;
    gap: 10px;
    margin-bottom: 40px;
`;

const RadioGroupContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border: none;
    width: 80%;
    gap: 20px; 
`;

const Legend = styled.legend`
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
    color: black;
`;