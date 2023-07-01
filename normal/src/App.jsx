import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { UsersRoutes } from "./routes/UsersRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserTheme from "./hoc/ThemeProvider";
import { AuthRoutes } from "./routes/AuthRoutes";
import IdsProvider from "./pages/IdsContext/IdsContext";

const queryClient = new QueryClient();

function App() {
  return (
    <IdsProvider>
      <QueryClientProvider client={queryClient}>
        <UserTheme>
          <CssBaseline />
          <Container
            disableGutters={true}
            maxWidth={false}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100vw",
              height: "100vh",
            }}
          >
            <AuthRoutes />
            <UsersRoutes />
          </Container>
        </UserTheme>
      </QueryClientProvider>
    </IdsProvider>
  );
}

export default App;
