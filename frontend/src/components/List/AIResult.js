import React from 'react';
import styled from 'styled-components';
import { VoiceChart } from '../SpeechSynthesis/VioceChart';
import { NameChart } from '../SpeechSynthesis/NameChart';

const AIResult = () => {
  return (
    <AIContainer>
        <Title>AI 테스트 결과</Title>
        <SectionTitle>• 성별/연령대</SectionTitle>
        <ResultSection>
            <VoiceChart />
        </ResultSection>
        <SectionTitle>• 이름 순위</SectionTitle>
        <ResultSection>
            <NameChart />
        </ResultSection>
    </AIContainer>
  );
};

const AIContainer = styled.div`
  margin: 50px 0;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin: 100px 0;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); 
`

const ResultSection = styled.div`
  margin: 30px 30px 60px;
  background: #FFFFFF;
  border-radius: 10px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  margin-bottom: 40px;
  text-align: left;
`;

export default AIResult;
