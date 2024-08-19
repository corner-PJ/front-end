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
                    <label style={{ fontSize: "1.3em" }}>
                        <TnrButton
                            type="radio"
                            name="tnr"
                            value={true}
                            checked={profile.tnr === true}
                            onChange={stateHandler}
                        />
                        예
                    </label>
                    <label style={{ fontSize: "1.3em" }}>
                        <TnrButton
                            type="radio"
                            name="tnr"
                            value={false}
                            checked={profile.tnr === false}
                            onChange={stateHandler}
                        />
                        아니요
                    </label>
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
    font-size: 1.2em;
    height: 20px;
    padding: 10px;
`;

const RadioGroup = styled.div`
    display: flex;
    gap: 30px;
`;

const TnrTitle = styled.div`
    font-size: 1.3em;
`;

const TnrButton = styled.input`
`;

export default ProfileInfo;
