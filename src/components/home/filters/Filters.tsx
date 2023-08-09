import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, FormHelperText, Skeleton } from '@mui/material'
import { IApartment } from '../../../models/IApartment'

type FiltersProps = {
  cities: string[],
  city: string,
  setCity: React.Dispatch<React.SetStateAction<string>>,
  priceRef: any,
  apartments: IApartment[]
}

export const Filters: React.FC<FiltersProps> = ({ cities, city, setCity, priceRef, apartments }) => {
  return <>
    {apartments.length ?
      <FormControl sx={{ m: 1, minWidth: "13.75rem" }} color="warning" size="small" >
        <InputLabel id="demo-simple-select-label" >City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="Місто"
          onChange={(e) => setCity(e.target.value)}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {cities.map((city) => <MenuItem value={city} key={city} >
            <em>{city}</em>
          </MenuItem>)}
        </Select>
      </FormControl> :
      <Skeleton variant='rectangular' width={220} height={40} />}
    {apartments.length ?
      <FormControl size="small" >
        <InputLabel>Ціна до</InputLabel>
        <OutlinedInput
          label="Ціна до"
          type="number"
          ref={priceRef}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} />
        <FormHelperText >Min price &mdash; {Math.min(...apartments.map(e => e.price))} UAH</FormHelperText>
      </FormControl> :
      <Skeleton variant='rectangular' width={224} height={40} />}
  </>
}
