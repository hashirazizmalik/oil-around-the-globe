import { YahooFinance } from 'yahoo-finance2';
const yf = new YahooFinance();
yf.quote('CL=F').then(res => console.log('WTI:', res.regularMarketPrice)).catch(console.error);
