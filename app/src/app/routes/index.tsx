import { Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChatWrapper } from "../../ui/pages/Main";
import { Introduction } from "../../ui/pages/Introduction";
import { Auth } from "../../ui/pages/Auth";
import { Layout } from "./Layout";

export const AppRouter = () => (
    <Router>
        <Box minH="100vh">
            <Routes>
                <Route path="/" element={<Layout>
                    <Introduction />
                </Layout>
                } />
                <Route path="/main" element={
                    <Layout>
                        <ChatWrapper /></Layout>} />
                <Route path='auth' element={<Layout><Auth /></Layout>} />
            </Routes>
        </Box>
    </Router>
)
