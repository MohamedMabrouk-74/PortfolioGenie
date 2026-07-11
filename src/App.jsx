import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
import { ThemeProvider } from "./context/ThemeContext";
import AppRouter from "./router/AppRouter";
import "./styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
