exports.handler = async (event) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            success: true,
            message: 'Function çalışıyor!',
            action: event.queryStringParameters.action || 'yok',
            hasApiKey: process.env.SMS_MAN_API_KEY ? 'Evet (gizli)' : 'Hayır (eksik!)'
        })
    };
};