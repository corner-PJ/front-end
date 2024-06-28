import { DiaryPage } from "../components/Diary/Diary";
import { theme } from '../components/Diary/theme';
import React from 'react';
import { ThemeProvider } from 'styled-components';

export default function Diary() {
    return (
    <ThemeProvider theme={theme}>
        <DiaryPage />
    </ThemeProvider>
    );
}
