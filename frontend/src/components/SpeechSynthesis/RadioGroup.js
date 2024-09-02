
import React from "react";
import styled from "@emotion/styled";

export function RadioGroup({ label, children, value, onChange }) {
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
    align-items: center;
    border: none;
    width: 100%;
`;

const RadioGroupContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: none;
    gap: 60px;
    width: 100%;
`;


const Legend = styled.legend`
    font-size: 24px;
    font-weight: 500;
    margin-top: 60px;
    margin-bottom: 30px;
    color: black;
    text-align: center;
`;

