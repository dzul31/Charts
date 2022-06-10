
// ---------------- The GraphQL Query ----------------------
const QUERY = ` 
{
  ethereum(network: ethereum) {
    dexTrades(
      options: {limit: 100, asc: "timeInterval.minute"}
      date: {since: "2022-05-01"}
      exchangeName: {is: "Uniswap"}
      baseCurrency: {is: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"}
      quoteCurrency: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}
    ) {
      timeInterval {
        minute(count: 5)
      }
      baseCurrency {
        symbol
        address
      }
      baseAmount
      quoteCurrency {
        symbol
        address
      }
      quoteAmount
      trades: count
      quotePrice
      maximum_price: quotePrice(calculate: maximum)
      minimum_price: quotePrice(calculate: minimum)
      open_price: minimum(of: block, get: quote_price)
      close_price: maximum(of: block, get: quote_price)
    }
  }
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
      { time: '2022-05-01', value: data.data.ethereum.dexTrades[0].maximum_price*Math.pow(10,12) },
      { time: '2022-05-02', value: data.data.ethereum.dexTrades[1].maximum_price*Math.pow(10,12) },
      { time: '2022-05-03', value: data.data.ethereum.dexTrades[2].maximum_price*Math.pow(10,12) },
      { time: '2022-05-04', value: data.data.ethereum.dexTrades[3].maximum_price*Math.pow(10,12) },
      { time: '2022-05-05', value: data.data.ethereum.dexTrades[4].maximum_price*Math.pow(10,12) },
      { time: '2022-05-06', value: data.data.ethereum.dexTrades[5].maximum_price*Math.pow(10,12) },
      { time: '2022-05-07', value: data.data.ethereum.dexTrades[6].maximum_price*Math.pow(10,12) },
      { time: '2022-05-08', value: data.data.ethereum.dexTrades[7].maximum_price*Math.pow(10,12) },
      { time: '2022-05-09', value: data.data.ethereum.dexTrades[8].maximum_price*Math.pow(10,12) },
      { time: '2022-05-10', value: data.data.ethereum.dexTrades[9].maximum_price*Math.pow(10,12) },
      { time: '2022-05-11', value: data.data.ethereum.dexTrades[10].maximum_price*Math.pow(10,12) },
      { time: '2022-05-12', value: data.data.ethereum.dexTrades[11].maximum_price*Math.pow(10,12) },
      { time: '2022-05-13', value: data.data.ethereum.dexTrades[12].maximum_price*Math.pow(10,12) },
      { time: '2022-05-14', value: data.data.ethereum.dexTrades[14].maximum_price*Math.pow(10,12) },
      { time: '2022-05-15', value: data.data.ethereum.dexTrades[15].maximum_price*Math.pow(10,12) },
      { time: '2022-05-16', value: data.data.ethereum.dexTrades[16].maximum_price*Math.pow(10,12) },
      { time: '2022-05-17', value: data.data.ethereum.dexTrades[17].maximum_price*Math.pow(10,12) },
      { time: '2022-05-18', value: data.data.ethereum.dexTrades[18].maximum_price*Math.pow(10,12) },
      { time: '2022-05-19', value: data.data.ethereum.dexTrades[19].maximum_price*Math.pow(10,12) },
      { time: '2022-05-20', value: data.data.ethereum.dexTrades[20].maximum_price*Math.pow(10,12) },
      { time: '2022-05-21', value: data.data.ethereum.dexTrades[21].maximum_price*Math.pow(10,12) },
      { time: '2022-05-22', value: data.data.ethereum.dexTrades[22].maximum_price*Math.pow(10,12) },
      { time: '2022-05-23', value: data.data.ethereum.dexTrades[23].maximum_price*Math.pow(10,12) },
      { time: '2022-05-24', value: data.data.ethereum.dexTrades[24].maximum_price*Math.pow(10,12) },
      { time: '2022-05-25', value: data.data.ethereum.dexTrades[25].maximum_price*Math.pow(10,12) },
      { time: '2022-05-26', value: data.data.ethereum.dexTrades[26].maximum_price*Math.pow(10,12) },
      { time: '2022-05-27', value: data.data.ethereum.dexTrades[27].maximum_price*Math.pow(10,12) },
      { time: '2022-05-28', value: data.data.ethereum.dexTrades[28].maximum_price*Math.pow(10,12) },
      { time: '2022-05-29', value: data.data.ethereum.dexTrades[29].maximum_price*Math.pow(10,12) },
      { time: '2022-05-30', value: data.data.ethereum.dexTrades[30].maximum_price*Math.pow(10,12) },
      { time: '2022-06-01', value: data.data.ethereum.dexTrades[31].maximum_price*Math.pow(10,12) },
      { time: '2022-06-02', value: data.data.ethereum.dexTrades[32].maximum_price*Math.pow(10,12) },
      { time: '2022-06-03', value: data.data.ethereum.dexTrades[33].maximum_price*Math.pow(10,12) },
      { time: '2022-06-04', value: data.data.ethereum.dexTrades[34].maximum_price*Math.pow(10,12) },
      { time: '2022-06-05', value: data.data.ethereum.dexTrades[35].maximum_price*Math.pow(10,12) },
      { time: '2022-06-06', value: data.data.ethereum.dexTrades[36].maximum_price*Math.pow(10,12) },
      { time: '2022-06-07', value: data.data.ethereum.dexTrades[37].maximum_price*Math.pow(10,12) },
      { time: '2022-06-08', value: data.data.ethereum.dexTrades[38].maximum_price*Math.pow(10,12) },
      { time: '2022-06-09', value: data.data.ethereum.dexTrades[39].maximum_price*Math.pow(10,12) },
      { time: '2022-06-10', value: data.data.ethereum.dexTrades[40].maximum_price*Math.pow(10,12) },
      { time: '2022-06-11', value: data.data.ethereum.dexTrades[41].maximum_price*Math.pow(10,12) },
      
  ]);
}

fetchData();
