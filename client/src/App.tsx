import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./features/auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
