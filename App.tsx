import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';
import { ToastProvider } from './src/contexts/ToastContext';

export default function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <StatusBar style="dark" backgroundColor='#f3f5f8' />
        <Routes />
      </ToastProvider>
    </NavigationContainer>
  );
}


