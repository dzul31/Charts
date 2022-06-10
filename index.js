
// ---------------- The GraphQL Query ----------------------
const QUERY = ` 
{
  ethereum(network: ethereum) {
    dexTrades(
      options: {limit: 100, asc: "timeInterval.minute"}
      date: {since: "2022-01-01"}
      exchangeName: {is: "Uniswap"}
      baseCurrency: {is: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"}
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
        fontSize: 34,
        horzAlign: 'center',
        vertAlign: 'center',
    },    
  })
  
  // set data
  lineSeries.setData([
      { time: '2022-01-01', value: data.data.ethereum.dexTrades[0].maximum_price*Math.pow(10,12) },
      { time: '2022-02-01', value: data.data.ethereum.dexTrades[1].maximum_price*Math.pow(10,12) },
      { time: '2022-03-01', value: data.data.ethereum.dexTrades[2].maximum_price*Math.pow(10,12) },
      { time: '2022-04-01', value: data.data.ethereum.dexTrades[3].maximum_price*Math.pow(10,12) },
      { time: '2022-05-01', value: data.data.ethereum.dexTrades[4].maximum_price*Math.pow(10,12) },
      { time: '2022-06-06', value: data.data.ethereum.dexTrades[5].maximum_price*Math.pow(10,12) },
      { time: '2022-06-07', value: data.data.ethereum.dexTrades[6].maximum_price*Math.pow(10,12) },
      { time: '2022-06-08', value: data.data.ethereum.dexTrades[7].maximum_price*Math.pow(10,12) },
      { time: '2022-06-09', value: data.data.ethereum.dexTrades[8].maximum_price*Math.pow(10,12) },
      { time: '2022-06-10', value: data.data.ethereum.dexTrades[9].maximum_price*Math.pow(10,12) },
      { time: '2022-06-11', value: data.data.ethereum.dexTrades[10].maximum_price*Math.pow(10,12) },
      
  ]);
}

fetchData();
