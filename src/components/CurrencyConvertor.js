import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import axios from 'axios'
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function CurrencyConvertor() {
  const [amount, setAmount] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [convertedRatio, setConvertedRatio] = useState('');
  const [age, setAge] = useState('');
  const [durationValue, setDurationValue] = useState([
    { id: 1, value: 7, name: '7 Days' },
    { id: 2, value: 14, name: '14 Days' },
    { id: 3, value: 30, name: '30 Days' }
  ])

  const handleChange = async (event) => {
    console.log(event.target.value);
    // setDurationValue(event);
    // console.log("new Date().getDate() - durationValue : " , new Date().getDate() - durationValue);
    // const result = await(await axios.get(`https://api.exchangerate.host/timeseries?start_date=${new Date().getFullYear() + '-' +
    //   new Date().getMonth() + 1 + '-' + new Date().getDate()}&end_date=
    //   ${new Date().getFullYear() + '-' +
    //   new Date().getMonth() + 1 + '-' + (new Date().getDate() - durationValue)}
    //   `)).data;

    // setAge(event.target.value);
  };
  const handleSwap = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
    getConvertedData();
  }


  const getConvertedData = async () => {
    try {
      const result = await (await axios.get(`https://api.exchangerate.host/convert?from=${currencyFrom}&to=${currencyTo}`)).data;
      setConvertedRatio(result.info.rate)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getConvertedData()
  }, []);

  useEffect(() => {

  }, [currencyFrom, currencyTo]);




  return (
    <div className='h-100 bg-grey d-flex flex-column p-2'>
      <h2>I want to Convert</h2>
      <div className='d-flex align-items-center justify-content-between'>
        <TextField value={amount} onChange={(e) => setAmount(e.target.value)} type="number" id="standard-basic" label="Amount" variant="standard" />
        <TextField value={currencyFrom} onChange={(e) => setCurrencyFrom(e.target.value)} id="standard-basic" label="From" variant="standard" />
        <IconButton onClick={handleSwap} style={{ color: '#009688', backgroundColor: '#fff' }} >
          <CompareArrowsIcon />
        </IconButton>
        <TextField value={currencyTo} onChange={(e) => setCurrencyTo(e.target.value)} id="standard-basic" label="To" variant="standard" />
        <Button onClick={getConvertedData} style={{ backgroundColor: '#009688', color: '#fff' }}>
          Convert
        </Button>
      </div>
      <div className='my-3'>
        <h2 className='text-center'>
          {amount} {currencyFrom} = <span style={{ color: '#94c720' }}>{Number(convertedRatio * amount).toFixed(5)} {currencyTo}</span>
        </h2>
      </div>
      <div className='text-center my-3'>
        <small>1 {currencyFrom} = {convertedRatio} {currencyTo}</small>
      </div>
      <Divider />
      <div className='my-2'>
        <h2>Exchange History</h2>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 240 }}>
          <InputLabel id="demo-simple-select-standard-label">Duration</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={handleChange}
            value=''
            label="Duration">
            {
              durationValue.map((duration) => {
                return <MenuItem key={duration.id} >{duration.name}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </div>

    </div>
  )
}

export default CurrencyConvertor