import styled from 'styled-components'
import Fpaw from '../../assets/Full_paw.png'
import Epaw from '../../assets/Empty_paw.png'

function HModalComponent() {

    const adoptionList = [
        {id: 1, img: "Epaw", content: "모든 가족과 합의가 되었습니까?"},
        {id: 2, img: "Fpaw", content: "입양으로 인한 경제적 부담을 짊어질 의사와 능력이 있습니까?"},
        {id: 3, img: "Epaw", content: "반려동물을 맞이할 환경적 준비, 마음의 각오는 되어 있습니까?"},
        {id: 4, img: "Fpaw", content: "매일 산책을 시켜주거나 함께 있어줄 수 있는 시간이 충분합니까?"},
        {id: 5, img: "Epaw", content: "환경이 바뀌더라도 오랜 기간 동안 끝까지 책임지고 돌보아 줄 수 있습니까?"},
        {id: 6, img: "Fpaw", content: "다치거나 질병에 걸렸을 때 적절한 치료를 해줄 생각이 있습니까?"},
        {id: 7, img: "Epaw", content: "우리 집에서 키우는 다른 동물과 어울릴 수 있을지 고민해보았습니까?"},
    ]

    const getImage = (img) => {
        switch (img) {
            case "Fpaw":
                return Fpaw;
            case "Epaw":
                return Epaw;
            default:
                return null;
        }
    }

    const HModalContent = ({ img, text }) => (
        <ListItem>
            {img && <img src={img} alt="paw" />}
            <span>{text}</span>
        </ListItem>
    );

    return(
        <PageContainer>
            <TitleContainer>
                <Title1>입양 전</Title1>
                <Title2>CheckList</Title2>
            </TitleContainer>
            <ContentContainer>
                <ol>
                    {adoptionList.map((e) =>(<HModalContent key={e.id} img={getImage(e.img)} text={e.content} />))}
                </ol>
            </ContentContainer>
        </PageContainer>
    )
}

const PageContainer = styled.div`
`

const TitleContainer = styled.div`
    background-color: #FFE6E6;
    border-radius: 5px 5px 0 0;
    text-align: center;
    padding: 45px;
`

const Title1 = styled.h2`
    margin: 0;
    font-size: 2.2em;
`

const Title2 = styled.h3`
    margin: 0;
    font-size: 2.8em;
`

const ContentContainer = styled.div`
    ol {
        padding-left: 20px;
    }
`

const ListItem = styled.li`
    display: flex;
    align-items: center;
    margin: 35px 10px;
    font-size: 15px;

    img {
        margin-right: 10px;
        width: 22px;
        height: 22px;
    }
`
export default HModalComponent;