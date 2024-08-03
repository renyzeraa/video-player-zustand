import './styles/global.css'
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { Player } from "./pages/player";

/**
 * Pra aplicar meu estado em toda a aplicação, deve rodar sobre o redux provider
 */

export function App() {
  return (
    <ReduxProvider store={store}>
      <Player />
    </ReduxProvider>
  )
}
