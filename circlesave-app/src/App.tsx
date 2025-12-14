import React from 'react';
import CircleSaveApp from './components/CircleSaveApp';



import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <CircleSaveApp />
      </SignedIn>
    </header>
  );
}

export default App