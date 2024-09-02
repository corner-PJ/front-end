import styled from 'styled-components';

function ProfileInfo({ profile, setProfile }) {
    const stateHandler = (e) => {
        if (e.target.name === 'tnr') {
            setProfile({
                ...profile,
                tnr: e.target.value === 'true' ? true : false
            });
        } else {
            setProfile({
                ...profile,
                [e.target.name]: e.target.value
            });
        }
        // console.log(e.target.value)
    };

    return (
        <ProfileInfoContainer>
            <MainTitle>기본 사항</MainTitle>
            <InfoContainer>
                <InputText
                    type="text"
                    placeholder="이름"
                    value={profile.dogname}
                    name="dogname"
                    onChange={stateHandler}
                />
                <InputText
                    type="text"
                    placeholder="품종"
                    value={profile.species}
                    name="species"
                    onChange={stateHandler}
                />
                <InputText
                    type="text"
                    placeholder="예상 나이"
                    value={profile.age}
                    name="age"
                    onChange={stateHandler}
                />
                <InputText
                    type="text"
                    placeholder="임시 보호 기간"
                    value={profile.period}
                    name="period"
                    onChange={stateHandler}
                />
                <InputText
                    type="text"
                    placeholder="임시보호자 연락처"
                    value={profile.phonenum}
                    name="phonenum"
                    onChange={stateHandler}
                />
                <RadioGroup>
                    <TnrTitle>중성화 여부</TnrTitle>
                    <RadioLabel>
                        <TnrButton
                            type="radio"
                            name="tnr"
                            value={true}
                            checked={profile.tnr === true}
                            onChange={stateHandler}
                        />
                        <CustomRadio checked={profile.tnr === true} />
                        예
                    </RadioLabel>
                    <RadioLabel>
                        <TnrButton
                            type="radio"
                            name="tnr"
                            value={false}
                            checked={profile.tnr === false}
                            onChange={stateHandler}
                        />
                        <CustomRadio checked={profile.tnr === false} />
                        아니요
                    </RadioLabel>
                </RadioGroup>
            </InfoContainer>
        </ProfileInfoContainer>
    );
}

const ProfileInfoContainer = styled.div`
    width: 1080px;
    height: 200px;
    margin-bottom: 20px;
    border: 2px solid #000000;
    border-radius: 15px;
    padding: 30px 30px 60px;
`;

const MainTitle = styled.div`
    font-size: 1.4em;
    font-weight: bold;
    text-align: left;
`;

const InfoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
    margin: 30px;
`;

const InputText = styled.input`
    border: none;
    border-bottom: 2px solid #000000;
    font-size: 19px;
    height: 20px;
    padding: 10px;
`;

const RadioGroup = styled.div`
    display: flex;
    gap: 25px;
    margin-top: 5px;
`;

const TnrTitle = styled.div`
    font-size: 20px;
`;

const TnrButton = styled.input.attrs({ type: 'radio' })`
    display: none; /* Hide the default radio button */
`;

const RadioLabel = styled.label`
    font-size: 19px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 15px;
`;

const CustomRadio = styled.span`
    display: inline-block;
    width: 11px;
    height: 11px;
    border: 5px solid #d9d9d9;
    border-radius: 50%;
    margin-right: 8px;
    position: relative;

    background-color: ${({ checked }) => (checked ? '#FFC1C1' : 'transparent')};
    border-color: ${({ checked }) => (checked ? '#FFC1C1' : '#d9d9d9')};

    &::after {
        content: '';
        display: block;
        width: 11px;
        height: 11px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: ${({ checked }) => (checked ? 1 : 0)};
    }
`;

export default ProfileInfo;
