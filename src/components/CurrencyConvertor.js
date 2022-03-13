import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import axios from 'axios'
function CurrencyConvertor() {
  const [amount, setAmount] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [convertedRatio, setConvertedRatio] = useState('');

  const handleSwap = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  }

  const getConvertedData = async () => {
    try {
      const result = await (await axios.get(`https://api.exchangerate.host/convert?from=${currencyFrom}&to=${currencyTo}`)).data;
      setConvertedRatio(result.info.rate)
      console.log("result : ", result.info.rate);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='h-100 bg-grey d-flex flex-column p-2'>
      <h2>I want to Convert</h2>
      <div className='d-flex align-items-center justify-content-between'>
        <TextField value={amount} onChange={(e) => setAmount(e.target.value)} type="number" id="standard-basic" label="Amount" variant="standard" />
        <TextField value={currencyFrom} onChange={(e) => setCurrencyFrom(e.target.value)} id="standard-basic" label="From" variant="standard" />
        <IconButton onClick={handleSwap} style={{ color: '#009688', backgroundColor: '#fff' }} component="filled">
          <CompareArrowsIcon />
        </IconButton>
        <TextField value={currencyTo} onChange={(e) => setCurrencyTo(e.target.value)} id="standard-basic" label="To" variant="standard" />
        <Button onClick={getConvertedData} style={{ backgroundColor: '#009688', color: '#fff' }}>
          Convert
        </Button>
      </div>
      <div className='mt-3'>
        <h2 className='text-center'>
          {amount} {currencyFrom} = <span style={{color : '#94c720'}}>{Math.floor(convertedRatio * amount)} {currencyTo}</span>
        </h2>
      </div>
    </div>
  )
}

export default CurrencyConvertor