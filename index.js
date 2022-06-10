
// ---------------- The GraphQL Query ----------------------
const 
  query(
    $baseAddress: String
    $quoteAddress: String
    $from: ISO8601DateTime!
    $to: ISO8601DateTime!
    $interval: Int
    $protocol: String
    $exchangeName: String
  ) {
    ethereum(network: ethereum) {
      dexTrades(
        protocol: { is: $protocol }
        baseCurrency: { is: $baseAddress }
        quoteCurrency: { is: $quoteAddress }
        date: { between: [$from, $to] }
        exchangeName: { is: $exchangeName }
        priceAsymmetry: { lt: 0.7 }
        any: [
          {tradeAmountUsd: { gt: 0.00001 }},
          {tradeAmountUsd: { is: 0 }}
        ]
      ) {
        timeInterval {
          minute(format:"%FT%TZ", count: $interval)
        }
        buyCurrency: baseCurrency {
          symbol
          address
        }
        buyAmount: baseAmount
        sellCurrency: quoteCurrency {
          symbol
          address
        }
        volume: quoteAmount
        trades: count
        high: quotePrice(calculate: maximum)
        low: quotePrice(calculate: minimum)
        open: minimum(of: block, get: quote_price)
        close: maximum(of: block, get: quote_price)
      }
    }
  }
{
  "from": "2021-10-03T00:15:33+03:00",
  "to": "2021-11-16T00:00:00+02:00",
  "interval": 30,
  "baseAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "quoteAddress": "0x389999216860AB8E0175387A0c90E5c52522C945",
  "protocol": "Uniswap v2",
  "exchangeName": "Uniswap"
}

`;

// -------- Endpoint ----------------------
const endpoint = "https://graphql.bitquery.io/";

// Function which fetches the data from the API
async function fetchData(){  
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "BQYpEoddVosdUgcZtL5PvU1DR6OiGLEx"
    },
    body: JSON.stringify({
        query: QUERY
    })
  });  
  
  const data = await response.json(); 

  // ------------------------------------------- Lightweight chart ------------------------------------------------------
  const chart = LightweightCharts.createChart(document.body, { width: 600, height: 400 });
  
  const lineSeries = chart.addLineSeries();
  
  lineSeries.applyOptions({
    color: '#27AE60',
    lineWidth: 3,
  });

  chart.applyOptions({
    watermark: {
        color: '#F4D03F',
        visible: true,
        text: 'Chart Example By Joe',
        fontSize: 34,
        horzAlign: 'center',
        vertAlign: 'center',
    });    
  
