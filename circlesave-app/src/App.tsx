import { SignedIn, SignedOut } from '@clerk/clerk-react';
import CircleSaveApp from './components/CircleSaveApp';
import { SignInPage } from './components/SignInPage';
import './App.css';

function App() {
  return (
    <div>
      <SignedOut>
        <SignInPage />
      </SignedOut>
      <SignedIn>
        <CircleSaveApp />
      </SignedIn>
    </div>
  );
}

export default App;