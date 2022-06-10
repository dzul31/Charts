
// ---------------- The GraphQL Query ----------------------
const QUERY = ` 
{
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
  },
'{
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
        text: 'Chart Example by Joe',
        fontSize: 24,
        horzAlign: 'center',
        vertAlign: 'center',
    },    
  })
  
  // set data
  lineSeries.setData([
      { time: '2021-06-01', value: data.data.ethereum.dexTrades[0].maximum_price*Math.pow(10,12) },
      { time: '2021-06-02', value: data.data.ethereum.dexTrades[1].maximum_price*Math.pow(10,12) },
      { time: '2021-06-03', value: data.data.ethereum.dexTrades[2].maximum_price*Math.pow(10,12) },
      { time: '2021-06-04', value: data.data.ethereum.dexTrades[3].maximum_price*Math.pow(10,12) },
      { time: '2021-06-05', value: data.data.ethereum.dexTrades[4].maximum_price*Math.pow(10,12) },
      { time: '2021-06-06', value: data.data.ethereum.dexTrades[5].maximum_price*Math.pow(10,12) },
      { time: '2021-06-07', value: data.data.ethereum.dexTrades[6].maximum_price*Math.pow(10,12) },
      { time: '2021-06-08', value: data.data.ethereum.dexTrades[7].maximum_price*Math.pow(10,12) },
      { time: '2021-06-09', value: data.data.ethereum.dexTrades[8].maximum_price*Math.pow(10,12) },
      { time: '2021-06-10', value: data.data.ethereum.dexTrades[9].maximum_price*Math.pow(10,12) },
      { time: '2021-06-11', value: data.data.ethereum.dexTrades[10].maximum_price*Math.pow(10,12) },
      { time: '2021-06-12', value: data.data.ethereum.dexTrades[11].maximum_price*Math.pow(10,12) },
      { time: '2021-06-13', value: data.data.ethereum.dexTrades[12].maximum_price*Math.pow(10,12) },
      { time: '2021-06-14', value: data.data.ethereum.dexTrades[14].maximum_price*Math.pow(10,12) },
      { time: '2021-06-15', value: data.data.ethereum.dexTrades[15].maximum_price*Math.pow(10,12) },
      { time: '2021-06-16', value: data.data.ethereum.dexTrades[16].maximum_price*Math.pow(10,12) },
      { time: '2021-06-17', value: data.data.ethereum.dexTrades[17].maximum_price*Math.pow(10,12) },
      { time: '2021-06-18', value: data.data.ethereum.dexTrades[18].maximum_price*Math.pow(10,12) },
      { time: '2021-06-19', value: data.data.ethereum.dexTrades[19].maximum_price*Math.pow(10,12) },
      { time: '2021-06-20', value: data.data.ethereum.dexTrades[20].maximum_price*Math.pow(10,12) },
      { time: '2021-06-21', value: data.data.ethereum.dexTrades[21].maximum_price*Math.pow(10,12) },
      { time: '2021-06-22', value: data.data.ethereum.dexTrades[22].maximum_price*Math.pow(10,12) },
      { time: '2021-06-23', value: data.data.ethereum.dexTrades[23].maximum_price*Math.pow(10,12) },
      { time: '2021-06-24', value: data.data.ethereum.dexTrades[24].maximum_price*Math.pow(10,12) },
      { time: '2021-06-25', value: data.data.ethereum.dexTrades[25].maximum_price*Math.pow(10,12) },
      { time: '2021-06-26', value: data.data.ethereum.dexTrades[26].maximum_price*Math.pow(10,12) },
      { time: '2021-06-27', value: data.data.ethereum.dexTrades[27].maximum_price*Math.pow(10,12) },
      { time: '2021-06-28', value: data.data.ethereum.dexTrades[28].maximum_price*Math.pow(10,12) },
      { time: '2021-06-29', value: data.data.ethereum.dexTrades[29].maximum_price*Math.pow(10,12) },
      { time: '2021-06-30', value: data.data.ethereum.dexTrades[30].maximum_price*Math.pow(10,12) },
      { time: '2021-07-01', value: data.data.ethereum.dexTrades[31].maximum_price*Math.pow(10,12) },
      { time: '2021-07-02', value: data.data.ethereum.dexTrades[32].maximum_price*Math.pow(10,12) },
      { time: '2021-07-03', value: data.data.ethereum.dexTrades[33].maximum_price*Math.pow(10,12) },
      { time: '2021-07-04', value: data.data.ethereum.dexTrades[34].maximum_price*Math.pow(10,12) },
      { time: '2021-07-05', value: data.data.ethereum.dexTrades[35].maximum_price*Math.pow(10,12) },
      { time: '2021-07-06', value: data.data.ethereum.dexTrades[36].maximum_price*Math.pow(10,12) },
      { time: '2021-07-07', value: data.data.ethereum.dexTrades[37].maximum_price*Math.pow(10,12) },
      { time: '2021-07-08', value: data.data.ethereum.dexTrades[38].maximum_price*Math.pow(10,12) },
      { time: '2021-07-09', value: data.data.ethereum.dexTrades[39].maximum_price*Math.pow(10,12) },
      { time: '2021-07-10', value: data.data.ethereum.dexTrades[40].maximum_price*Math.pow(10,12) },
      { time: '2021-07-11', value: data.data.ethereum.dexTrades[41].maximum_price*Math.pow(10,12) },
      { time: '2021-07-12', value: data.data.ethereum.dexTrades[42].maximum_price*Math.pow(10,12) },
      { time: '2021-07-13', value: data.data.ethereum.dexTrades[43].maximum_price*Math.pow(10,12) },
      { time: '2021-07-14', value: data.data.ethereum.dexTrades[44].maximum_price*Math.pow(10,12) },
      { time: '2021-07-15', value: data.data.ethereum.dexTrades[45].maximum_price*Math.pow(10,12) },
      { time: '2021-07-16', value: data.data.ethereum.dexTrades[46].maximum_price*Math.pow(10,12) },
      { time: '2021-07-17', value: data.data.ethereum.dexTrades[47].maximum_price*Math.pow(10,12) },
      { time: '2021-07-18', value: data.data.ethereum.dexTrades[48].maximum_price*Math.pow(10,12) },
      { time: '2021-07-19', value: data.data.ethereum.dexTrades[49].maximum_price*Math.pow(10,12) },
      { time: '2021-07-20', value: data.data.ethereum.dexTrades[50].maximum_price*Math.pow(10,12) },
      { time: '2021-07-21', value: data.data.ethereum.dexTrades[51].maximum_price*Math.pow(10,12) },
      { time: '2021-07-22', value: data.data.ethereum.dexTrades[52].maximum_price*Math.pow(10,12) },
      { time: '2021-07-23', value: data.data.ethereum.dexTrades[53].maximum_price*Math.pow(10,12) },
      { time: '2021-07-24', value: data.data.ethereum.dexTrades[54].maximum_price*Math.pow(10,12) },
      { time: '2021-07-25', value: data.data.ethereum.dexTrades[55].maximum_price*Math.pow(10,12) },
      { time: '2021-07-26', value: data.data.ethereum.dexTrades[56].maximum_price*Math.pow(10,12) },
      { time: '2021-07-27', value: data.data.ethereum.dexTrades[57].maximum_price*Math.pow(10,12) },
      { time: '2021-07-28', value: data.data.ethereum.dexTrades[58].maximum_price*Math.pow(10,12) },
      { time: '2021-07-29', value: data.data.ethereum.dexTrades[59].maximum_price*Math.pow(10,12) },
      { time: '2021-07-30', value: data.data.ethereum.dexTrades[60].maximum_price*Math.pow(10,12) },
  ]);
}

fetchData();
