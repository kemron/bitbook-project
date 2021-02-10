import styled from "@emotion/styled";
import DashboardPage from "pages/Dashboard";
import StoreProvider from "store";
import Transport from "data/Transport";

const Container = styled.div`
  align-items: center;
  margin: 20px auto;
  width: 90vw;
  height: 90vh;
  box-shadow: -1px 0px 20px -6px red;
  border-radius: 10px;
  min-height: 450px;
`;

function App() {
  return (
    <Container>
      <StoreProvider>
        <Transport>
          <DashboardPage />
        </Transport>
      </StoreProvider>
    </Container>
  );
}

export default App;
