import styles from "./Home.module.scss"
import { useState, useRef } from "react";
import { Button, Skeleton } from "@mui/material";
import ApartmentsItem from "../../components/home/apartment-mini-item/ApartmentsItem";
import { IApartment } from "../../models/IApartment";
import { useGetAllApartmentQuery } from "../../store/api/apatrments.endpoint";
import { useGetCitiesQuery } from "../../store/api/api";
import { Filters } from "../../components/home/filters/Filters";


function Main() {
  const [city, setCity] = useState<string>('');
  const [filtered, setFiltered] = useState<IApartment[] | null>(null);
  const priceRef = useRef<any>(null);

  const { data: apartments = [], isLoading } = useGetAllApartmentQuery();
  const { data: cities = [] } = useGetCitiesQuery();

  function search() {
    if (parseInt(priceRef?.current?.firstChild?.value) && city.length) {
      setFiltered(apartments.filter(e => e.price < parseInt(priceRef?.current?.firstChild?.value) && e.location.city === city));
    } else if (parseInt(priceRef?.current?.firstChild?.value)) {
      setFiltered(apartments.filter(e => e.price < parseInt(priceRef?.current?.firstChild?.value)));
    } else if (city.length) {
      setFiltered(apartments.filter(e => e.location.city === city))
    } else {
      setFiltered(null);
    }
  }

  return <section className={styles.main}>
    <div className={`container ${styles.container}`}>
      <div className={styles.filters}>
        <Filters apartments={apartments} cities={cities} city={city} setCity={setCity} priceRef={priceRef} />
        {apartments.length ?
          <Button variant="contained" color="warning"
            className={styles.btn_search}
            onClick={search} >Підбір жилта</Button> :
          <Skeleton variant="rectangular" width={136} height={36} className={styles.btn_search} />}

      </div>
      {apartments.length ?
        <p className={styles.selection}>Підбірка згідно з вибором</p> :
        <Skeleton variant="text" width={"20%"} className={styles.selection} />}
      <div className={styles.apartments_list}>
        {!isLoading ? (filtered ? filtered : apartments).map((apartment: IApartment) =>
          <ApartmentsItem apartment={apartment} key={apartment.id} />) :
          Array.from(new Array(6)).map((_, index) => <Skeleton variant="rectangular" height={"12.25rem"} width={"21.875rem"} key={index} />)}
      </div>
    </div>
  </section>
}



export default Main