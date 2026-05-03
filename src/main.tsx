import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './app/App';
import { initAnalytics } from './lib/analyticsTracker';
import './styles/index.css';

initAnalytics();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<App />
		<Analytics />
	</>,
);
