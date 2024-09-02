import styled from "@emotion/styled";

export function Radio({ children, value, checked, onChange }) {
    return (
        <RadioLabel>
            <RadioInput
                type="radio"
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
            />
            <CustomRadio checked={checked} />
            {children}
        </RadioLabel>
    );
}

const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    margin-bottom: 10px;
`;

const RadioInput = styled.input`
    display: none;
`;

const CustomRadio = styled.span`
    width: 8px; 
    height: 8px;
    border-radius: 50%;
    border: 5px solid ${props => props.checked ? "rgb(252, 129, 158)" : "#ccc"};
    position: relative;
`;