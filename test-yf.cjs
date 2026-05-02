const yahooFinance = require('yahoo-finance2').default;
yahooFinance.quote('CL=F').then(res => console.log('WTI:', res.regularMarketPrice)).catch(console.error);
