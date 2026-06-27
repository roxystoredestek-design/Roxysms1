exports.handler = async (event) => {
    const API_KEY = process.env.SMS_MAN_API_KEY;
    const BASE_URL = 'https://api.sms-man.com/control';
    const action = event.queryStringParameters.action;
    const p = event.queryStringParameters;

    if (!API_KEY) {
        return { statusCode: 500, body: JSON.stringify({ success: false, message: 'API key missing' }) };
    }

    let url = '';
    if (action === 'get-countries') url = `${BASE_URL}/countries?token=${API_KEY}`;
    else if (action === 'get-prices') url = `${BASE_URL}/get-prices?token=${API_KEY}&country_id=${p.country_id}`;
    else if (action === 'get-number') url = `${BASE_URL}/get-number?token=${API_KEY}&country_id=${p.country_id}&application_id=${p.application_id}`;
    else if (action === 'get-sms') url = `${BASE_URL}/get-sms?token=${API_KEY}&activation_id=${p.activation_id}`;
    else if (action === 'cancel') url = `${BASE_URL}/set-status?token=${API_KEY}&activation_id=${p.activation_id}&status=-1`;
    else return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Invalid action' }) };

    try {
        const res = await fetch(url);
        const data = await res.json();
        return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(data) };
    } catch (e) {
        return { statusCode: 500, body: JSON.stringify({ success: false, message: e.message }) };
    }
};